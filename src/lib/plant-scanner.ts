import { PlantSpecies } from '@/types';
import { PLANT_SPECIES } from '@/data/plants';

// ═══════════════════════════════════════════════════════════════
// VISUAL FEATURE DATABASE — Detailed recognition features per plant
// ═══════════════════════════════════════════════════════════════

interface VisualProfile {
  /** Primary visual keywords for this plant */
  keywords: string[];
  /** Leaf shape descriptors */
  leafShape: string[];
  /** Leaf color / pattern descriptors */
  leafPattern: string[];
  /** Growth habit descriptors */
  growthHabit: string[];
  /** Distinguishing features */
  distinctive: string[];
  /** German common synonyms for matching */
  synonyms: string[];
}

/**
 * Hand-curated visual profiles for the most common species.
 * Provides much stronger identification than auto-generated keywords.
 */
const CURATED_PROFILES: Record<string, Partial<VisualProfile>> = {
  'plant-001': { // Monstera
    leafShape: ['geschlitzt', 'geloecht', 'gross', 'herzfoermig', 'gefenstert'],
    leafPattern: ['dunkelgruen', 'glaenzend', 'lederartig'],
    growthHabit: ['kletterpflanze', 'rankend', 'aufrecht', 'luftwurzeln'],
    distinctive: ['fensterblatt', 'schweizer kaese', 'loecher im blatt', 'geschlitzte blaetter'],
    synonyms: ['fensterblatt', 'monstera deliciosa', 'swiss cheese plant'],
  },
  'plant-002': { // Efeutute
    leafShape: ['herzfoermig', 'spitz', 'mittelgross'],
    leafPattern: ['gruen-gelb', 'panaschiert', 'marmoriert', 'golden'],
    growthHabit: ['haengend', 'kletternd', 'rankend', 'ampelpflanze'],
    distinctive: ['panaschierte herzblatter', 'goldene flecken', 'luftreiniger'],
    synonyms: ['pothos', 'golden pothos', 'epipremnum'],
  },
  'plant-003': { // Gummibaum
    leafShape: ['oval', 'gross', 'dick', 'lederartig'],
    leafPattern: ['dunkelgruen', 'glaenzend', 'burgunder', 'glatt'],
    growthHabit: ['aufrecht', 'baumartig', 'stamm'],
    distinctive: ['dicke glaenzende blaetter', 'milchsaft', 'robuster baum'],
    synonyms: ['ficus elastica', 'rubber plant', 'kautschukbaum'],
  },
  'plant-005': { // Geigenfeige
    leafShape: ['geigenfoermig', 'wellig', 'gross', 'breit'],
    leafPattern: ['dunkelgruen', 'glaenzend', 'adern sichtbar'],
    growthHabit: ['aufrecht', 'baumartig', 'unverzweigt'],
    distinctive: ['geigenfoermige blaetter', 'welliger rand', 'grossblaettrig'],
    synonyms: ['fiddle leaf fig', 'ficus lyrata'],
  },
  'plant-051': { // Echeveria
    leafShape: ['rosette', 'fleischig', 'spitz', 'kompakt'],
    leafPattern: ['blaugruen', 'rosa spitzen', 'pudrig', 'mehlig'],
    growthHabit: ['rosette', 'flach', 'kompakt', 'bodennah'],
    distinctive: ['perfekte rosette', 'sukkulente rosette', 'wachsartig'],
    synonyms: ['echeveria', 'steinrose'],
  },
  'plant-055': { // Geldbaum
    leafShape: ['oval', 'dick', 'fleischig', 'glatt', 'rund'],
    leafPattern: ['dunkelgruen', 'glaenzend', 'glatt'],
    growthHabit: ['baumartig', 'stamm', 'verzweigt', 'kompakt'],
    distinctive: ['glaenzende dicke blaetter', 'holziger stamm', 'jade pflanze'],
    synonyms: ['jade plant', 'crassula ovata', 'pfennigbaum sukkulent'],
  },
  'plant-063': { // Goldfruchtpalme
    leafShape: ['gefiedert', 'lang', 'schmal', 'fiedern'],
    leafPattern: ['hellgruen', 'gelbgruen', 'frischgruen'],
    growthHabit: ['aufrecht', 'bueschelig', 'palmenwedel', 'mehrstammig'],
    distinctive: ['goldgelbe stiele', 'elegante wedel', 'tropische palme'],
    synonyms: ['areca palm', 'dypsis lutescens', 'goldpalme'],
  },
  'plant-068': { // Schwertfarn
    leafShape: ['gefiedert', 'lang', 'ueberhangend', 'spitz'],
    leafPattern: ['hellgruen', 'frischgruen', 'zart'],
    growthHabit: ['haengend', 'ueberhaengend', 'buschig', 'ampel'],
    distinctive: ['zarte fiedern', 'ueberhaengende wedel', 'farnwedel'],
    synonyms: ['boston fern', 'nephrolepis', 'zimmerfarn'],
  },
  'plant-074': { // Phalaenopsis
    leafShape: ['oval', 'fleischig', 'dick', 'breit'],
    leafPattern: ['dunkelgruen', 'glaenzend'],
    growthHabit: ['aufrecht', 'bluetenstiel', 'epiphytisch'],
    distinctive: ['schmetterlingsfoermige blueten', 'orchideenbluete', 'langer bluetenstiel', 'luftwurzeln'],
    synonyms: ['schmetterlingsorchidee', 'orchidee', 'moth orchid'],
  },
  'plant-081': { // Basilikum
    leafShape: ['oval', 'spitz', 'zart', 'weich'],
    leafPattern: ['gruen', 'mattgruen', 'zart'],
    growthHabit: ['aufrecht', 'buschig', 'krautig'],
    distinctive: ['aromatisch', 'kuchenkraut', 'duftend wenn beruehrt'],
    synonyms: ['basil', 'ocimum basilicum', 'koenigskraut'],
  },
  'plant-100': { // Strelitzie
    leafShape: ['gross', 'laenglich', 'bananenfoermig', 'paddelfoermig'],
    leafPattern: ['graugruen', 'mattgruen', 'lederartig'],
    growthHabit: ['aufrecht', 'faecherfoermig', 'horstartig'],
    distinctive: ['vogelfoermige bluete', 'orange-blaue bluete', 'paradiesvogel'],
    synonyms: ['paradiesvogelblume', 'bird of paradise', 'strelitzia reginae'],
  },
  'plant-111': { // Tillandsie
    leafShape: ['schmal', 'spitz', 'rosette', 'klein'],
    leafPattern: ['silbrig', 'grau', 'schuppig'],
    growthHabit: ['epiphytisch', 'ohne erde', 'luftpflanze'],
    distinctive: ['keine erde', 'silbrige schuppen', 'haengt frei'],
    synonyms: ['air plant', 'tillandsia', 'luftpflanze'],
  },
  'plant-127': { // Pfennigbaum / Pilea
    leafShape: ['rund', 'kreisrund', 'flach', 'muenzenfoermig'],
    leafPattern: ['hellgruen', 'glatt', 'glaenzend'],
    growthHabit: ['aufrecht', 'kompakt', 'stammbildend'],
    distinctive: ['muenzenfoermige blaetter', 'runde blaetter auf stielen', 'kindel'],
    synonyms: ['chinese money plant', 'ufopflanze', 'pilea peperomioides', 'glueckstaler'],
  },
  'plant-144': { // Gruenlilie
    leafShape: ['lang', 'schmal', 'spitz', 'bogig', 'grasartig'],
    leafPattern: ['gruen-weiss', 'gestreift', 'panaschiert'],
    growthHabit: ['ueberhaengend', 'haengend', 'auslaeufer', 'kindel'],
    distinctive: ['kindel an ausleufern', 'gruen-weiss gestreift', 'unverwuestlich'],
    synonyms: ['spider plant', 'chlorophytum', 'brautschleppe'],
  },
  'plant-145': { // Aloe Vera
    leafShape: ['fleischig', 'dick', 'lanzettlich', 'gezahnt', 'spitz'],
    leafPattern: ['gruen', 'gelbgruen', 'gefleckt'],
    growthHabit: ['rosette', 'aufrecht', 'kompakt'],
    distinctive: ['gezaehnte blattraender', 'gel im blatt', 'heilpflanze', 'dickfleischig'],
    synonyms: ['aloe', 'aloe barbadensis', 'wuestenrose'],
  },
};

