/** Identité et URLs BeWork — plateforme MOEX (maîtrise d'œuvre d'exécution) */
import { MOEX_MISSION_TYPES, MOEX_PLATFORM } from './moex-platform';

export const BEWORK = {
  name: 'BeWork',
  /** Tagline plateforme / logo */
  brandTagline: 'Assistants MOEX augmentés par l\'IA',
  /** Description métier */
  tagline: "Relais administratif pour la maîtrise d'œuvre d'exécution",
  audience: MOEX_PLATFORM.audience,
  audienceLong: MOEX_PLATFORM.audienceLong,
  scopeLine: MOEX_PLATFORM.scopeLine,
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
