/** Favoris et types récents (localStorage, côté client uniquement). */

export const MISSION_FAVORITES_KEY = 'bework.missionType.favorites';
export const MISSION_RECENT_KEY = 'bework.missionType.recent';
const MAX_RECENT = 6;
const MAX_FAVORITES = 12;

function readIds(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(ids.slice(0, key === MISSION_FAVORITES_KEY ? MAX_FAVORITES : MAX_RECENT)));
}

export function getFavoriteMissionTypes(): string[] {
  return readIds(MISSION_FAVORITES_KEY);
}

export function toggleFavoriteMissionType(id: string): string[] {
  const current = readIds(MISSION_FAVORITES_KEY);
  const next = current.includes(id) ? current.filter((x) => x !== id) : [id, ...current];
  writeIds(MISSION_FAVORITES_KEY, next);
  return next;
}

export function recordRecentMissionType(id: string): string[] {
  const current = readIds(MISSION_RECENT_KEY).filter((x) => x !== id);
  const next = [id, ...current];
  writeIds(MISSION_RECENT_KEY, next);
  return next;
}

export function getRecentMissionTypes(): string[] {
  return readIds(MISSION_RECENT_KEY);
}