// ═══════════════════════════════════════════════════════════════
// SYNONYM & CATEGORY DICTIONARIES — Fuzzy matching support
// ═══════════════════════════════════════════════════════════════

/** Maps common German/English terms to canonical keywords */
const SYNONYMS: Record<string, string[]> = {
  // Leaf shapes
  'herzfoermig': ['herz', 'herzblatt', 'heart-shaped', 'cordate'],
  'rund': ['kreisrund', 'muenzenfoermig', 'round', 'circular'],
  'oval': ['eifoermig', 'elliptisch', 'egg-shaped'],
  'spitz': ['lanzettlich', 'zugespitzt', 'pointed', 'lanzettfoermig'],
  'gefiedert': ['fieder', 'fiedern', 'pinnate', 'wedel'],
  'geschlitzt': ['geloecht', 'fenster', 'gespalten', 'gefenstert', 'perforiert'],
  'geigenfoermig': ['fiddle', 'geige', 'violin'],

  // Colors
  'gruen': ['green', 'grün'],
  'dunkelgruen': ['dark green', 'tiefgruen', 'sattgruen'],
  'hellgruen': ['light green', 'frischgruen', 'limettengruen'],
  'silber': ['silbern', 'silbrig', 'silver', 'metallic'],
  'rot': ['red', 'weinrot', 'burgunder', 'dunkelrot'],
  'rosa': ['pink', 'rose', 'zartrosa'],
  'gelb': ['yellow', 'golden', 'gelblich'],
  'violett': ['lila', 'purple', 'violet', 'mauve'],
  'weiss': ['white', 'creme', 'cremig', 'elfenbein'],
  'bunt': ['farbenfroh', 'mehrfarbig', 'colorful', 'panaschiert'],

  // Patterns
  'panaschiert': ['variegated', 'bunt', 'gemustert', 'weiss-gruen', 'creme-gruen'],
  'gestreift': ['streifen', 'striped', 'liniert', 'zebra'],
  'gefleckt': ['punkte', 'spotted', 'getupft', 'polka'],
  'marmoriert': ['marmor', 'marbled', 'gemasert'],

  // Growth habits
  'haengend': ['hanging', 'ampel', 'ueberhaengend', 'haengepflanze', 'trailing'],
  'kletternd': ['kletterpflanze', 'climbing', 'rankend', 'ranke'],
  'aufrecht': ['upright', 'stehend', 'saeulenfoermig'],
  'buschig': ['compact', 'kompakt', 'dicht', 'bushy'],
  'rosette': ['rosettenfoermig', 'sternfoermig'],
  'baumartig': ['stamm', 'tree-like', 'verholzend'],

  // Categories
  'sukkulente': ['sukkulent', 'succulent', 'dickblatt', 'fleischig'],
  'kaktus': ['kakteen', 'cactus', 'stachelig', 'dornen'],
  'farn': ['fern', 'farnkraut', 'wedel'],
  'orchidee': ['orchid', 'orchidaceae', 'phalaenopsis'],
  'palme': ['palm', 'palmen', 'palmwedel', 'arecaceae'],
  'kraeuter': ['herb', 'kraut', 'kuchenkraut', 'gewuerz', 'heilkraut'],
  'luftpflanze': ['air plant', 'tillandsie', 'epiphyt', 'ohne erde'],

  // Special features
  'giftig': ['toxic', 'toxisch', 'unvertraeglich'],
  'haustierfreundlich': ['pet safe', 'ungiftig', 'katzenfreundlich', 'hundefreundlich'],
  'luftreinigend': ['air purifying', 'luftfilter', 'raumluft'],
  'duftend': ['fragrant', 'aromatisch', 'wohlriechend', 'parfuemiert'],
  'bluehend': ['flowering', 'bluete', 'blueten', 'blühpflanze'],
};

