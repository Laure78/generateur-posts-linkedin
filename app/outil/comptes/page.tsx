'use client';

import { useState, useEffect } from 'react';
import { useTeam } from '@/lib/TeamContext';

type Role = 'proprietaire' | 'editeur' | 'lecteur';

type Account = {
  id: string;
  name: string;
  email: string;
  isCurrent?: boolean;
};

type Member = {
  id: string;
  email: string;
  role: Role;
  status: 'actif' | 'en_attente';
  invitedAt: string;
};

const ROLE_LABELS: Record<Role, string> = {
  proprietaire: 'Propriétaire',
  editeur: 'Éditeur',
  lecteur: 'Lecteur',
};

const STORAGE_ACCOUNTS = 'createur_accounts';
const STORAGE_CURRENT = 'createur_current_account';
const STORAGE_MEMBERS = 'createur_shared_members';

const DEFAULT_ACCOUNTS: Account[] = [
  { id: '1', name: 'Laure Olivié', email: 'laureolivie@yahoo.fr', isCurrent: true },
  { id: '2', name: 'OFC Création', email: 'contact@ofc-creation.fr', isCurrent: false },
];

const DEFAULT_MEMBERS: Member[] = [
  { id: 'm1', email: 'assistant@example.com', role: 'editeur', status: 'actif', invitedAt: '2025-01-15' },
  { id: 'm2', email: 'collegue@example.com', role: 'lecteur', status: 'en_attente', invitedAt: '2025-01-20' },
];

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // ignore
  }
  return fallback;
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export default function ComptesPage() {
  const { role, isPreviewMode, canManageTeam, setPreviewRole } = useTeam();
  const [accounts, setAccounts] = useState<Account[]>(() =>
    loadFromStorage(STORAGE_ACCOUNTS, DEFAULT_ACCOUNTS)
  );
  const [currentId, setCurrentId] = useState<string>(() => {
    if (typeof window === 'undefined') return '1';
    return localStorage.getItem(STORAGE_CURRENT) || '1';
  });
  const [members, setMembers] = useState<Member[]>(() =>
    loadFromStorage(STORAGE_MEMBERS, DEFAULT_MEMBERS)
  );
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('editeur');
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountEmail, setNewAccountEmail] = useState('');

  useEffect(() => {
    saveToStorage(STORAGE_ACCOUNTS, accounts);
  }, [accounts]);

  useEffect(() => {
    saveToStorage(STORAGE_CURRENT, currentId);
  }, [currentId]);

  useEffect(() => {
    saveToStorage(STORAGE_MEMBERS, members);
  }, [members]);

  const currentAccount = accounts.find((a) => a.id === currentId) || accounts[0];

  const switchAccount = (id: string) => {
    setCurrentId(id);
    setAccounts((prev) =>
      prev.map((a) => ({ ...a, isCurrent: a.id === id }))
    );
  };

  const addAccount = () => {
    if (!newAccountName.trim() || !newAccountEmail.trim()) return;
    const id = crypto.randomUUID();
    setAccounts((prev) => [
      ...prev.map((a) => ({ ...a, isCurrent: false })),
      { id, name: newAccountName.trim(), email: newAccountEmail.trim(), isCurrent: false },
    ]);
    setNewAccountName('');
    setNewAccountEmail('');
  };

  const removeAccount = (id: string) => {
    if (id === currentId && accounts.length > 1) {
      const other = accounts.find((a) => a.id !== id);
      if (other) switchAccount(other.id);
    }
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const inviteMember = () => {
    if (!inviteEmail.trim()) return;
    const exists = members.some((m) => m.email.toLowerCase() === inviteEmail.trim().toLowerCase());
    if (exists) return;
    setMembers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        email: inviteEmail.trim(),
        role: inviteRole,
        status: 'en_attente',
        invitedAt: new Date().toISOString().slice(0, 10),
      },
    ]);
    setInviteEmail('');
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMemberRole = (id: string, role: Role) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Comptes & partage</h1>
        <p className="mt-1 text-neutral-600">
          Gère tes comptes et partage l&apos;accès à l&apos;outil avec ton équipe.
        </p>
        {members.length > 0 && (
          <span className="mt-2 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
            ✓ Travail en équipe activé — {members.length} collaborateur{members.length > 1 ? 's' : ''}
          </span>
        )}
        {isPreviewMode && (
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <span className="text-sm font-medium text-amber-800">
              Mode test : tu simules le rôle &quot;{role === 'lecteur' ? 'Lecteur' : 'Éditeur'}&quot;
            </span>
            <button
              type="button"
              onClick={() => setPreviewRole(null)}
              className="rounded-lg bg-amber-200 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-300"
            >
              Revenir en Propriétaire
            </button>
          </div>
        )}
        {!isPreviewMode && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500">Tester en tant que :</span>
            <button
              type="button"
              onClick={() => setPreviewRole('editeur')}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Éditeur
            </button>
            <button
              type="button"
              onClick={() => setPreviewRole('lecteur')}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Lecteur (lecture seule)
            </button>
          </div>
        )}
      </div>

      {/* Multi-comptes */}
      <section className="mb-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-neutral-800">Multi-comptes</h2>
        <p className="mb-4 text-sm text-neutral-600">
          Bascule entre plusieurs comptes (perso, entreprise, client…) pour organiser tes contenus.
        </p>

        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-neutral-500">Compte actif</p>
          <div className="flex flex-wrap gap-2">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => switchAccount(acc.id)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                  acc.id === currentId
                    ? 'border-[#377CF3] bg-[#377CF3]/5 text-[#377CF3]'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#377CF3]/10 text-[#377CF3] text-xs font-bold">
                  {acc.name.slice(0, 2).toUpperCase()}
                </span>
                {acc.name}
                {acc.id === currentId && <span className="text-[#377CF3]">✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="mb-3 text-sm font-medium text-neutral-700">Ajouter un compte</p>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder="Nom du compte"
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
            <input
              type="email"
              value={newAccountEmail}
              onChange={(e) => setNewAccountEmail(e.target.value)}
              placeholder="Email"
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={addAccount}
              disabled={!newAccountName.trim() || !newAccountEmail.trim()}
              className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d6ad4] disabled:opacity-50"
            >
              Ajouter
            </button>
          </div>
        </div>
      </section>

      {/* Partage d'accès */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-neutral-800">Partage d&apos;accès</h2>
        <p className="mb-4 text-sm text-neutral-600">
          Invite des collaborateurs à accéder à l&apos;outil. Choisis leur niveau d&apos;accès.
        </p>

        <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="mb-3 text-sm font-medium text-neutral-700">Inviter par email</p>
          <div className="flex flex-wrap gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="email@exemple.com"
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as Role)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            >
              <option value="editeur">Éditeur</option>
              <option value="lecteur">Lecteur</option>
            </select>
            <button
              type="button"
              onClick={inviteMember}
              disabled={!inviteEmail.trim()}
              className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d6ad4] disabled:opacity-50"
            >
              Envoyer l&apos;invitation
            </button>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            Éditeur : peut créer et modifier des posts. Lecteur : consultation uniquement.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-neutral-700">Personnes ayant accès</p>
          <div className="space-y-2">
            <div className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
              <span className="font-medium text-neutral-800">{currentAccount?.email}</span>
              <span className="rounded-full bg-[#377CF3]/10 px-2 py-0.5 text-xs font-medium text-[#377CF3]">
                Propriétaire
              </span>
            </div>
            {members.map((m) => (
              <div
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-neutral-800">{m.email}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      m.status === 'actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {m.status === 'actif' ? 'Actif' : 'En attente'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={m.role}
                    onChange={(e) => updateMemberRole(m.id, e.target.value as Role)}
                    className="rounded-lg border border-neutral-200 px-2 py-1 text-xs"
                  >
                    <option value="editeur">Éditeur</option>
                    <option value="lecteur">Lecteur</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMember(m.id)}
                    className="rounded-lg px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                  >
                    Révoquer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          Le partage est actif : invite des collaborateurs, attribue un rôle (Éditeur ou Lecteur)
          et gère les accès depuis cette page. Pour envoyer de vraies invitations par email, connecte Supabase Auth.
        </p>
      </section>
    </div>
  );
}
