/** Brouillon « Nouvelle demande » — localStorage côté client. */

export const DEMAND_DRAFT_KEY = 'bework.demandDraft.v1';

export type DemandDraft = {
  type: string;
  title: string;
  brief: string;
  chantier: string;
  guidedValues: Record<string, string>;
  step: 1 | 2;
  savedAt: string;
};

export function loadDemandDraft(): DemandDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(DEMAND_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemandDraft;
    if (!parsed?.type || !parsed.savedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDemandDraft(draft: Omit<DemandDraft, 'savedAt'>): void {
  if (typeof window === 'undefined') return;
  const hasContent =
    draft.title.trim() ||
    draft.brief.trim() ||
    draft.chantier.trim() ||
    Object.values(draft.guidedValues).some((v) => v.trim());
  if (!hasContent) {
    clearDemandDraft();
    return;
  }
  localStorage.setItem(
    DEMAND_DRAFT_KEY,
    JSON.stringify({ ...draft, savedAt: new Date().toISOString() } satisfies DemandDraft)
  );
}

export function clearDemandDraft(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DEMAND_DRAFT_KEY);
}

export function formatDraftAge(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `il y a ${h} h`;
  return `il y a ${Math.floor(h / 24)} j`;
}
