import { useState, useEffect } from 'react';
import { usePlants } from '@/hooks/usePlantContext';
import { useAuth } from '@/hooks/useAuth';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Settings,
  User,
  Bell,
  BellRing,
  Clock,
  Download,
  Upload,
  Trash2,
  Leaf,
  Shield,
  Database,
  ExternalLink,
  Droplets,
  Sparkles,
  Monitor,
  Globe,
  Dumbbell,
  LayoutGrid,
  Building2,
  PiggyBank,
  Gauge,
  Brain,
  FileCheck,
  Users,
  Languages,
  GraduationCap,
} from 'lucide-react';

const STORAGE_KEYS = {
  notifications: 'pm_notification_prefs',
  reminderTime: 'pm_reminder_time',
};

interface NotificationPrefs {
  waterReminders: boolean;
  fertilizeReminders: boolean;
}

function loadNotificationPrefs(): NotificationPrefs {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.notifications);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return { waterReminders: true, fertilizeReminders: true };
}

function saveNotificationPrefs(prefs: NotificationPrefs) {
  localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(prefs));
}

function loadReminderTime(): string {
  return localStorage.getItem(STORAGE_KEYS.reminderTime) || '09:00';
}

function saveReminderTime(time: string) {
  localStorage.setItem(STORAGE_KEYS.reminderTime, time);
}