/** Category keywords and their matching plant tags */
const CATEGORY_MATCHERS: Record<string, string[]> = {
  'anfaenger': ['Anfänger', 'Pflegeleicht'],
  'anfänger': ['Anfänger', 'Pflegeleicht'],
  'einfach': ['Anfänger', 'Pflegeleicht'],
  'pflegeleicht': ['Anfänger', 'Pflegeleicht'],
  'tropisch': ['Tropisch'],
  'exotisch': ['Exotisch'],
  'selten': ['Selten', 'Sammler'],
  'gross': ['Gross'],
  'klein': ['Kompakt'],
  'kompakt': ['Kompakt', 'Schreibtisch'],
  'badezimmer': ['Badezimmer', 'Farn'],
  'terrarium': ['Terrarium', 'Kompakt'],
  'mediterran': ['Mediterran'],
  'haustier': ['Haustierfreundlich'],
  'katze': ['Haustierfreundlich'],
  'hund': ['Haustierfreundlich'],
  'kinder': ['Haustierfreundlich'],
};

// ═══════════════════════════════════════════════════════════════
// BUILD COMPLETE VISUAL PROFILES
// ═══════════════════════════════════════════════════════════════

const VISUAL_PROFILES: Record<string, VisualProfile> = {};

PLANT_SPECIES.forEach(plant => {
  const curated = CURATED_PROFILES[plant.id];

  // Auto-generate base keywords from plant data
  const autoKeywords: string[] = [
    plant.common_name.toLowerCase(),
    plant.botanical_name.toLowerCase(),
    plant.family.toLowerCase(),
    ...plant.tags.map(t => t.toLowerCase()),
  ];

  // Extract visual terms from description
  const desc = plant.description.toLowerCase();
  const autoVisualTerms = [
    'geschlitzt', 'herzfoermig', 'panaschiert', 'geigenfoermig', 'gross',
    'dick', 'fleischig', 'lanzettenfoermig', 'gestreift', 'bunt',
    'rund', 'oval', 'spitz', 'glaenzend', 'samtig', 'behaart',
    'gefleckt', 'marmoriert', 'gewellt', 'aufrecht', 'haengend',
    'ranke', 'rosette', 'gefiedert', 'filigran', 'kompakt',
    'skulptural', 'baumartig', 'saeulenfoermig', 'kletternd',
    'herzförmig', 'länglich', 'nadelförmig', 'schwertförmig',
    'trichterförmig', 'röhrenförmig', 'gelappt', 'gezähnt',
  ];

  const descMatches: string[] = [];
  autoVisualTerms.forEach(term => {
    if (desc.includes(term)) descMatches.push(term);
  });

  // Color extraction from description
  const colorTerms = [
    'grün', 'gruen', 'dunkelgrün', 'hellgrün', 'blaugrün',
    'rot', 'rosa', 'pink', 'gelb', 'orange',
    'violett', 'lila', 'weiss', 'weiß', 'silber', 'silbrig',
    'gold', 'golden', 'braun', 'bronze', 'bunt',
    'creme', 'cremig', 'burgundrot', 'weinrot',
  ];
  const descColors: string[] = [];
  colorTerms.forEach(c => {
    if (desc.includes(c)) descColors.push(c);
  });

  // Merge curated + auto-generated
  VISUAL_PROFILES[plant.id] = {
    keywords: [...autoKeywords, ...descMatches, ...descColors],
    leafShape: curated?.leafShape || [],
    leafPattern: curated?.leafPattern || [...descColors],
    growthHabit: curated?.growthHabit || [],
    distinctive: curated?.distinctive || [],
    synonyms: curated?.synonyms || [],
  };
});

