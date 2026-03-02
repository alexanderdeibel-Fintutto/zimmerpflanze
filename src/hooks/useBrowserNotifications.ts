import { useState, useEffect, useCallback, useRef } from 'react';
import { CareReminder } from '@/types';

const STORAGE_KEY = 'pm_browser_notif_enabled';
const LAST_NOTIFIED_KEY = 'pm_last_notified';

function loadEnabled(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'true';
  } catch {
    return false;
  }
}

function saveEnabled(enabled: boolean) {
  localStorage.setItem(STORAGE_KEY, String(enabled));
}

function getLastNotifiedDate(): string {
  return localStorage.getItem(LAST_NOTIFIED_KEY) || '';
}

function setLastNotifiedDate(date: string) {
  localStorage.setItem(LAST_NOTIFIED_KEY, date);
}

export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

export function useBrowserNotifications() {
  const [enabled, setEnabled] = useState(loadEnabled);
  const [permission, setPermission] = useState<NotificationPermissionState>(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
    return Notification.permission as NotificationPermissionState;
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync permission state
  useEffect(() => {
    if (!('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission as NotificationPermissionState);
  }, []);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      setPermission('unsupported');
      return false;
    }

    const result = await Notification.requestPermission();
    setPermission(result as NotificationPermissionState);

    if (result === 'granted') {
      setEnabled(true);
      saveEnabled(true);
      return true;
    }
    return false;
  }, []);

  const toggleEnabled = useCallback(
    async (value: boolean) => {
      if (value) {
        if (permission !== 'granted') {
          const granted = await requestPermission();
          if (!granted) return;
        }
        setEnabled(true);
        saveEnabled(true);
      } else {
        setEnabled(false);
        saveEnabled(false);
      }
    },
    [permission, requestPermission]
  );

  const sendNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (!enabled || permission !== 'granted') return;
      try {
        new Notification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          ...options,
        });
      } catch {
        // Notification may fail in some contexts
      }
    },
    [enabled, permission]
  );

  const notifyReminders = useCallback(
    (reminders: CareReminder[]) => {
      if (!enabled || permission !== 'granted') return;
      if (reminders.length === 0) return;

      // Only notify once per day
      const today = new Date().toISOString().split('T')[0];
      if (getLastNotifiedDate() === today) return;
      setLastNotifiedDate(today);

      const overdueCount = reminders.length;
      const plantNames = reminders
        .slice(0, 3)
        .map((r) => r.plant?.nickname || r.plant?.species?.common_name || 'Pflanze')
        .join(', ');

      const body =
        overdueCount <= 3
          ? `${plantNames} ${overdueCount === 1 ? 'braucht' : 'brauchen'} Pflege.`
          : `${plantNames} und ${overdueCount - 3} weitere ${overdueCount - 3 === 1 ? 'Pflanze braucht' : 'Pflanzen brauchen'} Pflege.`;

      sendNotification(
        `${overdueCount} Pflege-${overdueCount === 1 ? 'Erinnerung' : 'Erinnerungen'}`,
        {
          body,
          tag: 'plant-care-reminder',
          renotify: true,
        }
      );
    },
    [enabled, permission, sendNotification]
  );

  return {
    enabled,
    permission,
    toggleEnabled,
    requestPermission,
    sendNotification,
    notifyReminders,
  };
}