export default function SettingsPage() {
  const { user } = useAuth();
  const {
    apartments,
    rooms,
    plants,
    careEvents,
    vacationPlans,
    shoppingItems,
  } = usePlants();

  const {
    enabled: browserNotifEnabled,
    permission: browserNotifPermission,
    toggleEnabled: toggleBrowserNotif,
  } = useBrowserNotifications();

  const [notifPrefs, setNotifPrefs] = useState<NotificationPrefs>(loadNotificationPrefs);
  const [reminderTime, setReminderTime] = useState(loadReminderTime);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');

  useEffect(() => {
    saveNotificationPrefs(notifPrefs);
  }, [notifPrefs]);

  useEffect(() => {
    saveReminderTime(reminderTime);
  }, [reminderTime]);

  function handleExportData() {
    const data = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      apartments,
      rooms,
      plants,
      careEvents,
      vacationPlans,
      shoppingItems,
      settings: {
        notificationPrefs: notifPrefs,
        reminderTime,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pflanzen-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Daten erfolgreich exportiert');
  }

  function handleImportData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);

          if (!data.version) {
            toast.error('Ungültiges Dateiformat. Bitte eine gueltige Backup-Datei verwenden.');
            return;
          }

          if (data.apartments) localStorage.setItem('pm_apartments', JSON.stringify(data.apartments));
          if (data.rooms) localStorage.setItem('pm_rooms', JSON.stringify(data.rooms));
          if (data.plants) localStorage.setItem('pm_plants', JSON.stringify(data.plants));
          if (data.careEvents) localStorage.setItem('pm_care_events', JSON.stringify(data.careEvents));
          if (data.vacationPlans) localStorage.setItem('pm_vacation_plans', JSON.stringify(data.vacationPlans));
          if (data.shoppingItems) localStorage.setItem('pm_shopping_items', JSON.stringify(data.shoppingItems));

          if (data.settings?.notificationPrefs) {
            saveNotificationPrefs(data.settings.notificationPrefs);
            setNotifPrefs(data.settings.notificationPrefs);
          }
          if (data.settings?.reminderTime) {
            saveReminderTime(data.settings.reminderTime);
            setReminderTime(data.settings.reminderTime);
          }

          toast.success('Daten erfolgreich importiert. Seite wird neu geladen...');
          setTimeout(() => window.location.reload(), 1500);
        } catch {
          toast.error('Fehler beim Lesen der Datei. Bitte eine gueltige JSON-Datei verwenden.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function handleResetData() {
    if (resetConfirmText !== 'LÖSCHEN') {
      toast.error('Bitte "LÖSCHEN" eingeben, um das Zurücksetzen zu bestätigen');
      return;
    }

    localStorage.removeItem('pm_apartments');
    localStorage.removeItem('pm_rooms');
    localStorage.removeItem('pm_plants');
    localStorage.removeItem('pm_care_events');
    localStorage.removeItem('pm_vacation_plans');
    localStorage.removeItem('pm_shopping_items');
    localStorage.removeItem(STORAGE_KEYS.notifications);
    localStorage.removeItem(STORAGE_KEYS.reminderTime);

    toast.success('Alle Daten wurden gelöscht. Seite wird neu geladen...');
    setTimeout(() => window.location.reload(), 1500);
  }

  const totalDataItems =
    apartments.length + rooms.length + plants.length + careEvents.length + vacationPlans.length + shoppingItems.length;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-800 dark:to-slate-900 flex items-center justify-center">
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Einstellungen</h1>
          <p className="text-muted-foreground text-sm">App-Konfiguration und Datenverwaltung</p>
        </div>
      </div>

      {/* App Info */}
      <Card className="overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-green-500 to-emerald-500 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
        </div>
        <CardContent className="pt-0">
          <div className="flex items-end gap-4 -mt-8 mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/30 border-4 border-card">
              <Leaf className="h-8 w-8" />
            </div>
            <div className="pb-1">
              <h3 className="text-xl font-bold">Pflanzen-Manager</h3>
              <p className="text-sm text-muted-foreground">von Fintutto &middot; Version 1.0.0</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Der Pflanzen-Manager hilft dir, deine Zimmerpflanzen optimal zu pflegen.
            Verwalte Giesspläne, Urlaubsvertretungen und Einkaufslisten -- alles an einem Ort.
          </p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.fintutto.cloud" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                fintutto.cloud
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fintutto Ecosystem */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/30 flex items-center justify-center">
              <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            Fintutto Ecosystem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-4">Entdecke weitere Apps von Fintutto</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { name: 'Portal', href: 'https://portal.fintutto.cloud', icon: LayoutGrid, gradient: 'from-blue-500 to-indigo-500' },
              { name: 'Fitness', href: 'https://fitness.fintutto.cloud', icon: Dumbbell, gradient: 'from-orange-500 to-red-500' },
              { name: 'Vermietify', href: 'https://vermietify.fintutto.cloud', icon: Building2, gradient: 'from-purple-500 to-violet-500' },
              { name: 'Finance Mentor', href: 'https://finance-mentor.fintutto.cloud', icon: PiggyBank, gradient: 'from-green-500 to-emerald-500' },
              { name: 'Zaehler', href: 'https://zaehler.fintutto.cloud', icon: Gauge, gradient: 'from-cyan-500 to-blue-500' },
              { name: 'Second Brain', href: 'https://secondbrain.fintutto.cloud', icon: Brain, gradient: 'from-pink-500 to-rose-500' },
              { name: 'Bescheidboxer', href: 'https://app.bescheidboxer.de', icon: FileCheck, gradient: 'from-amber-500 to-orange-500' },
              { name: 'Mieterportal', href: 'https://mieter.fintutto.de', icon: Users, gradient: 'from-teal-500 to-cyan-500' },
              { name: 'Translator', href: 'https://translator.fintutto.cloud', icon: Languages, gradient: 'from-indigo-500 to-purple-500' },
              { name: 'Lernen', href: 'https://lernen.fintutto.cloud', icon: GraduationCap, gradient: 'from-yellow-500 to-amber-500' },
            ].map((app) => (
              <a
                key={app.name}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-xl border bg-card p-3 hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${app.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                  <app.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium truncate">{app.name}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Profile */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/30 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            Benutzerprofil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold">{user.user_metadata?.name || 'Benutzer'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                <Shield className="h-3.5 w-3.5" />
                <span>Angemeldet via Supabase</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Lokaler Benutzer</p>
                  <p className="text-sm text-muted-foreground">
                    Daten werden lokal im Browser gespeichert
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20 p-3 text-sm text-amber-800 dark:text-amber-200">
                Deine Daten sind nur in diesem Browser verfügbar. Erstelle ein Konto, um deine
                Daten geräteübergreifend zu synchronisieren.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/30 flex items-center justify-center">
              <Bell className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            Benachrichtigungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 flex items-center justify-center">
                <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Label htmlFor="water-reminders" className="font-medium cursor-pointer text-sm">
                  Giess-Erinnerungen
                </Label>
                <p className="text-xs text-muted-foreground">
                  Benachrichtigung bei faelligen Giessaufgaben
                </p>
              </div>
            </div>
            <Switch
              id="water-reminders"
              checked={notifPrefs.waterReminders}
              onCheckedChange={(checked) =>
                setNotifPrefs((prev) => ({ ...prev, waterReminders: checked }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-green-100/80 dark:bg-green-900/30 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <Label htmlFor="fertilize-reminders" className="font-medium cursor-pointer text-sm">
                  Duenge-Erinnerungen
                </Label>
                <p className="text-xs text-muted-foreground">
                  Benachrichtigung bei faelligen Duengeaufgaben
                </p>
              </div>
            </div>
            <Switch
              id="fertilize-reminders"
              checked={notifPrefs.fertilizeReminders}
              onCheckedChange={(checked) =>
                setNotifPrefs((prev) => ({ ...prev, fertilizeReminders: checked }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-orange-100/80 dark:bg-orange-900/30 flex items-center justify-center">
                <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <Label htmlFor="reminder-time" className="font-medium cursor-pointer text-sm">
                  Standard-Erinnerungszeit
                </Label>
                <p className="text-xs text-muted-foreground">
                  Uhrzeit fuer Erinnerungen
                </p>
              </div>
            </div>
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-28 text-center"
            />
          </div>
        </CardContent>
      </Card>

      {/* Browser Notifications */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/30 flex items-center justify-center">
              <BellRing className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            Browser-Benachrichtigungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-indigo-100/80 dark:bg-indigo-900/30 flex items-center justify-center">
                <Monitor className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <Label htmlFor="browser-notif" className="font-medium cursor-pointer text-sm">
                  Push-Benachrichtigungen
                </Label>
                <p className="text-xs text-muted-foreground">
                  Browser-Benachrichtigungen bei ueberfaelligen Aufgaben
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {browserNotifPermission === 'denied' && (
                <Badge variant="destructive" className="text-[10px] h-5">Blockiert</Badge>
              )}
              {browserNotifPermission === 'unsupported' && (
                <Badge variant="secondary" className="text-[10px] h-5">Nicht verfuegbar</Badge>
              )}
              <Switch
                id="browser-notif"
                checked={browserNotifEnabled}
                onCheckedChange={toggleBrowserNotif}
                disabled={browserNotifPermission === 'denied' || browserNotifPermission === 'unsupported'}
              />
            </div>
          </div>

          {browserNotifPermission === 'denied' && (
            <div className="rounded-xl border border-red-200/60 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20 p-3 text-sm text-red-800 dark:text-red-200">
              Browser-Benachrichtigungen wurden blockiert. Bitte erlaube Benachrichtigungen
              in den Browser-Einstellungen fuer diese Seite.
            </div>
          )}

          {browserNotifPermission === 'granted' && browserNotifEnabled && (
            <div className="rounded-xl border border-green-200/60 bg-green-50/50 dark:border-green-900/40 dark:bg-green-950/20 p-3 text-sm text-green-800 dark:text-green-200">
              Browser-Benachrichtigungen sind aktiviert. Du erhaeltst taeglich
              eine Erinnerung, wenn Pflegeaufgaben anstehen.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/40 dark:to-teal-900/30 flex items-center justify-center">
              <Database className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            Datenverwaltung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Data overview */}
          <div className="rounded-xl bg-muted/40 border p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Gespeicherte Daten</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {[
                { count: apartments.length, label: 'Wohnungen' },
                { count: rooms.length, label: 'Raeume' },
                { count: plants.length, label: 'Pflanzen' },
                { count: careEvents.length, label: 'Pflege-Eintraege' },
                { count: vacationPlans.length, label: 'Urlaubsplaene' },
                { count: shoppingItems.length, label: 'Einkaufsartikel' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="font-semibold tabular-nums">{item.count}</span>
                  <span className="text-muted-foreground text-xs">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2.5 pt-2 border-t border-border/50">
              Insgesamt {totalDataItems} Eintraege
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={handleExportData}
              className="flex items-center gap-3 rounded-xl border bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 hover:border-blue-300 dark:hover:border-blue-800 p-4 text-left transition-all hover:shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Download className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Daten exportieren</p>
                <p className="text-xs text-muted-foreground">
                  Als JSON-Datei herunterladen
                </p>
              </div>
            </button>

            <button
              onClick={handleImportData}
              className="flex items-center gap-3 rounded-xl border bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:border-green-300 dark:hover:border-green-800 p-4 text-left transition-all hover:shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Daten importieren</p>
                <p className="text-xs text-muted-foreground">
                  Aus JSON-Datei wiederherstellen
                </p>
              </div>
            </button>
          </div>

          <Separator />

          {/* Reset */}
          <div className="rounded-xl border border-red-200/60 bg-red-50/30 dark:border-red-900/40 dark:bg-red-950/10 p-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <h4 className="font-semibold text-sm text-red-700 dark:text-red-400">Alle Daten zurücksetzen</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hiermit werden alle gespeicherten Daten unwiderruflich gelöscht. Erstelle vorher
              ein Backup über die Export-Funktion.
            </p>

            {showResetConfirm ? (
              <div className="space-y-3 pt-1">
                <div className="space-y-2">
                  <Label htmlFor="reset-confirm" className="text-xs">
                    Gib <span className="font-mono font-bold">LÖSCHEN</span> ein:
                  </Label>
                  <Input
                    id="reset-confirm"
                    value={resetConfirmText}
                    onChange={(e) => setResetConfirmText(e.target.value)}
                    placeholder="LÖSCHEN"
                    className="max-w-xs"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleResetData}
                    disabled={resetConfirmText !== 'LÖSCHEN'}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                    Endgültig löschen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowResetConfirm(false);
                      setResetConfirmText('');
                    }}
                  >
                    Abbrechen
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetConfirm(true)}
                className="border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Daten zurücksetzen
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