// ═══════════════════════════════════════════════════════════════
// EXPORT TYPES
// ═══════════════════════════════════════════════════════════════

export interface ScanResult {
  species: PlantSpecies;
  confidence: number;
  matchedFeatures: string[];
}

export interface CareProtocol {
  species: PlantSpecies;
  weeklyTasks: CareTask[];
  seasonalNotes: string[];
  placement: string;
  warnings: string[];
}

export interface CareTask {
  type: 'water' | 'fertilize' | 'mist' | 'rotate' | 'prune' | 'repot';
  label: string;
  frequencyDays: number;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

// ═══════════════════════════════════════════════════════════════
// IMAGE ANALYSIS — Advanced color & texture analysis
// ═══════════════════════════════════════════════════════════════

export interface ImageAnalysis {
  colorHints: string[];
  dominantHue: string;
  brightness: 'dark' | 'medium' | 'bright';
  saturation: 'muted' | 'medium' | 'vivid';
  greenRatio: number;
  hasPattern: boolean;
  textureHints: string[];
}

/**
 * Analyze image colors, patterns and texture by drawing to canvas.
 * Returns detailed analysis object plus backward-compatible color hints.
 */
export function analyzeImageColors(imageElement: HTMLImageElement): string[] {
  const analysis = analyzeImageDetailed(imageElement);
  return analysis.colorHints;
}

export function analyzeImageDetailed(imageElement: HTMLImageElement): ImageAnalysis {
  const canvas = document.createElement('canvas');
  const size = 150; // higher resolution for better analysis
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      colorHints: [], dominantHue: 'unknown', brightness: 'medium',
      saturation: 'medium', greenRatio: 0, hasPattern: false, textureHints: [],
    };
  }

  ctx.drawImage(imageElement, 0, 0, size, size);
  const imageData = ctx.getImageData(0, 0, size, size).data;
  const pixelCount = size * size;

  // Aggregate color statistics
  let totalR = 0, totalG = 0, totalB = 0;
  let greenPixels = 0, brownPixels = 0, whitePixels = 0;
  let darkPixels = 0, brightPixels = 0;
  let redPixels = 0, yellowPixels = 0, pinkPixels = 0, purplePixels = 0;
  let satTotal = 0;

  // For texture/pattern detection: track color variance in regions
  const regionSize = 30;
  const regionColors: number[][] = [];

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    totalR += r;
    totalG += g;
    totalB += b;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lum = (max + min) / 2;
    const sat = max === 0 ? 0 : (max - min) / max;
    satTotal += sat;

    if (lum < 60) darkPixels++;
    if (lum > 200) brightPixels++;

    // Color classification with better thresholds
    if (g > r * 1.15 && g > b * 1.1 && g > 50) greenPixels++;
    if (r > g && r > b && r - g < 80 && g > 30 && lum < 160) brownPixels++;
    if (r > 200 && g > 200 && b > 200) whitePixels++;
    if (r > g * 1.4 && r > b * 1.4 && r > 100) redPixels++;
    if (r > 150 && g > 120 && b < 100 && g < r) yellowPixels++;
    if (r > 120 && b > 80 && g < r * 0.7 && r > b * 0.8) pinkPixels++;
    if (b > r * 0.9 && b > g * 1.1 && b > 80) purplePixels++;

    // Track region colors for pattern detection
    const px = ((i / 4) % size);
    const py = Math.floor((i / 4) / size);
    const regionIdx = Math.floor(py / regionSize) * Math.ceil(size / regionSize) + Math.floor(px / regionSize);
    if (!regionColors[regionIdx]) regionColors[regionIdx] = [0, 0, 0, 0];
    regionColors[regionIdx][0] += r;
    regionColors[regionIdx][1] += g;
    regionColors[regionIdx][2] += b;
    regionColors[regionIdx][3]++;
  }

  const avgR = totalR / pixelCount;
  const avgG = totalG / pixelCount;
  const avgB = totalB / pixelCount;
  const avgSat = satTotal / pixelCount;
  const greenRatio = greenPixels / pixelCount;

  // Calculate region color variance (pattern indicator)
  const regionAvgs = regionColors
    .filter(r => r && r[3] > 0)
    .map(r => [r[0] / r[3], r[1] / r[3], r[2] / r[3]]);

  let colorVariance = 0;
  if (regionAvgs.length > 1) {
    const totalAvg = [avgR, avgG, avgB];
    regionAvgs.forEach(ra => {
      const diff = Math.sqrt(
        (ra[0] - totalAvg[0]) ** 2 +
        (ra[1] - totalAvg[1]) ** 2 +
        (ra[2] - totalAvg[2]) ** 2
      );
      colorVariance += diff;
    });
    colorVariance /= regionAvgs.length;
  }

  // Build color hints
  const hints: string[] = [];
  if (greenRatio > 0.15) hints.push('gruen');
  if (greenRatio > 0.4) hints.push('dunkelgruen');
  if (greenRatio > 0.05 && greenRatio < 0.2) hints.push('hellgruen');
  if (brownPixels / pixelCount > 0.1) hints.push('braun');
  if (whitePixels / pixelCount > 0.2) hints.push('weiss');
  if (redPixels / pixelCount > 0.05) hints.push('rot');
  if (yellowPixels / pixelCount > 0.05) hints.push('gelb');
  if (pinkPixels / pixelCount > 0.05) hints.push('rosa');
  if (purplePixels / pixelCount > 0.05) hints.push('violett');

  // Texture/pattern hints
  const textureHints: string[] = [];
  if (colorVariance > 40) {
    hints.push('bunt');
    hints.push('panaschiert');
    textureHints.push('gemustert');
  }
  if (colorVariance > 25 && colorVariance <= 40) {
    textureHints.push('gestreift');
  }
  if (greenRatio > 0.35) {
    hints.push('blattschmuck');
    textureHints.push('blattpflanze');
  }
  if (greenRatio < 0.08 && (redPixels + pinkPixels + purplePixels + yellowPixels) / pixelCount > 0.1) {
    hints.push('bluete');
    textureHints.push('bluehend');
  }

  // Determine dominant hue
  let dominantHue = 'gruen';
  const hueScores: Record<string, number> = {
    gruen: greenPixels,
    braun: brownPixels,
    rot: redPixels,
    gelb: yellowPixels,
    rosa: pinkPixels,
    violett: purplePixels,
    weiss: whitePixels,
  };
  let maxHue = 0;
  Object.entries(hueScores).forEach(([hue, count]) => {
    if (count > maxHue) {
      maxHue = count;
      dominantHue = hue;
    }
  });

  return {
    colorHints: hints,
    dominantHue,
    brightness: darkPixels / pixelCount > 0.4 ? 'dark' : brightPixels / pixelCount > 0.3 ? 'bright' : 'medium',
    saturation: avgSat < 0.15 ? 'muted' : avgSat > 0.4 ? 'vivid' : 'medium',
    greenRatio,
    hasPattern: colorVariance > 25,
    textureHints,
  };
}

