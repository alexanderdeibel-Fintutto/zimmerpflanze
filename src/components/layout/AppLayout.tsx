import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { usePlants } from '@/hooks/usePlantContext';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';

export function AppLayout() {
  const { getOverdueReminders, getTodayReminders } = usePlants();
  const { notifyReminders, enabled } = useBrowserNotifications();

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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container max-w-7xl py-6 px-4 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
