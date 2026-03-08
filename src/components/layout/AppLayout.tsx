import { useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { usePlants } from '@/hooks/usePlantContext';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';

export function AppLayout() {
  const { getOverdueReminders, getTodayReminders } = usePlants();
  const { notifyReminders, enabled } = useBrowserNotifications();
  const location = useLocation();

  const overdueReminders = useMemo(() => getOverdueReminders(), [getOverdueReminders]);
  const todayReminders = useMemo(() => getTodayReminders(), [getTodayReminders]);

  // Send browser notification for overdue/today reminders on page load
  useEffect(() => {
    if (!enabled) return;
    const allUrgent = [...overdueReminders, ...todayReminders.filter(
      (t) => !overdueReminders.find((o) => o.id === t.id)
    )];
    if (allUrgent.length > 0) {
      notifyReminders(allUrgent);
    }
  }, [enabled, overdueReminders, todayReminders, notifyReminders]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div
          key={location.pathname}
          className="container max-w-7xl py-6 px-4 lg:px-8 lg:py-8 animate-fade-in"
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
