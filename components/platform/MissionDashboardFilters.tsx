'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { MISSION_TYPES } from '@/lib/bework/config';

const STATUSES = [
  { id: '', label: 'Tous statuts' },
  { id: 'en_attente_validation', label: 'À valider' },
  { id: 'terminee', label: 'Terminées' },
  { id: 'en_cours', label: 'En cours' },
  { id: 'recue', label: 'Reçues' },
];

type MissionDashboardFiltersProps = {
  basePath: string;
  initialStatus?: string;
  initialType?: string;
  initialQ?: string;
};

export function MissionDashboardFilters({
  basePath,
  initialStatus,
  initialType,
  initialQ,
}: MissionDashboardFiltersProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus ?? '');
  const [type, setType] = useState(initialType ?? '');
  const [q, setQ] = useState(initialQ ?? '');

  const apply = () => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (type) params.set('type', type);
    if (q.trim()) params.set('q', q.trim());
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  return (
    <form
      className="mt-4 flex flex-wrap items-end gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        apply();
      }}
    >
      <div>
        <label htmlFor="filter-status" className="block text-xs font-medium text-slate-500">
          Statut
        </label>
        <select
          id="filter-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bework-input mt-1 min-w-[10rem] text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-type" className="block text-xs font-medium text-slate-500">
          Type
        </label>
        <select
          id="filter-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bework-input mt-1 min-w-[12rem] text-sm"
        >
          <option value="">Tous types</option>
          {MISSION_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-[12rem] flex-1">
        <label htmlFor="filter-q" className="block text-xs font-medium text-slate-500">
          Recherche
        </label>
        <input
          id="filter-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Titre, chantier, brief…"
          className="bework-input mt-1 w-full text-sm"
        />
      </div>
      <button type="submit" className="bework-btn-primary inline-flex text-sm">
        <Search size={16} />
        Filtrer
      </button>
    </form>
  );
}