// ═══════════════════════════════════════════════════════════════
// PLANT IDENTIFICATION — Multi-factor scoring algorithm
// ═══════════════════════════════════════════════════════════════

/** Normalize a string for matching: lowercase, strip accents, common normalizations */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[é]/g, 'e')
    .replace(/[-_]/g, ' ')
    .trim();
}

/** Expand query terms using synonym dictionary */
function expandTerms(terms: string[]): string[] {
  const expanded = new Set(terms);
  terms.forEach(term => {
    // Direct synonym lookup
    Object.entries(SYNONYMS).forEach(([key, syns]) => {
      if (key.includes(term) || term.includes(key) || syns.some(s => s.includes(term) || term.includes(s))) {
        expanded.add(normalize(key));
        syns.forEach(s => expanded.add(normalize(s)));
      }
    });
  });
  return [...expanded];
}

/** Calculate Levenshtein distance for fuzzy matching */
function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

/** Check if two strings are fuzzy-similar (Levenshtein distance <= threshold) */
function fuzzyMatch(a: string, b: string, threshold: number = 2): boolean {
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  if (a.length < 3 || b.length < 3) return a === b;
  return levenshtein(a, b) <= threshold;
}

/**
 * Identify plants based on text query and optional color/image analysis hints.
 * Uses multi-factor weighted scoring with fuzzy matching.
 */
