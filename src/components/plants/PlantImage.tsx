import { useState, useEffect } from 'react';
import { Flower2, Leaf, TreePine, Sprout } from 'lucide-react';

const FAMILY_GRADIENTS: Record<string, string> = {
  Araceae: 'from-green-200 via-emerald-100 to-teal-200 dark:from-green-900/50 dark:via-emerald-900/40 dark:to-teal-900/50',
  Cactaceae: 'from-yellow-200 via-amber-100 to-orange-200 dark:from-yellow-900/50 dark:via-amber-900/40 dark:to-orange-900/50',
  Asparagaceae: 'from-teal-200 via-cyan-100 to-green-200 dark:from-teal-900/50 dark:via-cyan-900/40 dark:to-green-900/50',
  Moraceae: 'from-emerald-200 via-green-100 to-lime-200 dark:from-emerald-900/50 dark:via-green-900/40 dark:to-lime-900/50',
  Marantaceae: 'from-lime-200 via-green-100 to-emerald-200 dark:from-lime-900/50 dark:via-green-900/40 dark:to-emerald-900/50',
  Strelitziaceae: 'from-orange-200 via-amber-100 to-yellow-200 dark:from-orange-900/50 dark:via-amber-900/40 dark:to-yellow-900/50',
  Orchidaceae: 'from-pink-200 via-fuchsia-100 to-purple-200 dark:from-pink-900/50 dark:via-fuchsia-900/40 dark:to-purple-900/50',
  Piperaceae: 'from-cyan-200 via-sky-100 to-blue-200 dark:from-cyan-900/50 dark:via-sky-900/40 dark:to-blue-900/50',
  Asphodelaceae: 'from-green-200 via-lime-100 to-yellow-200 dark:from-green-900/50 dark:via-lime-900/40 dark:to-yellow-900/50',
  Lamiaceae: 'from-purple-200 via-violet-100 to-indigo-200 dark:from-purple-900/50 dark:via-violet-900/40 dark:to-indigo-900/50',
  Crassulaceae: 'from-stone-200 via-green-100 to-emerald-200 dark:from-stone-900/50 dark:via-green-900/40 dark:to-emerald-900/50',
  Arecaceae: 'from-green-200 via-lime-100 to-teal-200 dark:from-green-900/50 dark:via-lime-900/40 dark:to-teal-900/50',
};

const FAMILY_ICONS: Record<string, typeof Leaf> = {
  Araceae: Leaf,
  Cactaceae: Sprout,
  Asparagaceae: TreePine,
  Moraceae: Leaf,
  Orchidaceae: Flower2,
  Arecaceae: TreePine,
};

const DEFAULT_GRADIENT = 'from-green-200 via-emerald-100 to-teal-200 dark:from-green-900/50 dark:via-emerald-900/40 dark:to-teal-900/50';

// Persistent localStorage cache for Wikipedia image URLs
const CACHE_KEY = 'pm_plant_images';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheEntry {
  url: string | null;
  ts: number;
}

function loadPersistedCache(): Map<string, string | null> {
  const map = new Map<string, string | null>();
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const entries: Record<string, CacheEntry> = JSON.parse(raw);
      const now = Date.now();
      for (const [key, entry] of Object.entries(entries)) {
        if (now - entry.ts < CACHE_TTL_MS) {
          map.set(key, entry.url);
        }
      }
    }
  } catch { /* ignore corrupt cache */ }
  return map;
}

function persistCache(cache: Map<string, string | null>) {
  try {
    const entries: Record<string, CacheEntry> = {};
    const now = Date.now();
    cache.forEach((url, key) => {
      entries[key] = { url, ts: now };
    });
    localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
  } catch { /* storage full, ignore */ }
}

const imageCache = loadPersistedCache();

async function fetchWikipediaImage(botanicalName: string): Promise<string | null> {
  if (imageCache.has(botanicalName)) {
    return imageCache.get(botanicalName) ?? null;
  }

  try {
    const searchName = botanicalName.split(' ').slice(0, 2).join(' ');
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchName.replace(/ /g, '_'))}`;
    const response = await fetch(url);
    if (!response.ok) {
      imageCache.set(botanicalName, null);
      persistCache(imageCache);
      return null;
    }
    const data = await response.json();
    const imageUrl = data.thumbnail?.source ?? data.originalimage?.source ?? null;
    const highResUrl = imageUrl?.replace(/\/\d+px-/, '/400px-') ?? null;
    imageCache.set(botanicalName, highResUrl);
    persistCache(imageCache);
    return highResUrl;
  } catch {
    imageCache.set(botanicalName, null);
    return null;
  }
}

interface PlantImageProps {
  botanicalName: string;
  family?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PlantImage({ botanicalName, family = '', className = '', size = 'md' }: PlantImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(imageCache.get(botanicalName) ?? null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!imageCache.has(botanicalName));

  useEffect(() => {
    if (imageCache.has(botanicalName)) {
      setImageUrl(imageCache.get(botanicalName) ?? null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    fetchWikipediaImage(botanicalName).then((url) => {
      if (!cancelled) {
        setImageUrl(url);
        setIsLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [botanicalName]);

  const gradient = FAMILY_GRADIENTS[family] || DEFAULT_GRADIENT;
  const FamilyIcon = FAMILY_ICONS[family] || Flower2;
  const heightClass = size === 'sm' ? 'h-20' : size === 'lg' ? 'h-48' : 'h-32';

  const showFallback = !imageUrl || hasError;

  return (
    <div className={`${heightClass} relative overflow-hidden ${className}`}>
      {/* Gradient background (always rendered, visible as fallback) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <FamilyIcon className={`${size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-16 w-16' : 'h-12 w-12'} text-green-700/20 dark:text-green-300/20`} />
        </div>
      </div>

      {/* Actual image */}
      {!showFallback && (
        <img
          src={imageUrl}
          alt={botanicalName}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}

      {/* Loading shimmer */}
      {isLoading && !showFallback && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      )}
    </div>
  );
}
