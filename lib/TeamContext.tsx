'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type TeamRole = 'proprietaire' | 'editeur' | 'lecteur';

const PREVIEW_ROLE_KEY = 'team_preview_role';

function getStoredRole(): TeamRole | null {
  if (typeof window === 'undefined') return null;
  try {
    const r = sessionStorage.getItem(PREVIEW_ROLE_KEY);
    if (r === 'lecteur' || r === 'editeur' || r === 'proprietaire') return r;
  } catch {
    // ignore
  }
  return null;
}

type TeamContextValue = {
  role: TeamRole;
  isPreviewMode: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canManageTeam: boolean;
  setPreviewRole: (role: TeamRole | null) => void;
};

const TeamContext = createContext<TeamContextValue>({
  role: 'proprietaire',
  isPreviewMode: false,
  canCreate: true,
  canEdit: true,
  canManageTeam: true,
  setPreviewRole: () => {},
});

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [previewRole, setPreviewRoleState] = useState<TeamRole | null>(() => getStoredRole());

  const setPreviewRole = useCallback((role: TeamRole | null) => {
    if (role) {
      sessionStorage.setItem(PREVIEW_ROLE_KEY, role);
      setPreviewRoleState(role);
    } else {
      sessionStorage.removeItem(PREVIEW_ROLE_KEY);
      setPreviewRoleState(null);
    }
  }, []);

  // Sync with other tabs / updates
  useEffect(() => {
    const stored = getStoredRole();
    if (stored !== previewRole) setPreviewRoleState(stored);
  }, []);

  const role: TeamRole = previewRole ?? 'proprietaire';
  const isPreviewMode = previewRole !== null;
  const canCreate = role === 'proprietaire' || role === 'editeur';
  const canEdit = role === 'proprietaire' || role === 'editeur';
  const canManageTeam = role === 'proprietaire';

  return (
    <TeamContext.Provider
      value={{
        role,
        isPreviewMode,
        canCreate,
        canEdit,
        canManageTeam,
        setPreviewRole,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error('useTeam must be used within TeamProvider');
  return ctx;
}
