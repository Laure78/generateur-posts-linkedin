import {
  MISSION_CATEGORIES,
  getCatalogMissions,
  type MissionCategory,
} from '@/lib/bework/mission-catalog';
import { getSkillForMissionType } from '@/lib/skills/registry';
import { newDemandeUrl } from './skill-actions';

export type SidebarAssistantItem = {
  missionType: string;
  label: string;
  href: string;
  integrated: boolean;
};

export type SidebarAssistantGroup = {
  category: MissionCategory;
  items: SidebarAssistantItem[];
};

export function getAssistantHref(missionType: string, integrated: boolean): string {
  if (integrated) {
    const skill = getSkillForMissionType(missionType);
    if (skill?.toolPath) return skill.toolPath;
  }
  return newDemandeUrl(missionType);
}

/** Tous les assistants du catalogue, regroupés par catégorie (menu latéral). */
export function getSidebarAssistantGroups(): SidebarAssistantGroup[] {
  const catalog = getCatalogMissions();

  return MISSION_CATEGORIES.map((category) => ({
    category,
    items: catalog
      .filter((m) => m.category === category.id)
      .map((m) => ({
        missionType: m.id,
        label: m.label,
        href: getAssistantHref(m.id, m.integrated),
        integrated: m.integrated,
      })),
  })).filter((g) => g.items.length > 0);
}
