import { useMemo } from 'react';
import { usePlants } from '@/hooks/usePlantContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  Flower2,
  Droplets,
  Leaf,
  Heart,
  TrendingUp,
  Home,
  DoorOpen,
  Sun,
  Thermometer,
  Calendar,
  Award,
  Target,
  Activity,
} from 'lucide-react';
import {
  format,
  parseISO,
  differenceInDays,
  subDays,
  startOfDay,
  isAfter,
} from 'date-fns';
import { de } from 'date-fns/locale';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const HEALTH_COLORS: Record<string, string> = {
  thriving: '#22c55e',
  good: '#34d399',
  fair: '#eab308',
  poor: '#ef4444',
};

const HEALTH_LABELS: Record<string, string> = {
  thriving: 'Praechtig',
  good: 'Gut',
  fair: 'Maessig',
  poor: 'Schlecht',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Einfach',
  medium: 'Mittel',
  hard: 'Schwer',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#22c55e',
  medium: '#f59e0b',
  hard: '#ef4444',
};

const LIGHT_LABELS: Record<string, string> = {
  low: 'Wenig',
  medium: 'Mittel',
  bright: 'Hell',
  direct: 'Direkt',
};

export default function StatisticsPage() {
  const {
    plants,
    apartments,
    rooms,
    careEvents,
    getEnrichedPlants,
    getOverdueReminders,
  } = usePlants();

  const enrichedPlants = useMemo(() => getEnrichedPlants(), [getEnrichedPlants]);
  const overdueReminders = useMemo(() => getOverdueReminders(), [getOverdueReminders]);

  // --- Health distribution ---
  const healthData = useMemo(() => {
    const dist: Record<string, number> = { thriving: 0, good: 0, fair: 0, poor: 0 };
    enrichedPlants.forEach((p) => dist[p.health_status]++);
    return Object.entries(dist).map(([key, value]) => ({
      name: HEALTH_LABELS[key],
      value,
      color: HEALTH_COLORS[key],
    }));
  }, [enrichedPlants]);

  // --- Difficulty distribution ---
  const difficultyData = useMemo(() => {
    const dist: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
    enrichedPlants.forEach((p) => {
      if (p.species) dist[p.species.difficulty]++;
    });
    return Object.entries(dist).map(([key, value]) => ({
      name: DIFFICULTY_LABELS[key],
      value,
      color: DIFFICULTY_COLORS[key],
    }));
  }, [enrichedPlants]);

  // --- Plants per room ---
  const plantsPerRoom = useMemo(() => {
    const roomCounts: Record<string, { name: string; apartment: string; count: number }> = {};
    enrichedPlants.forEach((p) => {
      if (p.room) {
        const key = p.room_id;
        if (!roomCounts[key]) {
          roomCounts[key] = {
            name: p.room.name,
            apartment: p.room.apartment?.name || '',
            count: 0,
          };
        }
        roomCounts[key].count++;
      }
    });
    return Object.values(roomCounts).sort((a, b) => b.count - a.count);
  }, [enrichedPlants]);

  // --- Care activity last 30 days ---
  const careActivityData = useMemo(() => {
    const today = startOfDay(new Date());
    const days: { date: string; water: number; fertilize: number; other: number }[] = [];

    for (let i = 29; i >= 0; i--) {
      const day = subDays(today, i);
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayLabel = format(day, 'dd.MM', { locale: de });

      const dayEvents = careEvents.filter((e) => {
        const eventDate = format(parseISO(e.performed_at), 'yyyy-MM-dd');
        return eventDate === dayStr;
      });

      days.push({
        date: dayLabel,
        water: dayEvents.filter((e) => e.type === 'water').length,
        fertilize: dayEvents.filter((e) => e.type === 'fertilize').length,
        other: dayEvents.filter(
          (e) => e.type !== 'water' && e.type !== 'fertilize'
        ).length,
      });
    }
    return days;
  }, [careEvents]);

  // --- Care type distribution ---
  const careTypeData = useMemo(() => {
    const types: Record<string, number> = {};
    careEvents.forEach((e) => {
      const label =
        e.type === 'water'
          ? 'Giessen'
          : e.type === 'fertilize'
            ? 'Duengen'
            : e.type === 'repot'
              ? 'Umtopfen'
              : e.type === 'prune'
                ? 'Schneiden'
                : e.type === 'mist'
                  ? 'Besprühen'
                  : 'Drehen';
      types[label] = (types[label] || 0) + 1;
    });
    const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];
    return Object.entries(types).map(([name, value], i) => ({
      name,
      value,
      color: colors[i % colors.length],
    }));
  }, [careEvents]);

  // --- Light level distribution ---
  const lightData = useMemo(() => {
    const dist: Record<string, number> = { low: 0, medium: 0, bright: 0, direct: 0 };
    enrichedPlants.forEach((p) => {
      if (p.species) dist[p.species.light]++;
    });
    return Object.entries(dist)
      .filter(([, v]) => v > 0)
      .map(([key, value]) => ({
        name: LIGHT_LABELS[key],
        value,
      }));
  }, [enrichedPlants]);

  // --- Top care-needy plants ---
  const topCareNeedy = useMemo(() => {
    return enrichedPlants
      .map((p) => ({
        name: p.nickname || p.species?.common_name || 'Unbekannt',
        events: careEvents.filter((e) => e.plant_id === p.id).length,
      }))
      .sort((a, b) => b.events - a.events)
      .slice(0, 5);
  }, [enrichedPlants, careEvents]);

  // --- Streak: consecutive days with at least 1 care event ---
  const careStreak = useMemo(() => {
    if (careEvents.length === 0) return 0;
    const today = startOfDay(new Date());
    let streak = 0;
    let checkDay = today;

    for (let i = 0; i < 365; i++) {
      const dayStr = format(checkDay, 'yyyy-MM-dd');
      const hasEvent = careEvents.some(
        (e) => format(parseISO(e.performed_at), 'yyyy-MM-dd') === dayStr
      );
      if (hasEvent) {
        streak++;
        checkDay = subDays(checkDay, 1);
      } else {
        break;
      }
    }
    return streak;
  }, [careEvents]);

  // --- Average age of plants ---
  const avgPlantAge = useMemo(() => {
    if (plants.length === 0) return 0;
    const totalDays = plants.reduce((sum, p) => {
      return sum + differenceInDays(new Date(), parseISO(p.acquired_date || p.created_at));
    }, 0);
    return Math.round(totalDays / plants.length);
  }, [plants]);

  // --- Plants added recently (last 30 days) ---
  const recentPlants = useMemo(() => {
    const cutoff = subDays(new Date(), 30);
    return plants.filter((p) =>
      isAfter(parseISO(p.created_at), cutoff)
    ).length;
  }, [plants]);

  const totalPlants = plants.length;
  const healthPercent =
    totalPlants > 0
      ? Math.round(
          ((healthData.find((h) => h.name === 'Praechtig')?.value || 0) +
            (healthData.find((h) => h.name === 'Gut')?.value || 0)) /
            totalPlants *
            100
        )
      : 0;

  if (totalPlants === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Statistik & Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Detaillierte Analysen deiner Pflanzensammlung
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            Noch keine Daten vorhanden
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Fuege Pflanzen hinzu, um Statistiken zu sehen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-primary" />
          Statistik & Insights
        </h1>
        <p className="text-muted-foreground mt-1">
          Detaillierte Analysen deiner Pflanzensammlung
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Flower2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalPlants}</p>
              <p className="text-xs text-muted-foreground">Pflanzen</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{careEvents.length}</p>
              <p className="text-xs text-muted-foreground">Pflege-Aktionen</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{careStreak}</p>
              <p className="text-xs text-muted-foreground">Tage Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{healthPercent}%</p>
              <p className="text-xs text-muted-foreground">Gesund</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Care Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Pflege-Aktivitaet (letzte 30 Tage)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={careActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  interval="preserveStartEnd"
                  className="text-muted-foreground"
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid hsl(var(--border))',
                    backgroundColor: 'hsl(var(--card))',
                    color: 'hsl(var(--card-foreground))',
                  }}
                />
                <Bar dataKey="water" name="Giessen" fill="#3b82f6" radius={[2, 2, 0, 0]} stackId="care" />
                <Bar dataKey="fertilize" name="Duengen" fill="#22c55e" radius={[2, 2, 0, 0]} stackId="care" />
                <Bar dataKey="other" name="Sonstiges" fill="#a855f7" radius={[2, 2, 0, 0]} stackId="care" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Distribution Pie */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Gesundheitsverteilung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {healthData
                      .filter((d) => d.value > 0)
                      .map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid hsl(var(--border))',
                      backgroundColor: 'hsl(var(--card))',
                      color: 'hsl(var(--card-foreground))',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Care Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              Pflege nach Typ
            </CardTitle>
          </CardHeader>
          <CardContent>
            {careTypeData.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center">
                <Droplets className="h-10 w-10 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Noch keine Pflege-Aktionen erfasst
                </p>
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={careTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {careTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid hsl(var(--border))',
                        backgroundColor: 'hsl(var(--card))',
                        color: 'hsl(var(--card-foreground))',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              Schwierigkeitsgrade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {difficultyData.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{d.name}</span>
                  <span className="font-medium">
                    {d.value} ({totalPlants > 0 ? Math.round((d.value / totalPlants) * 100) : 0}%)
                  </span>
                </div>
                <Progress
                  value={totalPlants > 0 ? (d.value / totalPlants) * 100 : 0}
                  className="h-2"
                  style={{ ['--progress-color' as string]: d.color }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Light requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              Lichtbeduerfnisse
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lightData.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center">
                <Sun className="h-10 w-10 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">Keine Daten</p>
              </div>
            ) : (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lightData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid hsl(var(--border))',
                        backgroundColor: 'hsl(var(--card))',
                        color: 'hsl(var(--card-foreground))',
                      }}
                    />
                    <Bar dataKey="value" name="Pflanzen" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plants per room */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DoorOpen className="h-5 w-5 text-purple-500" />
              Pflanzen pro Raum
            </CardTitle>
          </CardHeader>
          <CardContent>
            {plantsPerRoom.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center">
                <Home className="h-10 w-10 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">Keine Raeume vorhanden</p>
              </div>
            ) : (
              <div className="space-y-3">
                {plantsPerRoom.map((room, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DoorOpen className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{room.name}</p>
                        <p className="text-xs text-muted-foreground">{room.apartment}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress
                          value={totalPlants > 0 ? (room.count / totalPlants) * 100 : 0}
                          className="h-2"
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right">{room.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top care-needy plants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Meistgepflegte Pflanzen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topCareNeedy.length === 0 || topCareNeedy[0].events === 0 ? (
              <div className="flex flex-col items-center py-12 text-center">
                <Leaf className="h-10 w-10 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Noch keine Pflege-Daten vorhanden
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {topCareNeedy.map((plant, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : i === 1
                              ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                              : 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium">{plant.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {plant.events} Aktionen
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-500" />
            Zusammenfassung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">{avgPlantAge} Tage</p>
                <p className="text-xs text-muted-foreground">Durchschnittsalter</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Home className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">{apartments.length} Wohnungen</p>
                <p className="text-xs text-muted-foreground">{rooms.length} Raeume</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Flower2 className="h-5 w-5 text-pink-500" />
              <div>
                <p className="text-sm font-medium">{recentPlants} neu</p>
                <p className="text-xs text-muted-foreground">Letzte 30 Tage</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Target className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">{overdueReminders.length} ueberfaellig</p>
                <p className="text-xs text-muted-foreground">Offene Aufgaben</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
