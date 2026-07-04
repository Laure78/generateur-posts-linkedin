'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BookOpen, Brain, GraduationCap, RotateCcw } from 'lucide-react';
import { BeWorkLogo } from '@/components/brand/BeWorkLogo';
import { BEWORK } from '@/lib/bework/config';
import { Dictionnaire } from './Dictionnaire';
import { Flashcards } from './Flashcards';
import { Quiz, type QuizLotInitial } from './Quiz';
import { ParcoursApprentissage } from './ParcoursApprentissage';

type Mode = 'parcours' | 'dictionnaire' | 'flashcards' | 'quiz';

const ONGLETS: { id: Mode; label: string; icon: typeof BookOpen }[] = [
  { id: 'parcours', label: 'Parcours', icon: GraduationCap },
  { id: 'dictionnaire', label: 'Lexique', icon: BookOpen },
  { id: 'flashcards', label: 'Flashcards', icon: RotateCcw },
  { id: 'quiz', label: 'Quiz', icon: Brain },
];

function parseMode(value: string | null): Mode {
  if (value && ONGLETS.some((o) => o.id === value)) return value as Mode;
  return 'parcours';
}

function parseLot(value: string | null): QuizLotInitial | null {
  const lots: QuizLotInitial[] = ['go', 'enduits', 'charpente', 'menuiseries', 'perf'];
  if (value && lots.includes(value as QuizLotInitial)) return value as QuizLotInitial;
  return null;
}

function LexiqueAppInner() {
  const searchParams = useSearchParams();
  const parcoursInitial = searchParams.get('parcours');
  const lotInitial = parseLot(searchParams.get('lot'));
  const [mode, setMode] = useState<Mode>(() => parseMode(searchParams.get('mode')));

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam) setMode(parseMode(modeParam));
  }, [searchParams]);

  return (
    <div className="bework-blueprint-bg min-h-screen text-slate-800">
      <header className="border-b border-slate-200/80 bg-white/90 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
            <BeWorkLogo variant="header" href="/plateforme" className="shrink-0" />
            <Link href="/plateforme" className="bework-btn-ghost text-sm">
              ← Plateforme
            </Link>
          </div>
          <div className="mt-6 text-center sm:text-left">
            <p className="bework-kicker">Ressources pédagogiques</p>
            <h1 className="font-display mt-1 text-2xl font-bold text-bework-navy sm:text-3xl">
              Lexique &amp; apprentissage BTP
            </h1>
            <p className="mt-2 max-w-xl text-base text-slate-500">
              Comprendre le vocabulaire des marchés publics et du chantier — explications simples,
              schémas, parcours{' '}
              <strong className="font-medium text-slate-700">Gros œuvre</strong>,{' '}
              <strong className="font-medium text-slate-700">Enduits</strong>,{' '}
              <strong className="font-medium text-slate-700">Charpente</strong>,{' '}
              <strong className="font-medium text-slate-700">Menuiseries</strong> et{' '}
              <strong className="font-medium text-slate-700">Performance énergétique</strong>, quiz
              thématiques.
            </p>
          </div>
        </div>
      </header>

      <nav
        className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6"
        aria-label="Modes d'apprentissage"
      >
        <div className="mx-auto flex max-w-3xl gap-1.5 overflow-x-auto sm:gap-2">
          {ONGLETS.map(({ id, label, icon: Icon }) => {
            const actif = mode === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                aria-current={actif ? 'page' : undefined}
                className={`flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bework-blue sm:flex-1 sm:gap-2 ${
                  actif ? 'bework-btn-primary shadow-none' : 'bework-btn-ghost bg-slate-100/80'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {mode === 'parcours' && (
          <ParcoursApprentissage initialParcoursId={parcoursInitial} />
        )}
        {mode === 'dictionnaire' && <Dictionnaire />}
        {mode === 'flashcards' && <Flashcards />}
        {mode === 'quiz' && <Quiz lotInitial={lotInitial} />}
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-500 sm:text-sm">
        {BEWORK.name} · Assistants travaux augmentés par l&apos;IA ·{' '}
        <a
          href={BEWORK.url}
          className="font-medium text-bework-blue hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          bework.fr
        </a>
      </footer>
    </div>
  );
}

export function LexiqueApp() {
  return (
    <Suspense
      fallback={
        <div className="bework-blueprint-bg flex min-h-screen items-center justify-center text-slate-500">
          Chargement…
        </div>
      }
    >
      <LexiqueAppInner />
    </Suspense>
  );
}