export function identifyPlant(
  textQuery: string,
  colorHints: string[] = [],
  imageAnalysis?: ImageAnalysis
): ScanResult[] {
  const queryNorm = normalize(textQuery);
  const queryTerms = queryNorm.split(/[\s,;.]+/).filter(t => t.length >= 2);
  const expandedTerms = expandTerms(queryTerms);
  const allHints = colorHints.map(h => normalize(h));

  const results: ScanResult[] = [];

  PLANT_SPECIES.forEach(species => {
    const profile = VISUAL_PROFILES[species.id];
    if (!profile) return;

    const matchedFeatures: string[] = [];
    let score = 0;

    const nameNorm = normalize(species.common_name);
    const botanicalNorm = normalize(species.botanical_name);
    const familyNorm = normalize(species.family);

    // ─── TIER 1: EXACT NAME MATCH (highest weight) ───
    if (nameNorm === queryNorm || botanicalNorm === queryNorm) {
      score += 200;
      matchedFeatures.push(`Exakter Treffer: ${species.common_name}`);
    } else if (nameNorm.includes(queryNorm) || queryNorm.includes(nameNorm)) {
      score += 120;
      matchedFeatures.push(`Name: ${species.common_name}`);
    } else if (botanicalNorm.includes(queryNorm) || queryNorm.includes(botanicalNorm)) {
      score += 100;
      matchedFeatures.push(`Botanisch: ${species.botanical_name}`);
    }

    // Check synonyms for name match
    profile.synonyms.forEach(syn => {
      const synNorm = normalize(syn);
      if (synNorm === queryNorm || synNorm.includes(queryNorm) || queryNorm.includes(synNorm)) {
        score += 90;
        matchedFeatures.push(`Synonym: ${syn}`);
      }
    });

    // Fuzzy name matching
    if (score === 0 && queryTerms.length <= 2) {
      if (fuzzyMatch(nameNorm, queryNorm, 2)) {
        score += 60;
        matchedFeatures.push(`Aehnlich: ${species.common_name}`);
      }
    }

    // ─── TIER 2: TERM-BY-TERM FEATURE MATCHING ───
    expandedTerms.forEach(term => {
      if (term.length < 2) return;

      // Keywords match
      const keywordMatch = profile.keywords.some(k => fuzzyMatch(normalize(k), term, 1));
      if (keywordMatch) {
        score += 8;
      }

      // Leaf shape match (high weight — very distinctive)
      const shapeMatch = profile.leafShape.some(s => fuzzyMatch(s, term, 1));
      if (shapeMatch) {
        score += 15;
        if (!matchedFeatures.includes('Blattform')) matchedFeatures.push('Blattform');
      }

      // Leaf pattern/color match
      const patternMatch = profile.leafPattern.some(p => fuzzyMatch(p, term, 1));
      if (patternMatch) {
        score += 12;
        if (!matchedFeatures.includes('Blattmuster')) matchedFeatures.push('Blattmuster');
      }

      // Growth habit match
      const habitMatch = profile.growthHabit.some(h => fuzzyMatch(h, term, 1));
      if (habitMatch) {
        score += 10;
        if (!matchedFeatures.includes('Wuchsform')) matchedFeatures.push('Wuchsform');
      }

      // Distinctive feature match (high weight — best identifier)
      const distinctiveMatch = profile.distinctive.some(d => d.includes(term) || term.includes(d));
      if (distinctiveMatch) {
        score += 20;
        if (!matchedFeatures.includes('Besonderes Merkmal')) matchedFeatures.push('Besonderes Merkmal');
      }

      // Family match
      if (familyNorm.includes(term)) {
        score += 5;
        if (!matchedFeatures.includes('Familie')) matchedFeatures.push('Familie: ' + species.family);
      }

      // Category/tag match
      const categoryTags = CATEGORY_MATCHERS[term];
      if (categoryTags) {
        const tagMatch = species.tags.some(t => categoryTags.includes(t));
        if (tagMatch) {
          score += 6;
        }
      }
    });

    // ─── TIER 3: COLOR/IMAGE ANALYSIS BONUS ───
    allHints.forEach(hint => {
      // Match against leaf pattern
      if (profile.leafPattern.some(p => fuzzyMatch(p, hint, 1))) {
        score += 10;
        if (!matchedFeatures.includes('Farbe')) matchedFeatures.push('Farbe');
      }
      // Match against tags
      if (species.tags.some(t => normalize(t).includes(hint))) {
        score += 6;
      }
      // Match against description
      if (normalize(species.description).includes(hint)) {
        score += 3;
      }
    });

    // Image analysis bonus: green ratio correlates with foliage plants
    if (imageAnalysis) {
      if (imageAnalysis.greenRatio > 0.3 && species.tags.some(t =>
        ['Blattschmuck', 'Tropisch', 'Farn', 'Palme'].includes(t)
      )) {
        score += 5;
      }
      if (imageAnalysis.hasPattern && species.tags.some(t =>
        ['Blattschmuck', 'Panaschiert', 'Farbenfroh', 'Gestreift'].includes(t)
      )) {
        score += 8;
      }
      if (imageAnalysis.dominantHue === 'rot' || imageAnalysis.dominantHue === 'rosa') {
        if (species.tags.includes('Blühpflanze') || species.tags.includes('Farbenfroh')) {
          score += 6;
        }
      }
    }

    // ─── CONFIDENCE NORMALIZATION ───
    if (score > 0) {
      // Scale: 200+ = perfect match, 100 = strong, 50 = moderate, <20 = weak
      const confidence = Math.min(99, Math.round(
        score >= 200 ? 95 + Math.min(4, (score - 200) / 50) :
        score >= 100 ? 75 + (score - 100) / 5 :
        score >= 50 ? 50 + (score - 50) / 2 :
        score >= 20 ? 25 + (score - 20) * 0.83 :
        Math.max(5, score * 1.25)
      ));

      results.push({
        species,
        confidence,
        matchedFeatures: [...new Set(matchedFeatures)],
      });
    }
  });

  return results.sort((a, b) => b.confidence - a.confidence).slice(0, 15);
}

