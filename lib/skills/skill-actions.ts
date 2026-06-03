import { MOEX_DASHBOARD_MISSION_TYPES } from '@/lib/bework/moex-platform';
import { MISSION_CATEGORIES, getCatalogMissions } from '@/lib/bework/mission-catalog';

export function newDemandeUrl(missionType: string): string {
  return `/plateforme/demandes/nouvelle?type=${encodeURIComponent(missionType)}`;
}

export type SkillAction = {
  missionType: string;
  label: string;
  description: string;
  integrated: boolean;
};

export type SkillActionGroup = {
  category: (typeof MISSION_CATEGORIES)[number];
  actions: SkillAction[];
};

export function getDashboardActionGroups(): SkillActionGroup[] {
  const catalog = getCatalogMissions();
  const featured = MOEX_DASHBOARD_MISSION_TYPES.map((id) => catalog.find((m) => m.id === id)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m)
  );

  return MISSION_CATEGORIES.map((category) => ({
    category,
    actions: featured
      .filter((m) => m.category === category.id)
      .map((m) => ({
        missionType: m.id,
        label: m.label,
        description: m.skillDescription,
        integrated: m.integrated,
      })),
  })).filter((g) => g.actions.length > 0);
}
