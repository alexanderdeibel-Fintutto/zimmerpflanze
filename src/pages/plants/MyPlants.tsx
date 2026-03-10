import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '@/hooks/usePlantContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlant } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Droplets,
  Sparkles,
  Plus,
  Home,
  DoorOpen,
  Leaf,
  Filter,
  ArrowUpDown,
  Clock,
  MapPin,
  LayoutGrid,
  List,
} from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';
import { PlantImage } from '@/components/plants/PlantImage';

const healthLabels: Record<string, string> = {
  thriving: 'Praechtig',
  good: 'Gut',
  fair: 'Maessig',
  poor: 'Schlecht',
};

const healthBadgeVariants: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  thriving: 'success',
  good: 'success',
  fair: 'warning',
  poor: 'destructive',
};

type SortOption = 'name' | 'care-urgency' | 'health' | 'newest';
type ViewMode = 'grid' | 'list';

export default function MyPlants() {
  const navigate = useNavigate();
  const {
    plants,
    apartments,
    rooms,
    getEnrichedPlants,
    logCareEvent,
    getOverdueReminders,
  } = usePlants();

  const [filterApartment, setFilterApartment] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const enrichedPlants = useMemo(() => getEnrichedPlants(), [getEnrichedPlants]);
  const overdueReminders = useMemo(() => getOverdueReminders(), [getOverdueReminders]);

  const overdueMap = useMemo(() => {
    const map: Record<string, { water: boolean; fertilize: boolean }> = {};
    overdueReminders.forEach((r) => {
      if (!map[r.plant_id]) map[r.plant_id] = { water: false, fertilize: false };
      if (r.type === 'water') map[r.plant_id].water = true;
      if (r.type === 'fertilize') map[r.plant_id].fertilize = true;
    });
    return map;
  }, [overdueReminders]);

  const filteredPlants = useMemo(() => {
    let result = [...enrichedPlants];

    if (filterApartment !== 'all') {
      result = result.filter(
        (p) => p.room?.apartment?.id === filterApartment
      );
    }

    switch (sortBy) {
      case 'name':
        result.sort((a, b) =>
          (a.nickname || a.species?.common_name || '').localeCompare(
            b.nickname || b.species?.common_name || ''
          )
        );
        break;
      case 'care-urgency': {
        const urgencyScore = (p: UserPlant) => {
          const overdue = overdueMap[p.id];
          if (overdue?.water && overdue?.fertilize) return 0;
          if (overdue?.water) return 1;
          if (overdue?.fertilize) return 2;
          return 3;
        };
        result.sort((a, b) => urgencyScore(a) - urgencyScore(b));
        break;
      }
      case 'health': {
        const healthScore: Record<string, number> = {
          poor: 0,
          fair: 1,
          good: 2,
          thriving: 3,
        };
        result.sort(
          (a, b) => healthScore[a.health_status] - healthScore[b.health_status]
        );
        break;
      }
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }

    return result;
  }, [enrichedPlants, filterApartment, sortBy, overdueMap]);

  const groupedPlants = useMemo(() => {
    const groups: Record<
      string,
      {
        apartment: { id: string; name: string };
        rooms: Record<
          string,
          {
            room: { id: string; name: string };
            plants: UserPlant[];
          }
        >;
      }
    > = {};

    filteredPlants.forEach((plant) => {
      const aptId = plant.room?.apartment?.id || 'unknown';
      const aptName = plant.room?.apartment?.name || 'Unbekannte Wohnung';
      const roomId = plant.room?.id || 'unknown';
      const roomName = plant.room?.name || 'Unbekannter Raum';

      if (!groups[aptId]) {
        groups[aptId] = {
          apartment: { id: aptId, name: aptName },
          rooms: {},
        };
      }
      if (!groups[aptId].rooms[roomId]) {
        groups[aptId].rooms[roomId] = {
          room: { id: roomId, name: roomName },
          plants: [],
        };
      }
      groups[aptId].rooms[roomId].plants.push(plant);
    });

    return groups;
  }, [filteredPlants]);

  function handleWaterNow(e: React.MouseEvent, plantId: string) {
    e.stopPropagation();
    logCareEvent({
      plant_id: plantId,
      type: 'water',
      performed_at: new Date().toISOString(),
      notes: '',
    });
  }

  function handleFertilizeNow(e: React.MouseEvent, plantId: string) {
    e.stopPropagation();
    logCareEvent({
      plant_id: plantId,
      type: 'fertilize',
      performed_at: new Date().toISOString(),
      notes: '',
    });
  }

  function daysSinceWatered(plant: UserPlant): number | null {
    if (!plant.last_watered) return null;
    return differenceInDays(new Date(), parseISO(plant.last_watered));
  }

  // --- Empty state: no apartments ---
  if (apartments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
          <Home className="h-12 w-12 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">
          Zuerst eine Wohnung anlegen
        </h1>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Bevor du Pflanzen hinzufuegen kannst, musst du mindestens eine Wohnung
          und einen Raum anlegen, in dem deine Pflanzen stehen.
        </p>
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => navigate('/apartments')}
        >
          <Home className="mr-2 h-5 w-5" />
          Wohnung anlegen
        </Button>
      </div>
    );
  }

  // --- Empty state: no plants ---
  if (plants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
          <Leaf className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">
          Noch keine Pflanzen
        </h1>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Starte deine Pflanzensammlung, indem du deine erste Pflanze aus dem
          Katalog hinzufuegst.
        </p>
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate('/catalog')}
        >
          <Plus className="mr-2 h-5 w-5" />
          Pflanze hinzufuegen
        </Button>
      </div>
    );
  }

  // --- Main view ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meine Pflanzen</h1>
          <p className="text-muted-foreground">
            {plants.length} {plants.length === 1 ? 'Pflanze' : 'Pflanzen'} in
            deiner Sammlung
          </p>
        </div>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate('/catalog')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Pflanze hinzufuegen
        </Button>
      </div>

      {/* Filters, Sort & View Toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterApartment} onValueChange={setFilterApartment}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Wohnung filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Wohnungen</SelectItem>
              {apartments.map((apt) => (
                <SelectItem key={apt.id} value={apt.id}>
                  {apt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sortieren" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="care-urgency">Pflegebedarf</SelectItem>
              <SelectItem value="health">Gesundheit</SelectItem>
              <SelectItem value="newest">Neueste zuerst</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="ml-auto flex items-center gap-1 border rounded-md p-0.5">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted/50'}`}
            title="Kartenansicht"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted/50'}`}
            title="Listenansicht"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grouped plant display */}
      {Object.entries(groupedPlants).map(([aptId, group]) => (
        <div key={aptId} className="space-y-4">
          {/* Apartment header */}
          <div className="flex items-center gap-2 pt-2">
            <Home className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-semibold">{group.apartment.name}</h2>
          </div>

          {Object.entries(group.rooms).map(([roomId, roomGroup]) => (
            <div key={roomId} className="space-y-3">
              {/* Room header */}
              <div className="flex items-center gap-2 pl-4">
                <DoorOpen className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-base font-medium text-muted-foreground">
                  {roomGroup.room.name}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {roomGroup.plants.length}{' '}
                  {roomGroup.plants.length === 1 ? 'Pflanze' : 'Pflanzen'}
                </Badge>
              </div>

              {/* Grid view */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pl-4">
                  {roomGroup.plants.map((plant) => {
                    const overdue = overdueMap[plant.id];
                    const waterDays = daysSinceWatered(plant);
                    const speciesName =
                      plant.species?.common_name || 'Unbekannte Art';

                    return (
                      <Card
                        key={plant.id}
                        className={`overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${
                          overdue?.water
                            ? 'border-red-200 dark:border-red-800/50 ring-1 ring-red-200 dark:ring-red-800/30'
                            : ''
                        }`}
                        onClick={() => navigate(`/plants/${plant.id}`)}
                      >
                        {/* Plant image */}
                        <div className="relative">
                          <PlantImage
                            botanicalName={plant.species?.botanical_name || ''}
                            family={plant.species?.family}
                            size="sm"
                          />
                          <div className="absolute top-1.5 right-1.5">
                            <Badge
                              variant={healthBadgeVariants[plant.health_status]}
                              className="text-[9px] px-1.5 py-0"
                            >
                              {healthLabels[plant.health_status]}
                            </Badge>
                          </div>
                          {overdue?.water && (
                            <div className="absolute top-1.5 left-1.5">
                              <Badge variant="destructive" className="text-[9px] px-1.5 py-0">
                                <Droplets className="h-2.5 w-2.5 mr-0.5" />
                                Faellig
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-3 space-y-2">
                          <div className="min-h-[2.5rem]">
                            <h4 className="font-semibold text-sm leading-tight truncate">
                              {plant.nickname || speciesName}
                            </h4>
                            {plant.nickname && (
                              <p className="text-[11px] text-muted-foreground italic truncate">
                                {speciesName}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            {waterDays !== null ? (
                              <span className="flex items-center gap-0.5">
                                <Droplets className="h-3 w-3 text-blue-400" />
                                {waterDays}d
                              </span>
                            ) : (
                              <span className="flex items-center gap-0.5">
                                <Clock className="h-3 w-3" />
                                Neu
                              </span>
                            )}
                          </div>

                          {/* Compact action buttons */}
                          <div className="flex gap-1.5">
                            <Button
                              size="sm"
                              variant={overdue?.water ? 'default' : 'outline'}
                              className={`flex-1 h-7 text-xs ${
                                overdue?.water
                                  ? 'bg-blue-600 hover:bg-blue-700'
                                  : ''
                              }`}
                              onClick={(e) => handleWaterNow(e, plant.id)}
                            >
                              <Droplets className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant={overdue?.fertilize ? 'default' : 'outline'}
                              className={`flex-1 h-7 text-xs ${
                                overdue?.fertilize
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : ''
                              }`}
                              onClick={(e) => handleFertilizeNow(e, plant.id)}
                            >
                              <Sparkles className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* List view */}
              {viewMode === 'list' && (
                <div className="space-y-1.5 pl-4">
                  {roomGroup.plants.map((plant) => {
                    const overdue = overdueMap[plant.id];
                    const waterDays = daysSinceWatered(plant);
                    const speciesName =
                      plant.species?.common_name || 'Unbekannte Art';

                    return (
                      <div
                        key={plant.id}
                        className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                          overdue?.water
                            ? 'border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-950/20'
                            : 'border-border'
                        }`}
                        onClick={() => navigate(`/plants/${plant.id}`)}
                      >
                        {/* Thumbnail */}
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <PlantImage
                            botanicalName={plant.species?.botanical_name || ''}
                            family={plant.species?.family}
                            size="sm"
                            className="!h-10"
                          />
                        </div>

                        {/* Name */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {plant.nickname || speciesName}
                          </h4>
                          {plant.nickname && (
                            <p className="text-[11px] text-muted-foreground italic truncate">
                              {speciesName}
                            </p>
                          )}
                        </div>

                        {/* Status info */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {waterDays !== null && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Droplets className="h-3 w-3 text-blue-400" />
                              {waterDays}d
                            </span>
                          )}
                          <Badge
                            variant={healthBadgeVariants[plant.health_status]}
                            className="text-[9px] px-1.5 py-0"
                          >
                            {healthLabels[plant.health_status]}
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 flex-shrink-0">
                          <Button
                            size="sm"
                            variant={overdue?.water ? 'default' : 'outline'}
                            className={`h-7 w-7 p-0 ${
                              overdue?.water ? 'bg-blue-600 hover:bg-blue-700' : ''
                            }`}
                            onClick={(e) => handleWaterNow(e, plant.id)}
                          >
                            <Droplets className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant={overdue?.fertilize ? 'default' : 'outline'}
                            className={`h-7 w-7 p-0 ${
                              overdue?.fertilize ? 'bg-green-600 hover:bg-green-700' : ''
                            }`}
                            onClick={(e) => handleFertilizeNow(e, plant.id)}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