// ═══════════════════════════════════════════════════════════════
// CARE PROTOCOL GENERATION
// ═══════════════════════════════════════════════════════════════

/**
 * Generate a complete care protocol for a given plant species,
 * considering the current month and room conditions.
 */
export function generateCareProtocol(
  species: PlantSpecies,
  roomLight?: 'low' | 'medium' | 'bright' | 'direct'
): CareProtocol {
  const currentMonth = new Date().getMonth() + 1;
  const isGrowingSeason = [3, 4, 5, 6, 7, 8, 9].includes(currentMonth);
  const isWinter = [11, 12, 1, 2].includes(currentMonth);

  const weeklyTasks: CareTask[] = [];

  // Watering task
  const waterFreq = isWinter
    ? Math.round(species.water_frequency_days * 1.5)
    : species.water_frequency_days;
  weeklyTasks.push({
    type: 'water',
    label: 'Giessen',
    frequencyDays: waterFreq,
    description: getWaterDescription(species),
    priority: 'high',
  });

  // Fertilizing (only in growing season)
  if (species.fertilize_months.includes(currentMonth)) {
    weeklyTasks.push({
      type: 'fertilize',
      label: 'Duengen',
      frequencyDays: species.fertilize_frequency_days,
      description: `Mit Fluessigduenger alle ${species.fertilize_frequency_days} Tage duengen. ${species.difficulty === 'easy' ? 'Halbe Konzentration ist auch in Ordnung.' : 'Genaue Dosierung beachten.'}`,
      priority: 'medium',
    });
  }

  // Misting (for high humidity plants)
  if (species.humidity === 'high') {
    weeklyTasks.push({
      type: 'mist',
      label: 'Besprühen',
      frequencyDays: isWinter ? 2 : 3,
      description: 'Blaetter regelmaessig mit kalkarmem Wasser besprühen, besonders bei trockener Heizungsluft.',
      priority: isWinter ? 'high' : 'medium',
    });
  }

  // Rotating
  weeklyTasks.push({
    type: 'rotate',
    label: 'Drehen',
    frequencyDays: 7,
    description: 'Um eine Vierteldrehung drehen fuer gleichmaessiges Wachstum.',
    priority: 'low',
  });

  // Seasonal notes
  const seasonalNotes: string[] = [];
  if (isWinter) {
    seasonalNotes.push('Winter: Weniger giessen, nicht duengen, auf Zugluft achten.');
    if (species.temperature_min > 15) {
      seasonalNotes.push(`Mindesttemperatur ${species.temperature_min} Grad C beachten – nicht am kalten Fenster stehen lassen.`);
    }
  }
  if (isGrowingSeason) {
    seasonalNotes.push('Wachstumszeit: Regelmaessig duengen und mehr giessen.');
    if (species.growth_speed === 'fast') {
      seasonalNotes.push('Schnellwachsend – ggf. Rankhilfe oder groesseren Topf einplanen.');
    }
  }
  if (currentMonth === 3 || currentMonth === 4) {
    seasonalNotes.push('Guter Zeitpunkt zum Umtopfen, wenn der Topf zu eng wird.');
  }

  // Placement recommendation
  const placement = getPlacementRecommendation(species, roomLight);

  // Warnings
  const warnings: string[] = [];
  if (species.toxic_pets) {
    warnings.push('Giftig fuer Haustiere – ausser Reichweite von Katzen und Hunden aufstellen.');
  }
  if (species.toxic_children) {
    warnings.push('Giftig bei Verschlucken – ausser Reichweite von Kleinkindern aufstellen.');
  }
  if (species.water_amount === 'little') {
    warnings.push('Staunaesse unbedingt vermeiden! Lieber zu wenig als zu viel giessen.');
  }

  return { species, weeklyTasks, seasonalNotes, placement, warnings };
}

