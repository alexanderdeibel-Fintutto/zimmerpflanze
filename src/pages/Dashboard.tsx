import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '@/hooks/usePlantContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Flower2,
  Droplets,
  AlertTriangle,
  CalendarClock,
  Home,
  Plus,
  Plane,
  CheckCircle2,
  Sparkles,
  Leaf,
  Sun,
  Heart,
  TrendingUp,
  ArrowRight,
  Camera,
  BarChart3,
} from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    plants,
    apartments,
    getEnrichedPlants,
    getOverdueReminders,
    getTodayReminders,
    getUpcomingReminders,
    logCareEvent,
  } = usePlants();

  const enrichedPlants = useMemo(() => getEnrichedPlants(), [getEnrichedPlants]);
  const overdueReminders = useMemo(() => getOverdueReminders(), [getOverdueReminders]);
  const todayReminders = useMemo(() => getTodayReminders(), [getTodayReminders]);
  const upcomingReminders = useMemo(() => getUpcomingReminders(7), [getUpcomingReminders]);

  const healthDistribution = useMemo(() => {
    const dist = { thriving: 0, good: 0, fair: 0, poor: 0 };
    enrichedPlants.forEach((p) => {
      dist[p.health_status]++;
    });
    return dist;
  }, [enrichedPlants]);

  const totalPlants = plants.length;
  const healthTotal = Math.max(totalPlants, 1);

  function handleMarkDone(reminder: { plant_id: string; type: 'water' | 'fertilize' | 'repot' }) {
    logCareEvent({
      plant_id: reminder.plant_id,
      type: reminder.type,
      performed_at: new Date().toISOString(),
      notes: '',
    });
  }

  const typeLabel: Record<string, string> = {
    water: 'Giessen',
    fertilize: 'Duengen',
    repot: 'Umtopfen',
  };

  const typeIcon: Record<string, typeof Droplets> = {
    water: Droplets,
    fertilize: Sparkles,
    repot: Flower2,
  };

  // --- Empty state / Onboarding ---
  if (totalPlants === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/40 dark:to-emerald-900/30 flex items-center justify-center shadow-xl shadow-green-200/50 dark:shadow-green-900/20">
            <Leaf className="h-14 w-14 text-green-600 dark:text-green-400" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-900/30 flex items-center justify-center shadow-lg">
            <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-3 tracking-tight">
          Willkommen beim Pflanzen-Manager!
        </h1>
        <p className="text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
          Verwalte deine Zimmerpflanzen, erhalte Giess-Erinnerungen und behalte
          den Ueberblick ueber die Pflege deiner gruenen Mitbewohner.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {apartments.length === 0 ? (
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-600/25"
              onClick={() => navigate('/apartments')}
            >
              <Home className="mr-2 h-5 w-5" />
              Wohnung anlegen
            </Button>
          ) : (
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-600/25"
              onClick={() => navigate('/catalog')}
            >
              <Plus className="mr-2 h-5 w-5" />
              Erste Pflanze hinzufuegen
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/catalog')}
          >
            <Flower2 className="mr-2 h-5 w-5" />
            Pflanzenkatalog entdecken
          </Button>
        </div>
      </div>
    );
  }

  // --- Main Dashboard ---
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-0.5">
            Du hast{' '}
            <span className="font-semibold text-gradient">
              {totalPlants} {totalPlants === 1 ? 'Pflanze' : 'Pflanzen'}
            </span>{' '}
            in deiner Sammlung
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md shadow-green-600/20"
          onClick={() => navigate('/catalog')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Pflanze hinzufuegen
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 stagger-children">
        <Card className="group relative overflow-hidden border-green-200/60 dark:border-green-800/30 hover:shadow-lg hover:shadow-green-100/50 dark:hover:shadow-green-900/10 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-100/80 to-transparent dark:from-green-900/20 rounded-bl-[2rem]" />
          <CardContent className="p-4 sm:p-5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/30 flex items-center justify-center mb-3">
              <Flower2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight">{totalPlants}</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pflanzen in {apartments.length} {apartments.length === 1 ? 'Wohnung' : 'Wohnungen'}
            </p>
          </CardContent>
        </Card>

        <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
          overdueReminders.length > 0
            ? 'border-red-200/60 dark:border-red-800/30 hover:shadow-red-100/50 dark:hover:shadow-red-900/10'
            : 'hover:shadow-gray-100/50'
        }`}>
          <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-[2rem] ${
            overdueReminders.length > 0
              ? 'bg-gradient-to-bl from-red-100/80 to-transparent dark:from-red-900/20'
              : 'bg-gradient-to-bl from-gray-100/80 to-transparent dark:from-gray-900/20'
          }`} />
          <CardContent className="p-4 sm:p-5">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-3 ${
              overdueReminders.length > 0
                ? 'bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/40 dark:to-red-900/20'
                : 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900/50'
            }`}>
              <AlertTriangle className={`h-5 w-5 ${
                overdueReminders.length > 0
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-400'
              }`} />
            </div>
            <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              overdueReminders.length > 0 ? 'text-red-600 dark:text-red-400' : ''
            }`}>
              {overdueReminders.length}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {overdueReminders.length === 0 ? 'Alles erledigt!' : 'Ueberfaellige Aufgaben'}
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-blue-200/60 dark:border-blue-800/30 hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/10 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100/80 to-transparent dark:from-blue-900/20 rounded-bl-[2rem]" />
          <CardContent className="p-4 sm:p-5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/30 flex items-center justify-center mb-3">
              <CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight">{upcomingReminders.length}</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Diese Woche
            </p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-purple-200/60 dark:border-purple-800/30 hover:shadow-lg hover:shadow-purple-100/50 dark:hover:shadow-purple-900/10 transition-all duration-300">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-100/80 to-transparent dark:from-purple-900/20 rounded-bl-[2rem]" />
          <CardContent className="p-4 sm:p-5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/30 flex items-center justify-center mb-3">
              <Home className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight">{apartments.length}</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {apartments.length === 1 ? 'Wohnung' : 'Wohnungen'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heute zu tun */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/30 flex items-center justify-center">
                  <Sun className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                Heute zu tun
              </CardTitle>
              {(todayReminders.length > 0 || overdueReminders.length > 0) && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {overdueReminders.length + todayReminders.filter((r) => !overdueReminders.find((o) => o.id === r.id)).length} Aufgaben
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {todayReminders.length === 0 && overdueReminders.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <p className="font-semibold text-lg">Alles erledigt!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Heute stehen keine Pflegeaufgaben an.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Overdue first */}
                {overdueReminders.map((reminder) => {
                  const Icon = typeIcon[reminder.type] || Droplets;
                  const plant = reminder.plant;
                  const daysOverdue = differenceInDays(
                    new Date(),
                    parseISO(reminder.due_date)
                  );
                  return (
                    <div
                      key={reminder.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-red-50/80 dark:bg-red-950/15 border border-red-200/60 dark:border-red-800/30 transition-all hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">
                            {plant?.nickname || plant?.species?.common_name || 'Pflanze'}
                          </p>
                          <p className="text-xs text-red-600 dark:text-red-400">
                            {typeLabel[reminder.type]} - {daysOverdue}{' '}
                            {daysOverdue === 1 ? 'Tag' : 'Tage'} ueberfaellig
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30 flex-shrink-0 ml-2"
                        onClick={() => handleMarkDone(reminder)}
                      >
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                        Erledigt
                      </Button>
                    </div>
                  );
                })}

                {/* Today's reminders */}
                {todayReminders
                  .filter((r) => !overdueReminders.find((o) => o.id === r.id))
                  .map((reminder) => {
                    const Icon = typeIcon[reminder.type] || Droplets;
                    const plant = reminder.plant;
                    return (
                      <div
                        key={reminder.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-green-50/80 dark:bg-green-950/15 border border-green-200/60 dark:border-green-800/30 transition-all hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {plant?.nickname || plant?.species?.common_name || 'Pflanze'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {typeLabel[reminder.type]} - heute faellig
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex-shrink-0 ml-2"
                          onClick={() => handleMarkDone(reminder)}
                        >
                          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                          Erledigt
                        </Button>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pflanzen-Gesundheit */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-lg">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/30 flex items-center justify-center">
                <Heart className="h-4 w-4 text-pink-500" />
              </div>
              Gesundheit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { key: 'thriving', label: 'Praechtig', color: 'bg-green-500', value: healthDistribution.thriving },
                { key: 'good', label: 'Gut', color: 'bg-emerald-400', value: healthDistribution.good },
                { key: 'fair', label: 'Maessig', color: 'bg-yellow-500', value: healthDistribution.fair },
                { key: 'poor', label: 'Schlecht', color: 'bg-red-500', value: healthDistribution.poor },
              ].map(item => (
                <div key={item.key}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color} inline-block`} />
                      <span className="text-[13px]">{item.label}</span>
                    </span>
                    <span className="font-semibold text-[13px]">{item.value}</span>
                  </div>
                  <Progress
                    value={(item.value / healthTotal) * 100}
                    className={`h-1.5 [&>div]:${item.color}`}
                  />
                </div>
              ))}
            </div>

            {totalPlants > 0 && (
              <div className="pt-3 border-t">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {Math.round(
                        ((healthDistribution.thriving + healthDistribution.good) /
                          totalPlants) *
                          100
                      )}%
                    </p>
                    <p className="text-[11px] text-muted-foreground">deiner Pflanzen geht es gut</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Schnellaktionen */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Schnellaktionen</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: Plus, label: 'Pflanze hinzufuegen', to: '/catalog', gradient: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20', hoverBorder: 'hover:border-green-300 dark:hover:border-green-800' },
            { icon: Droplets, label: 'Giessplan', to: '/care', gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20', hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-800' },
            { icon: ListChecks, label: 'Batch-Pflege', to: '/batch-care', gradient: 'from-violet-500 to-purple-500', bg: 'from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20', hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-800' },
            { icon: Camera, label: 'Scanner', to: '/scanner', gradient: 'from-amber-500 to-orange-500', bg: 'from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20', hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-800' },
            { icon: BarChart3, label: 'Statistiken', to: '/statistics', gradient: 'from-pink-500 to-rose-500', bg: 'from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20', hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-800' },
            { icon: Plane, label: 'Urlaubsplan', to: '/vacation', gradient: 'from-sky-500 to-blue-500', bg: 'from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20', hoverBorder: 'hover:border-sky-300 dark:hover:border-sky-800' },
          ].map(action => (
            <button
              key={action.to}
              onClick={() => navigate(action.to)}
              className={`group flex flex-col items-center gap-2.5 p-4 rounded-xl border bg-gradient-to-br ${action.bg} ${action.hoverBorder} hover:shadow-md transition-all duration-200`}
            >
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
