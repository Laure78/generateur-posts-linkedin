/** Identité et URLs BeWork — outil interne assistants travaux (demandes MOEX) */
import { MOEX_MISSION_TYPES, MOEX_PLATFORM } from './moex-platform';

export const BEWORK = {
  name: 'BeWork',
  /** Tagline plateforme / logo */
  brandTagline: 'Assistants travaux augmentés par l\'IA',
  /** Rôle de l'outil (une phrase). */
  tagline: MOEX_PLATFORM.platformRoleLine,
  beworkerRole: MOEX_PLATFORM.beworkerRole,
  platformRoleLine: MOEX_PLATFORM.platformRoleLine,
  audience: MOEX_PLATFORM.audience,
  audienceLong: MOEX_PLATFORM.audienceLong,
  scopeLine: MOEX_PLATFORM.scopeLine,
  internalUseShort: MOEX_PLATFORM.internalUseShort,
  internalUseLong: MOEX_PLATFORM.internalUseLong,
  teamLeaderValidationAlert: MOEX_PLATFORM.teamLeaderValidationAlert,
  url: 'https://www.bework.fr',
  appUrl: 'https://app.laureolivie.fr',
  email: 'contact@bework.fr',
  accent: '#2563EB',
  accentBright: '#377CF3',
  accentSoft: '#DBEAFE',
  logo: '/images/bework-logo.png',
  logoBlueprint: '/images/bework-logo.png',
} as const;

/** Types de demande MOEX — 1 entrée = 1 skill (voir lib/skills/registry.ts) */
export const MISSION_TYPES = MOEX_MISSION_TYPES;

export type MissionTypeId = (typeof MISSION_TYPES)[number]['id'];
