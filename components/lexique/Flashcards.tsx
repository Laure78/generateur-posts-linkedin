'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Shuffle } from 'lucide-react';
import { FAMILLES, LEXIQUE, melanger, type Famille, type TermeLexique } from '@/data/lexique-btp';
import { lireFavoris } from '@/lib/lexique-favoris';

type Source = 'toutes' | 'favoris' | Famille;

function preparerPaquet(source: Source, favoris: string[]): TermeLexique[] {
  let pool = [...LEXIQUE];
  if (source === 'favoris') {
    pool = pool.filter((t) => favoris.includes(t.id));
  } else if (source !== 'toutes') {
    pool = pool.filter((t) => t.famille === source);
  }
  return melanger(pool);
}

function chipClass(actif: boolean) {
  return actif
    ? 'bg-[var(--bework-blue)] text-white'
    : 'bg-white text-slate-600 border border-slate-200';
}

export function Flashcards() {
  const [source, setSource] = useState<Source>('toutes');
  const [favoris, setFavoris] = useState<string[]>([]);
  const [paquet, setPaquet] = useState<TermeLexique[]>([]);
  const [aRevoir, setARevoir] = useState<TermeLexique[]>([]);
  const [index, setIndex] = useState(0);
  const [retourne, setRetourne] = useState(false);
  const [termine, setTermine] = useState(false);
  const [stats, setStats] = useState({ total: 0, revoir: 0 });

  useEffect(() => {
    setFavoris(lireFavoris());
  }, []);

  const demarrer = useCallback(() => {
    setPaquet(preparerPaquet(source, favoris));
    setARevoir([]);
    setIndex(0);
    setRetourne(false);
    setTermine(false);
    setStats({ total: 0, revoir: 0 });
  }, [source, favoris]);

  useEffect(() => {
    demarrer();
  }, [demarrer]);

  const carte = paquet[index];
  const total = paquet.length;
  const progression = total > 0 ? index + 1 : 0;

  const melangerPaquet = () => {
    setPaquet((p) => melanger(p));
    setIndex(0);
    setRetourne(false);
  };

  const repondre = (connu: boolean) => {
    if (!carte) return;
    const nouveauRevoir = connu ? aRevoir : [...aRevoir, carte];
    setARevoir(nouveauRevoir);
    setStats((s) => ({ total: s.total + 1, revoir: connu ? s.revoir : s.revoir + 1 }));
    setRetourne(false);

    if (index + 1 < paquet.length) {
      setIndex((i) => i + 1);
      return;
    }
    if (nouveauRevoir.length > 0) {
      setPaquet(nouveauRevoir);
      setARevoir([]);
      setIndex(0);
      return;
    }
    setTermine(true);
  };

  const famillesDisponibles = useMemo(() => FAMILLES, []);

  if (source === 'favoris' && favoris.length === 0) {
    return (
      <div className="space-y-4">
        <p className="bework-card px-4 py-8 text-center text-slate-500">
          Pas encore de favoris. Ajoutez des étoiles dans l&apos;onglet Lexique.
        </p>
        <button type="button" onClick={() => setSource('toutes')} className="bework-btn-primary w-full">
          Réviser toutes les familles
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bework-card space-y-3 p-4">
        <p className="text-sm font-medium text-slate-500">Réviser</p>
        <div className="flex flex-wrap gap-2">
          {(['toutes', 'favoris'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSource(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${chipClass(source === s)}`}
            >
              {s === 'toutes' ? 'Toutes' : 'Mes favoris'}
            </button>
          ))}
        </div>
        <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
          {famillesDisponibles.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSource(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${chipClass(source === f)}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {termine ? (
        <div className="bework-card px-6 py-10 text-center">
          <p className="font-display text-lg font-bold text-[var(--bework-navy)]">Paquet terminé !</p>
          <p className="mt-2 text-slate-500">
            {stats.total} carte{stats.total !== 1 ? 's' : ''} révisée{stats.total !== 1 ? 's' : ''}
            {stats.revoir > 0 ? `, ${stats.revoir} à revoir` : ''}.
          </p>
          <button type="button" onClick={demarrer} className="bework-btn-primary mt-6">
            Recommencer
          </button>
        </div>
      ) : total === 0 ? (
        <p className="bework-card px-4 py-8 text-center text-slate-500">Aucune carte pour cette sélection.</p>
      ) : (
        <>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Carte {progression} / {total}</span>
            <button
              type="button"
              onClick={melangerPaquet}
              aria-label="Mélanger les cartes"
              className="bework-btn-ghost flex items-center gap-1.5 text-sm"
            >
              <Shuffle className="h-4 w-4" aria-hidden />
              Mélanger
            </button>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[var(--bework-blue)] transition-all duration-300"
              style={{ width: `${(progression / total) * 100}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => setRetourne((r) => !r)}
            aria-label={retourne ? 'Voir le terme' : 'Voir la définition'}
            className="relative mx-auto block min-h-[220px] w-full max-w-md perspective-[1000px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bework-blue)]"
          >
            <div
              className={`relative min-h-[220px] w-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none ${
                retourne ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[var(--bework-blue-bright)] to-[var(--bework-blue)] p-6 text-center text-white shadow-lg [backface-visibility:hidden]">
                <p className="bework-kicker text-white/80">Terme</p>
                <p className="font-display mt-2 text-2xl font-bold">{carte?.terme}</p>
                {carte?.sigle && <p className="mt-2 text-sm opacity-90">{carte.sigle}</p>}
                <p className="mt-4 text-xs opacity-70">Cliquez pour retourner</p>
              </div>
              <div className="bework-card absolute inset-0 flex flex-col items-center justify-center p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="bework-kicker">Définition</p>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{carte?.definition}</p>
              </div>
            </div>
          </button>

          {retourne && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => repondre(true)}
                className="flex-1 rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Je savais ✅
              </button>
              <button
                type="button"
                onClick={() => repondre(false)}
                className="flex-1 rounded-xl bg-amber-500 py-3.5 text-sm font-semibold text-white hover:bg-amber-600"
              >
                À revoir 🔄
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
