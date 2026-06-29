import { MISSION_CATEGORIES, getOrderedCatalogMissions } from '@/lib/bework/mission-catalog';

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
  const catalog = getOrderedCatalogMissions();

  return MISSION_CATEGORIES.map((category) => ({
    category,
    actions: catalog
      .filter((m) => m.category === category.id)
      .map((m) => ({
        missionType: m.id,
        label: m.label,
        description: m.skillDescription,
        integrated: m.integrated,
      })),
  })).filter((g) => g.actions.length > 0);
}
