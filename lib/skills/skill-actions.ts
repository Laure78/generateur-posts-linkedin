import { MISSION_CATEGORIES, getCatalogMissions } from '@/lib/bework/mission-catalog';

export function newDemandeUrl(missionType: string): string {
  return `/plateforme/demandes/nouvelle?type=${encodeURIComponent(missionType)}`;
}

export type SkillAction = {
  missionType: string;
  label: string;
  icon: string;
  description: string;
  integrated: boolean;
};

export type SkillActionGroup = {
  category: (typeof MISSION_CATEGORIES)[number];
  actions: SkillAction[];
};

/** Assistants mis en avant sur le tableau de bord, regroupés par catégorie. */
const DASHBOARD_MISSION_TYPES = [
  'cr-chantier-moex',
  'suivi-observations',
  'courrier-moe',
  'analyse-dce-moex',
  'conformite-offre',
  'verification-dtu',
  'pv-reserves',
  'ordre-service',
  'suivi-acquereurs',
] as const;

export function getDashboardActionGroups(): SkillActionGroup[] {
  const catalog = getCatalogMissions();
  const featured = DASHBOARD_MISSION_TYPES.map((id) => catalog.find((m) => m.id === id)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m)
  );

  return MISSION_CATEGORIES.map((category) => ({
    category,
    actions: featured
      .filter((m) => m.category === category.id)
      .map((m) => ({
        missionType: m.id,
        label: m.label,
        icon: m.icon,
        description: m.skillDescription,
        integrated: m.integrated,
      })),
  })).filter((g) => g.actions.length > 0);
}