function getWaterDescription(species: PlantSpecies): string {
  switch (species.water_amount) {
    case 'little':
      return `Alle ${species.water_frequency_days} Tage sparsam giessen. Erde zwischen dem Giessen vollstaendig antrocknen lassen.`;
    case 'moderate':
      return `Alle ${species.water_frequency_days} Tage maessig giessen. Obere Erdschicht antrocknen lassen, dann gruendlich waessern.`;
    case 'much':
      return `Alle ${species.water_frequency_days} Tage reichlich giessen. Die Erde gleichmaessig feucht halten, aber Staunaesse vermeiden.`;
  }
}

function getPlacementRecommendation(
  species: PlantSpecies,
  roomLight?: string
): string {
  const lightMap: Record<string, string> = {
    low: 'Schattig bis halbschattig (Nordfenster oder Rauminneres)',
    medium: 'Halbschattig bis hell (Ost- oder Westfenster)',
    bright: 'Hell ohne direkte Sonne (helles Zimmer, gefiltertes Licht)',
    direct: 'Volle Sonne (Suedfenster, Balkon)',
  };

  let recommendation = `Idealer Standort: ${lightMap[species.light] || 'Hell'}. `;
  recommendation += `Temperatur: ${species.temperature_min}–${species.temperature_max} Grad C. `;

  if (species.humidity === 'high') {
    recommendation += 'Hohe Luftfeuchtigkeit bevorzugt – ideal fuer Badezimmer oder Kueche.';
  } else if (species.humidity === 'low') {
    recommendation += 'Kommt mit trockener Raumluft gut zurecht.';
  }

  if (roomLight && roomLight !== species.light) {
    const lightPriority = { low: 0, medium: 1, bright: 2, direct: 3 };
    const roomLevel = lightPriority[roomLight as keyof typeof lightPriority] ?? 1;
    const plantLevel = lightPriority[species.light] ?? 1;
    if (roomLevel < plantLevel) {
      recommendation += ' Der aktuelle Raum ist dunkler als ideal – Pflanzlampe empfohlen.';
    } else if (roomLevel > plantLevel + 1) {
      recommendation += ' Zu viel direktes Licht kann Blaetter verbrennen – Abstand zum Fenster halten.';
    }
  }

  return recommendation;
}

/**
 * Convert a CareProtocol into a human-readable weekly schedule string.
 */
export function formatWeeklySchedule(protocol: CareProtocol): string {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const lines: string[] = [];

  protocol.weeklyTasks.forEach(task => {
    if (task.frequencyDays <= 7) {
      const interval = Math.max(1, Math.round(7 / (7 / task.frequencyDays)));
      const scheduleDays: string[] = [];
      for (let i = 0; i < 7; i += interval) {
        scheduleDays.push(days[Math.min(i, 6)]);
      }
      lines.push(`${task.label}: ${scheduleDays.join(', ')}`);
    } else {
      lines.push(`${task.label}: Alle ${task.frequencyDays} Tage`);
    }
  });

  return lines.join('\n');
}
