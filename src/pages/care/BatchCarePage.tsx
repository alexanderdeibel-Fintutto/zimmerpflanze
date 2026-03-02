import { useState, useMemo, useCallback } from 'react';
import { usePlants } from '@/hooks/usePlantContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Droplets,
  Leaf,
  FlowerIcon,
  Scissors,
  Wind,
  RotateCw,
  CheckCircle2,
  ListChecks,
  Home,
  DoorOpen,
  Filter,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { UserPlant, CareEvent } from '@/types';
import { parseISO, isBefore, isToday, addDays, format } from 'date-fns';
import { de } from 'date-fns/locale';

type CareType = CareEvent['type'];

const careTypeConfig: Record<
  CareType,
  { label: string; icon: typeof Droplets; color: string; bgColor: string }
> = {
  water: {
    label: 'Giessen',
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  fertilize: {
    label: 'Duengen',
    icon: Leaf,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  repot: {
    label: 'Umtopfen',
    icon: FlowerIcon,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  prune: {
    label: 'Schneiden',
    icon: Scissors,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  mist: {
    label: 'Besprühen',
    icon: Wind,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
  },
  rotate: {
    label: 'Drehen',
    icon: RotateCw,
    color: 'text-pink-500',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
  },
};

type FilterMode = 'all' | 'overdue' | 'room';

export default function BatchCarePage() {
  const {
    getEnrichedPlants,
    getReminders,
    logCareEvent,
    rooms,
    apartments,
  } = usePlants();

  const [selectedPlants, setSelectedPlants] = useState<Set<string>>(new Set());
  const [careType, setCareType] = useState<CareType>('water');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [filterRoom, setFilterRoom] = useState<string>('');

  const enrichedPlants = useMemo(() => getEnrichedPlants(), [getEnrichedPlants]);
  const reminders = useMemo(() => getReminders(), [getReminders]);

  // Get overdue plants for the selected care type
  const overduePlantIds = useMemo(() => {
    const now = new Date();
    return new Set(
      reminders
        .filter((r) => {
          const dueDate = parseISO(r.due_date);
          return r.type === careType && (isBefore(dueDate, now) || isToday(dueDate));
        })
        .map((r) => r.plant_id)
    );
  }, [reminders, careType]);

  // Filter plants
  const filteredPlants = useMemo(() => {
    let result = enrichedPlants;

    if (filterMode === 'overdue') {
      result = result.filter((p) => overduePlantIds.has(p.id));
    } else if (filterMode === 'room' && filterRoom) {
      result = result.filter((p) => p.room_id === filterRoom);
    }

    return result.sort((a, b) => {
      const aName = a.nickname || a.species?.common_name || '';
      const bName = b.nickname || b.species?.common_name || '';
      return aName.localeCompare(bName);
    });
  }, [enrichedPlants, filterMode, filterRoom, overduePlantIds]);

  // Group plants by room
  const plantsByRoom = useMemo(() => {
    const groups: Record<string, { roomName: string; apartmentName: string; plants: UserPlant[] }> = {};

    filteredPlants.forEach((p) => {
      const key = p.room_id || 'unassigned';
      if (!groups[key]) {
        groups[key] = {
          roomName: p.room?.name || 'Kein Raum',
          apartmentName: p.room?.apartment?.name || '',
          plants: [],
        };
      }
      groups[key].plants.push(p);
    });

    return Object.entries(groups).sort(([, a], [, b]) =>
      a.roomName.localeCompare(b.roomName)
    );
  }, [filteredPlants]);

  const togglePlant = useCallback((plantId: string) => {
    setSelectedPlants((prev) => {
      const next = new Set(prev);
      if (next.has(plantId)) {
        next.delete(plantId);
      } else {
        next.add(plantId);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedPlants(new Set(filteredPlants.map((p) => p.id)));
  }, [filteredPlants]);

  const selectNone = useCallback(() => {
    setSelectedPlants(new Set());
  }, []);

  const selectOverdue = useCallback(() => {
    setSelectedPlants(new Set(overduePlantIds));
  }, [overduePlantIds]);

  const selectRoom = useCallback(
    (roomId: string) => {
      const roomPlants = filteredPlants.filter((p) => p.room_id === roomId);
      setSelectedPlants((prev) => {
        const next = new Set(prev);
        const allSelected = roomPlants.every((p) => next.has(p.id));
        if (allSelected) {
          roomPlants.forEach((p) => next.delete(p.id));
        } else {
          roomPlants.forEach((p) => next.add(p.id));
        }
        return next;
      });
    },
    [filteredPlants]
  );

  const handleBatchCare = useCallback(() => {
    if (selectedPlants.size === 0) {
      toast.error('Bitte waehle mindestens eine Pflanze aus.');
      return;
    }

    const now = new Date().toISOString();
    const config = careTypeConfig[careType];
    let count = 0;

    selectedPlants.forEach((plantId) => {
      logCareEvent({
        plant_id: plantId,
        type: careType,
        performed_at: now,
        notes: 'Batch-Pflege',
      });
      count++;
    });

    toast.success(`${count} ${count === 1 ? 'Pflanze' : 'Pflanzen'} ${config.label.toLowerCase()}!`, {
      description: 'Alle ausgewaehlten Pflanzen wurden gepflegt.',
      icon: <config.icon className={`h-5 w-5 ${config.color}`} />,
    });

    setSelectedPlants(new Set());
  }, [selectedPlants, careType, logCareEvent]);

  const getReminderInfo = useCallback(
    (plant: UserPlant) => {
      const reminder = reminders.find(
        (r) => r.plant_id === plant.id && r.type === careType
      );
      if (!reminder) return null;

      const dueDate = parseISO(reminder.due_date);
      const now = new Date();

      if (isBefore(dueDate, now) && !isToday(dueDate)) {
        const days = Math.ceil(
          (now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        return {
          status: 'overdue' as const,
          label: `${days} ${days === 1 ? 'Tag' : 'Tage'} ueberfaellig`,
        };
      }
      if (isToday(dueDate)) {
        return { status: 'today' as const, label: 'Heute faellig' };
      }
      return {
        status: 'upcoming' as const,
        label: format(dueDate, 'dd. MMM', { locale: de }),
      };
    },
    [reminders, careType]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ListChecks className="h-7 w-7 text-primary" />
          Batch-Pflege
        </h1>
        <p className="text-muted-foreground mt-1">
          Pflege mehrere Pflanzen gleichzeitig mit einem Klick.
        </p>
      </div>

      {/* Care Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pflege-Aktion waehlen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {(Object.entries(careTypeConfig) as [CareType, typeof careTypeConfig.water][]).map(
              ([type, config]) => {
                const Icon = config.icon;
                const isActive = careType === type;
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setCareType(type);
                      setSelectedPlants(new Set());
                    }}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-all ${
                      isActive
                        ? `border-primary bg-primary/5 ring-2 ring-primary/20`
                        : 'border-border hover:border-primary/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`h-9 w-9 rounded-full ${config.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <span className="text-xs font-medium">{config.label}</span>
                  </button>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filter & Selection Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant={filterMode === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterMode('all')}
          >
            Alle
          </Button>
          <Button
            size="sm"
            variant={filterMode === 'overdue' ? 'default' : 'outline'}
            onClick={() => setFilterMode('overdue')}
            className="gap-1"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Nur Ueberfaellige
            {overduePlantIds.size > 0 && (
              <Badge variant="destructive" className="ml-1 h-4 px-1 text-[10px]">
                {overduePlantIds.size}
              </Badge>
            )}
          </Button>
          {rooms.length > 0 && (
            <select
              value={filterMode === 'room' ? filterRoom : ''}
              onChange={(e) => {
                if (e.target.value) {
                  setFilterMode('room');
                  setFilterRoom(e.target.value);
                } else {
                  setFilterMode('all');
                  setFilterRoom('');
                }
              }}
              className="h-8 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Nach Raum filtern...</option>
              {rooms.map((r) => {
                const apt = apartments.find((a) => a.id === r.apartment_id);
                return (
                  <option key={r.id} value={r.id}>
                    {r.name} {apt ? `(${apt.name})` : ''}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={selectAll}>
            Alle waehlen
          </Button>
          <Button size="sm" variant="ghost" onClick={selectNone}>
            Keine
          </Button>
          {overduePlantIds.size > 0 && (
            <Button size="sm" variant="ghost" onClick={selectOverdue} className="text-red-600">
              Ueberfaellige
            </Button>
          )}
        </div>
      </div>

      {/* Plant List */}
      {filteredPlants.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">
              {filterMode === 'overdue'
                ? 'Keine ueberfaelligen Pflanzen fuer diese Pflege-Aktion.'
                : 'Keine Pflanzen vorhanden.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {plantsByRoom.map(([roomId, group]) => (
            <Card key={roomId}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DoorOpen className="h-4 w-4 text-muted-foreground" />
                    {group.roomName}
                    {group.apartmentName && (
                      <span className="text-muted-foreground font-normal">
                        — {group.apartmentName}
                      </span>
                    )}
                    <Badge variant="secondary" className="ml-1">
                      {group.plants.length}
                    </Badge>
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7"
                    onClick={() => selectRoom(roomId)}
                  >
                    {group.plants.every((p) => selectedPlants.has(p.id))
                      ? 'Abwaehlen'
                      : 'Alle waehlen'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {group.plants.map((plant) => {
                    const isSelected = selectedPlants.has(plant.id);
                    const reminderInfo = getReminderInfo(plant);
                    const isOverdue = overduePlantIds.has(plant.id);

                    return (
                      <label
                        key={plant.id}
                        className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : isOverdue
                              ? 'border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/10'
                              : 'border-transparent hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => togglePlant(plant.id)}
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {plant.nickname || plant.species?.common_name || 'Unbekannt'}
                            </p>
                            {plant.nickname && plant.species && (
                              <p className="text-xs text-muted-foreground">
                                {plant.species.common_name}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {reminderInfo && (
                            <Badge
                              variant={
                                reminderInfo.status === 'overdue'
                                  ? 'destructive'
                                  : reminderInfo.status === 'today'
                                    ? 'default'
                                    : 'secondary'
                              }
                              className="text-xs"
                            >
                              {reminderInfo.label}
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              plant.health_status === 'thriving'
                                ? 'border-green-300 text-green-700 dark:text-green-400'
                                : plant.health_status === 'good'
                                  ? 'border-emerald-300 text-emerald-700 dark:text-emerald-400'
                                  : plant.health_status === 'fair'
                                    ? 'border-yellow-300 text-yellow-700 dark:text-yellow-400'
                                    : 'border-red-300 text-red-700 dark:text-red-400'
                            }`}
                          >
                            {plant.health_status === 'thriving'
                              ? 'Praechtig'
                              : plant.health_status === 'good'
                                ? 'Gut'
                                : plant.health_status === 'fair'
                                  ? 'Maessig'
                                  : 'Schlecht'}
                          </Badge>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Sticky Action Bar */}
      {filteredPlants.length > 0 && (
        <div className="sticky bottom-4 z-10">
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full ${careTypeConfig[careType].bgColor} flex items-center justify-center`}>
                  {(() => {
                    const Icon = careTypeConfig[careType].icon;
                    return <Icon className={`h-5 w-5 ${careTypeConfig[careType].color}`} />;
                  })()}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {selectedPlants.size} {selectedPlants.size === 1 ? 'Pflanze' : 'Pflanzen'} ausgewaehlt
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Aktion: {careTypeConfig[careType].label}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleBatchCare}
                disabled={selectedPlants.size === 0}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                {careTypeConfig[careType].label} ({selectedPlants.size})
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
