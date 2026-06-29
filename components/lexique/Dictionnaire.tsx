'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Search, Star } from 'lucide-react';
import {
  FAMILLES,
  LEXIQUE,
  filtrerTermes,
  type Famille,
  type TermeLexique,
} from '@/data/lexique-btp';
import { basculerFavori, lireFavoris } from '@/lib/lexique-favoris';

function chipClass(actif: boolean) {
  return actif
    ? 'bg-[var(--bework-blue)] text-white'
    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50';
}

function FicheTerme({
  terme,
  ouvert,
  favori,
  onToggle,
  onFavori,
}: {
  terme: TermeLexique;
  ouvert: boolean;
  favori: boolean;
  onToggle: () => void;
  onFavori: () => void;
}) {
  const panelId = `fiche-${terme.id}`;

  return (
    <article className="bework-card overflow-hidden">
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={ouvert}
          aria-controls={panelId}
          className="flex min-h-[52px] flex-1 items-center gap-3 px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bework-blue)]"
        >
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[var(--bework-blue)] transition-transform ${ouvert ? 'rotate-180' : ''}`}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[var(--bework-navy)]">{terme.terme}</p>
            {terme.sigle && <p className="truncate text-sm text-slate-500">{terme.sigle}</p>}
          </div>
          <span className="hidden shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500 sm:inline">
            {terme.famille}
          </span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFavori();
          }}
          aria-label={favori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="flex w-12 shrink-0 items-center justify-center border-l border-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bework-blue)]"
        >
          <Star
            className={`h-5 w-5 ${favori ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`}
            aria-hidden
          />
        </button>
      </div>

      {ouvert && (
        <div id={panelId} className="border-t border-slate-100 px-4 py-4">
          <span className="mb-3 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500 sm:hidden">
            {terme.famille}
          </span>
          <p className="leading-relaxed text-slate-700">{terme.definition}</p>
          {terme.aQuoiCaSert && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-medium text-[var(--bework-navy)]">À quoi ça sert : </span>
              {terme.aQuoiCaSert}
            </p>
          )}
          {terme.exemple && (
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium text-[var(--bework-navy)]">Exemple : </span>
              {terme.exemple}
            </p>
          )}
          {terme.vigilance && (
            <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              <span className="font-semibold">Vigilance : </span>
              {terme.vigilance}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

export function Dictionnaire() {
  const [recherche, setRecherche] = useState('');
  const [famillesSelection, setFamillesSelection] = useState<Famille[]>([]);
  const [ouvertId, setOuvertId] = useState<string | null>(null);
  const [favoris, setFavoris] = useState<string[]>([]);

  useEffect(() => {
    setFavoris(lireFavoris());
  }, []);

  const famillesActives = famillesSelection.length > 0 ? famillesSelection : null;

  const termesFiltres = useMemo(
    () => filtrerTermes(LEXIQUE, recherche, famillesActives),
    [recherche, famillesActives],
  );

  const toggleFamille = (famille: Famille | 'toutes') => {
    if (famille === 'toutes') {
      setFamillesSelection([]);
      return;
    }
    setFamillesSelection((prev) =>
      prev.includes(famille) ? prev.filter((f) => f !== famille) : [...prev, famille],
    );
  };

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un terme, sigle ou définition…"
          aria-label="Rechercher dans le lexique"
          className="bework-input py-3.5 pl-12"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-500">Filtrer par famille</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => toggleFamille('toutes')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bework-blue)] ${chipClass(famillesSelection.length === 0)}`}
          >
            Toutes
          </button>
          {FAMILLES.map((famille) => (
            <button
              key={famille}
              type="button"
              onClick={() => toggleFamille(famille)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bework-blue)] ${chipClass(famillesSelection.includes(famille))}`}
            >
              {famille}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500">
        {termesFiltres.length} terme{termesFiltres.length !== 1 ? 's' : ''} affiché
        {termesFiltres.length > 1 ? 's' : ''}
      </p>

      {termesFiltres.length === 0 ? (
        <p className="bework-card px-4 py-8 text-center text-slate-500">
          Aucun terme trouvé. Essayez un autre mot-clé ou retirez un filtre.
        </p>
      ) : (
        <ul className="space-y-3" role="list">
          {termesFiltres.map((terme) => (
            <li key={terme.id}>
              <FicheTerme
                terme={terme}
                ouvert={ouvertId === terme.id}
                favori={favoris.includes(terme.id)}
                onToggle={() => setOuvertId((id) => (id === terme.id ? null : terme.id))}
                onFavori={() => setFavoris(basculerFavori(terme.id, favoris))}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
