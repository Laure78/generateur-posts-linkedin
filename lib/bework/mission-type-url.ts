import { MISSION_TYPES } from './config';

export function isValidMissionTypeId(type: string | null | undefined): type is (typeof MISSION_TYPES)[number]['id'] {
  return Boolean(type && MISSION_TYPES.some((t) => t.id === type));
}

export function missionTypeFromSearchParam(typeParam: string | null): string {
  if (isValidMissionTypeId(typeParam)) return typeParam;
  return 'cr-chantier-moex';
}
