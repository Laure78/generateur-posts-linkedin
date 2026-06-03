/** Rôles plateforme BeWork (table profiles.role). */
export const BEWORK_ROLES = ['client', 'beworker', 'chef_equipe', 'admin'] as const;
export type BeworkRole = (typeof BEWORK_ROLES)[number];

export function parseBeworkRole(value: string | null | undefined): BeworkRole {
  if (value && (BEWORK_ROLES as readonly string[]).includes(value)) {
    return value as BeworkRole;
  }
  return 'beworker';
}

export function isChefOrAdmin(role: BeworkRole): boolean {
  return role === 'chef_equipe' || role === 'admin';
}

export function canAccessAdminPlatform(role: BeworkRole): boolean {
  return isChefOrAdmin(role);
}

export const ROLE_LABELS: Record<BeworkRole, string> = {
  client: 'Client',
  beworker: 'Assistant travaux',
  chef_equipe: "Chef d'équipe",
  admin: 'Administrateur',
};
