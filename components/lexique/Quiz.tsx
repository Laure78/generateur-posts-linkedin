'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { HardHat, Home, DoorOpen, Lightbulb, Paintbrush, Gauge, RotateCcw, Shuffle } from 'lucide-react';
import type { Famille } from '@/data/lexique-btp';
import { QuizGrosOeuvreSpecial } from '@/components/lexique/QuizGrosOeuvreSpecial';
import { QuizEnduitsFacadeSpecial } from '@/components/lexique/QuizEnduitsFacadeSpecial';
import { QuizPerfEnergetiqueSpecial } from '@/components/lexique/QuizPerfEnergetiqueSpecial';
import { QuizMenuiseriesSpecial } from '@/components/lexique/QuizMenuiseriesSpecial';
import { QuizCharpenteCouvertureSpecial } from '@/components/lexique/QuizCharpenteCouvertureSpecial';
import {
  FAMILLES,
  QUIZ_FAMILLE_AIDE,
  QUIZ_PRESETS_DEBUTANT,
  QUIZ_PRESET_NON_SOUMIS_TOUTES_ID,
  QUIZ_NB_QUESTIONS_CIBLE,
  genererQuestionsQuiz,
  libelleSelectionQuiz,
  poolQuiz,
  poolQuizNonSoumis,
  poolRestantQuiz,
  type QuestionQuiz,
} from '@/data/quiz-btp';
import {
  lireTermesSoumisQuiz,
  marquerTermeSoumisQuiz,
  reinitialiserTermesSoumisQuiz,
} from '@/lib/lexique-quiz-progress';

function messageEncouragement(score: number, total: number): string {
  const ratio = score / total;
  if (ratio >= 0.9) return 'Excellent, vous maîtrisez cette catégorie !';
  if (ratio >= 0.7) return 'Très bien — refaites une série pour ancrer les derniers termes.';
  if (ratio >= 0.5) return 'Bon début : relisez les explications puis retentez la même catégorie.';
  return 'Pas de panique : ouvrez le parcours guidé ou les flashcards sur cette thématique.';
}

function ExplicationBonneReponse({
  terme,
  correct,
}: {
  terme: QuestionQuiz['terme'];
  correct: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-4 sm:px-5 ${
        correct
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-bework-blue/30 bg-bework-blue-soft/50'
      }`}
    >
      <p
        className={`text-sm font-semibold ${correct ? 'text-emerald-800' : 'text-bework-blue'}`}
      >
        {correct ? '✓ Bonne réponse — pour mémoire :' : 'Explication de la bonne réponse :'}
      </p>
      <p className="font-display mt-2 text-base font-bold text-bework-navy">
        {terme.terme}
        {terme.sigle ? (
          <span className="ml-2 text-sm font-normal text-slate-500">({terme.sigle})</span>
        ) : null}
      </p>
      <span className="mt-2 inline-block rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-slate-500">
        {terme.famille}
      </span>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{terme.definition}</p>
      {terme.aQuoiCaSert && (
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-medium text-bework-navy">À quoi ça sert : </span>
          {terme.aQuoiCaSert}
        </p>
      )}
      {terme.exemple && (
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-medium text-bework-navy">Exemple : </span>
          {terme.exemple}
        </p>
      )}
      {terme.vigilance && (
        <p className="mt-2 rounded-lg bg-white/80 px-3 py-2 text-sm text-amber-900">
          <span className="font-semibold">Vigilance : </span>
          {terme.vigilance}
        </p>
      )}
    </div>
  );
}

function chipClass(actif: boolean) {
  return actif
    ? 'bg-bework-blue text-white'
    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50';
}

type Phase = 'config' | 'jeu' | 'resultat';

export function Quiz() {
  const [modeSpecialGo, setModeSpecialGo] = useState(false);
  const [modeSpecialEnduits, setModeSpecialEnduits] = useState(false);
  const [modeSpecialPerf, setModeSpecialPerf] = useState(false);
  const [modeSpecialMenuiseries, setModeSpecialMenuiseries] = useState(false);
  const [modeSpecialCharpente, setModeSpecialCharpente] = useState(false);
  const [phase, setPhase] = useState<Phase>('config');
  const [famillesSelection, setFamillesSelection] = useState<Famille[]>([]);
  const [presetActif, setPresetActif] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionQuiz[]>([]);
  const [index, setIndex] = useState(0);
  const [choix, setChoix] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [indiceVisible, setIndiceVisible] = useState(false);
  const [termesVusSession, setTermesVusSession] = useState<Set<string>>(() => new Set());
  const [famillesVuesSession, setFamillesVuesSession] = useState<Set<Famille>>(() => new Set());
  const [termesSoumis, setTermesSoumis] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setTermesSoumis(lireTermesSoumisQuiz());
  }, []);

  const famillesActives = famillesSelection.length > 0 ? famillesSelection : null;
  const pool = useMemo(() => poolQuiz(famillesActives), [famillesActives]);
  const poolNonSoumisToutes = useMemo(
    () => poolQuizNonSoumis(null, termesSoumis),
    [termesSoumis],
  );
  const exclusEffectifs = useMemo(
    () => new Set([...termesSoumis, ...termesVusSession]),
    [termesSoumis, termesVusSession],
  );
  const poolRestant = useMemo(
    () => poolRestantQuiz(pool, exclusEffectifs),
    [pool, exclusEffectifs],
  );
  const poolInsuffisant = poolRestant.length < 4;
  const sessionEpuisee = pool.length >= 4 && poolRestant.length < 4;
  const nbQuestionsSerie = Math.min(QUIZ_NB_QUESTIONS_CIBLE, poolRestant.length);

  const aidesFamilles = useMemo(() => {
    if (famillesActives?.length === 1) {
      return [QUIZ_FAMILLE_AIDE[famillesActives[0]]];
    }
    if (presetActif) {
      const preset = QUIZ_PRESETS_DEBUTANT.find((p) => p.id === presetActif);
      return preset?.familles.map((f) => QUIZ_FAMILLE_AIDE[f]) ?? [];
    }
    return [];
  }, [famillesActives, presetActif]);

  const optionsGeneration = useMemo(
    () => ({
      exclus: exclusEffectifs,
      famillesCouvertes: famillesVuesSession,
    }),
    [exclusEffectifs, famillesVuesSession],
  );

  const demarrerSerie = useCallback(
    (serie: QuestionQuiz[]) => {
      if (serie.length === 0) return;
      setTermesVusSession((prev) => {
        const next = new Set(prev);
        for (const q of serie) next.add(q.terme.id);
        return next;
      });
      setFamillesVuesSession((prev) => {
        const next = new Set(prev);
        for (const q of serie) next.add(q.terme.famille);
        return next;
      });
      setQuestions(serie);
      setIndex(0);
      setChoix(null);
      setScore(0);
      setIndiceVisible(false);
      setPhase('jeu');
    },
    [],
  );

  const demarrer = useCallback(() => {
    const serie = genererQuestionsQuiz(pool, QUIZ_NB_QUESTIONS_CIBLE, optionsGeneration);
    demarrerSerie(serie);
  }, [pool, optionsGeneration, demarrerSerie]);

  const demarrerNonSoumisToutesRubriques = useCallback(() => {
    setPresetActif(QUIZ_PRESET_NON_SOUMIS_TOUTES_ID);
    setFamillesSelection([]);
    const serie = genererQuestionsQuiz(
      poolQuizNonSoumis(null, termesSoumis),
      QUIZ_NB_QUESTIONS_CIBLE,
      {
        exclus: termesVusSession,
        famillesCouvertes: famillesVuesSession,
      },
    );
    demarrerSerie(serie);
  }, [termesSoumis, termesVusSession, famillesVuesSession, demarrerSerie]);

  const nouvelleSession = useCallback(() => {
    setTermesVusSession(new Set());
    setFamillesVuesSession(new Set());
  }, []);

  const reinitialiserProgression = useCallback(() => {
    reinitialiserTermesSoumisQuiz();
    setTermesSoumis(new Set());
    setTermesVusSession(new Set());
    setFamillesVuesSession(new Set());
  }, []);

  const retourConfig = useCallback(() => {
    setPhase('config');
    setQuestions([]);
    setIndex(0);
    setChoix(null);
    setScore(0);
    setIndiceVisible(false);
  }, []);

  const recommencer = useCallback(() => {
    demarrer();
  }, [demarrer]);

  const toggleFamille = (famille: Famille | 'toutes') => {
    setPresetActif(null);
    if (famille === 'toutes') {
      setFamillesSelection([]);
      return;
    }
    setFamillesSelection((prev) =>
      prev.includes(famille) ? prev.filter((f) => f !== famille) : [...prev, famille],
    );
  };

  const appliquerPreset = (id: string) => {
    const preset = QUIZ_PRESETS_DEBUTANT.find((p) => p.id === id);
    if (!preset) return;
    setPresetActif(id);
    setFamillesSelection(preset.toutesRubriques ? [] : preset.familles);
  };

  const question = questions[index];
  const total = questions.length;

  const valider = (optionId: string) => {
    if (choix !== null || !question) return;
    setChoix(optionId);
    if (optionId === question.bonneReponse) setScore((s) => s + 1);
    setTermesSoumis(marquerTermeSoumisQuiz(question.terme.id));
    setTermesVusSession((prev) => new Set(prev).add(question.terme.id));
  };

  const suivant = () => {
    if (index + 1 >= total) {
      setPhase('resultat');
      return;
    }
    setIndex((i) => i + 1);
    setChoix(null);
    setIndiceVisible(false);
  };

  const progression = useMemo(
    () => (total > 0 ? ((index + (choix ? 1 : 0)) / total) * 100 : 0),
    [index, choix, total],
  );

  // ── Quiz spécial Gros œuvre ──
  if (modeSpecialGo) {
    return <QuizGrosOeuvreSpecial onRetour={() => setModeSpecialGo(false)} />;
  }

  // ── Quiz spécial Enduits façade ──
  if (modeSpecialEnduits) {
    return <QuizEnduitsFacadeSpecial onRetour={() => setModeSpecialEnduits(false)} />;
  }

  if (modeSpecialPerf) {
    return <QuizPerfEnergetiqueSpecial onRetour={() => setModeSpecialPerf(false)} />;
  }

  if (modeSpecialMenuiseries) {
    return <QuizMenuiseriesSpecial onRetour={() => setModeSpecialMenuiseries(false)} />;
  }

  if (modeSpecialCharpente) {
    return <QuizCharpenteCouvertureSpecial onRetour={() => setModeSpecialCharpente(false)} />;
  }

  // ── Configuration ──
  if (phase === 'config') {
    return (
      <div className="space-y-5">
        <div className="bework-card overflow-hidden border-2 border-amber-300/50 p-0">
          <div className="flex flex-col gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-800">
                <HardHat className="h-4 w-4" aria-hidden />
                Lot 01
              </p>
              <p className="font-display mt-1 text-lg font-bold text-bework-navy">
                Quiz Gros œuvre — 7 thèmes
              </p>
              <p className="mt-1 text-sm text-slate-600">
                75 questions terrain : fondations, terrassement, béton, structure, réseaux, marché + parcours complet.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModeSpecialGo(true)}
              className="bework-btn-primary shrink-0 bg-amber-600 hover:bg-amber-700"
            >
              <HardHat className="h-4 w-4" aria-hidden />
              Lancer
            </button>
          </div>
        </div>

        <div className="bework-card overflow-hidden border-2 border-sky-300/50 p-0">
          <div className="flex flex-col gap-4 bg-gradient-to-r from-sky-50 to-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-sky-800">
                <Paintbrush className="h-4 w-4" aria-hidden />
                Lot 02
              </p>
              <p className="font-display mt-1 text-lg font-bold text-bework-navy">
                Quiz Enduits de façade — 7 thèmes
              </p>
              <p className="mt-1 text-sm text-slate-600">
                75 questions : monocouche, supports RT/OC, application, points singuliers, modénatures, échafaudages + parcours complet.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModeSpecialEnduits(true)}
              className="bework-btn-primary shrink-0 bg-sky-600 hover:bg-sky-700"
            >
              <Paintbrush className="h-4 w-4" aria-hidden />
              Lancer
            </button>
          </div>
        </div>

        <div className="bework-card overflow-hidden border-2 border-emerald-300/50 p-0">
          <div className="flex flex-col gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-800">
                <Gauge className="h-4 w-4" aria-hidden />
                Famille 22
              </p>
              <p className="font-display mt-1 text-lg font-bold text-bework-navy">
                Quiz Performance énergétique — 4 thèmes
              </p>
              <p className="mt-1 text-sm text-slate-600">
                42 questions : Q4Pa-surf, infiltrométrie, schémas fluides, lot MEP, réservations + parcours complet.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModeSpecialPerf(true)}
              className="bework-btn-primary shrink-0 bg-emerald-600 hover:bg-emerald-700"
            >
              <Gauge className="h-4 w-4" aria-hidden />
              Lancer
            </button>
          </div>
        </div>

        <div className="bework-card overflow-hidden border-2 border-orange-300/50 p-0">
          <div className="flex flex-col gap-4 bg-gradient-to-r from-orange-50 to-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-orange-900">
                <Home className="h-4 w-4" aria-hidden />
                Lot 03
              </p>
              <p className="font-display mt-1 text-lg font-bold text-bework-navy">
                Quiz Charpente & couverture — 4 thèmes
              </p>
              <p className="mt-1 text-sm text-slate-600">
                42 questions : fermettes, tuiles Canal S, zinguerie, EP, désenfumage et sécurité toiture.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModeSpecialCharpente(true)}
              className="bework-btn-primary shrink-0 bg-orange-600 hover:bg-orange-700"
            >
              <Home className="h-4 w-4" aria-hidden />
              Lancer
            </button>
          </div>
        </div>

        <div className="bework-card overflow-hidden border-2 border-green-300/50 p-0">
          <div className="flex flex-col gap-4 bg-gradient-to-r from-green-50 to-indigo-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-green-800">
                <DoorOpen className="h-4 w-4" aria-hidden />
                Lot 04
              </p>
              <p className="font-display mt-1 text-lg font-bold text-bework-navy">
                Quiz Menuiseries extérieures — 4 thèmes
              </p>
              <p className="mt-1 text-sm text-slate-600">
                42 questions : pose, fenêtres PVC, portes collectives, volets et étanchéité à l&apos;air.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModeSpecialMenuiseries(true)}
              className="bework-btn-primary shrink-0 bg-green-600 hover:bg-green-700"
            >
              <DoorOpen className="h-4 w-4" aria-hidden />
              Lancer
            </button>
          </div>
        </div>

        <div className="bework-card border-emerald-200 bg-emerald-50/80 p-5">
          <p className="font-display text-base font-semibold text-bework-navy">
            Révision — termes non soumis
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {poolNonSoumisToutes.length} question{poolNonSoumisToutes.length !== 1 ? 's' : ''}{' '}
            jamais soumise{poolNonSoumisToutes.length !== 1 ? 's' : ''} sur {poolQuiz(null).length}{' '}
            — toutes rubriques mélangées.
          </p>
          {poolNonSoumisToutes.length >= 4 ? (
            <button
              type="button"
              onClick={demarrerNonSoumisToutesRubriques}
              className="bework-btn-primary mt-4 w-full"
            >
              <Shuffle className="h-4 w-4" aria-hidden />
              Lancer le quiz non vus (toutes rubriques)
            </button>
          ) : (
            <p className="mt-3 text-sm text-amber-800">
              Plus assez de termes non soumis. Réinitialisez la progression ou changez de catégorie.
            </p>
          )}
        </div>

        <div className="bework-card border-bework-blue-soft bg-bework-blue-soft/40 p-5">
          <p className="font-display text-base font-semibold text-bework-navy">
            Quiz par catégorie — mode débutant
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Choisissez une ou plusieurs thématiques. Les mauvaises réponses viennent surtout de la
            même catégorie (plus réaliste). Un indice est disponible sur chaque question. Aucun
            terme ne se répète pendant votre session ; les thèmes sont répartis équitablement
            (priorité aux rubriques pas encore vues).
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-500">Parcours recommandés</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {QUIZ_PRESETS_DEBUTANT.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => appliquerPreset(preset.id)}
                className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-bework-blue ${
                  presetActif === preset.id
                    ? 'border-bework-blue bg-bework-blue-soft/50'
                    : 'border-slate-200 bg-white hover:border-bework-blue/40'
                }`}
              >
                <p className="font-semibold text-bework-navy">{preset.label}</p>
                <p className="mt-1 text-xs text-slate-500">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-500">Ou choisissez une catégorie</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => toggleFamille('toutes')}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${chipClass(famillesSelection.length === 0 && !presetActif)}`}
            >
              Toutes
            </button>
            {FAMILLES.map((famille) => (
              <button
                key={famille}
                type="button"
                onClick={() => toggleFamille(famille)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${chipClass(famillesSelection.includes(famille))}`}
              >
                {famille}
              </button>
            ))}
          </div>
        </div>

        {aidesFamilles.length > 0 && (
          <div className="space-y-2">
            {aidesFamilles.slice(0, 2).map((aide, i) => (
              <div
                key={i}
                className="flex gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600"
              >
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-bework-blue" aria-hidden />
                <div>
                  <p>{aide.resume}</p>
                  <p className="mt-1 text-xs text-bework-blue">{aide.astuce}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-slate-500">
          {poolRestant.length} terme{poolRestant.length !== 1 ? 's' : ''} restant
          {poolRestant.length !== 1 ? 's' : ''} sur {pool.length} · série de {nbQuestionsSerie}{' '}
          question{nbQuestionsSerie !== 1 ? 's' : ''}
          {termesSoumis.size > 0 && (
            <span className="text-bework-blue">
              {' '}
              · {termesSoumis.size} déjà soumis{termesSoumis.size !== 1 ? 's' : ''}
            </span>
          )}
          {termesVusSession.size > 0 && (
            <span className="text-slate-400">
              {' '}
              · {termesVusSession.size} cette session
              {famillesVuesSession.size > 0 && (
                <> · {famillesVuesSession.size} thème{famillesVuesSession.size !== 1 ? 's' : ''}</>
              )}
            </span>
          )}
        </p>

        {sessionEpuisee ? (
          <div className="space-y-3">
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Vous avez vu tous les termes de cette sélection pendant cette session. Changez de
              catégorie ou recommencez une nouvelle session.
            </p>
            <button type="button" onClick={nouvelleSession} className="bework-btn-secondary w-full">
              Nouvelle session (tout réinitialiser)
            </button>
          </div>
        ) : poolInsuffisant ? (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Il faut au moins 4 termes restants pour lancer un quiz. Élargissez la catégorie,
            choisissez « Toutes », ou réinitialisez la session.
          </p>
        ) : (
          <button type="button" onClick={demarrer} className="bework-btn-primary w-full">
            Lancer le quiz — {libelleSelectionQuiz(famillesActives)}
          </button>
        )}

        {termesSoumis.size > 0 && (
          <button
            type="button"
            onClick={reinitialiserProgression}
            className="text-sm text-slate-500 hover:text-amber-700"
          >
            Réinitialiser toute la progression quiz ({termesSoumis.size} terme
            {termesSoumis.size !== 1 ? 's' : ''} soumis)
          </button>
        )}
      </div>
    );
  }

  // ── Résultat ──
  if (phase === 'resultat') {
    return (
      <div className="bework-card px-6 py-10 text-center">
        <p className="bework-kicker">{libelleSelectionQuiz(famillesActives)}</p>
        <p className="font-display mt-2 text-4xl font-bold text-bework-navy">
          {score} / {total}
        </p>
        <p className="mt-3 text-slate-500">{messageEncouragement(score, total)}</p>
        {poolRestant.length >= 4 ? (
          <p className="mt-2 text-xs text-slate-400">
            {poolRestant.length} nouveau{poolRestant.length !== 1 ? 'x' : ''} terme
            {poolRestant.length !== 1 ? 's' : ''} disponible{poolRestant.length !== 1 ? 's' : ''} pour la
            suite
          </p>
        ) : (
          <p className="mt-2 text-xs text-amber-700">
            Tous les termes de cette sélection ont été vus pendant cette session.
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {poolNonSoumisToutes.length >= 4 && (
            <button
              type="button"
              onClick={demarrerNonSoumisToutesRubriques}
              className="bework-btn-primary"
            >
              <Shuffle className="h-4 w-4" aria-hidden />
              Suite — non vus (toutes rubriques)
            </button>
          )}
          {poolRestant.length >= 4 && (
            <button type="button" onClick={recommencer} className="bework-btn-primary">
              <RotateCcw className="h-4 w-4" aria-hidden />
              Série suivante
            </button>
          )}
          <button type="button" onClick={retourConfig} className="bework-btn-secondary">
            Changer de catégorie
          </button>
        </div>
      </div>
    );
  }

  if (!question) {
    return <p className="text-center text-slate-500">Pas assez de termes pour lancer un quiz.</p>;
  }

  const afficherFeedback = choix !== null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>
          Question {index + 1} / {total}
        </span>
        <span className="rounded-full bg-bework-blue-soft px-2.5 py-0.5 text-xs font-medium text-bework-blue">
          {question.terme.famille}
        </span>
        <span>Score : {score}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-bework-blue transition-all"
          style={{ width: `${progression}%` }}
        />
      </div>

      <div className="bework-card p-5 sm:p-6">
        <p className="bework-kicker">Quel terme correspond à cette définition ?</p>
        <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
          {question.terme.definition}
        </p>
        {!afficherFeedback && (
          <button
            type="button"
            onClick={() => setIndiceVisible(true)}
            disabled={indiceVisible}
            className="mt-4 flex items-center gap-1.5 text-sm font-medium text-bework-blue hover:underline disabled:cursor-default disabled:no-underline disabled:opacity-70"
          >
            <Lightbulb className="h-4 w-4" aria-hidden />
            {indiceVisible ? question.indice : 'Besoin d\'un indice ?'}
          </button>
        )}
      </div>

      <div className="grid gap-3" role="radiogroup" aria-label="Choix de réponse">
        {question.options.map((opt) => {
          const estChoix = choix === opt.id;
          const estBonne = opt.id === question.bonneReponse;
          let classes =
            'w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bework-blue sm:text-base ';

          if (!afficherFeedback) {
            classes += 'bework-card border-slate-200 hover:border-bework-blue';
          } else if (estBonne) {
            classes += 'border-emerald-500 bg-emerald-50 text-bework-navy';
          } else if (estChoix && !estBonne) {
            classes += 'border-amber-500 bg-amber-50 text-bework-navy';
          } else {
            classes += 'border-transparent bg-slate-50 text-slate-400 opacity-70';
          }

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={estChoix}
              disabled={afficherFeedback}
              onClick={() => valider(opt.id)}
              className={classes}
            >
              <span>{opt.terme}</span>
              {afficherFeedback && opt.sigle && (
                <span className="mt-0.5 block text-xs font-normal text-slate-500">{opt.sigle}</span>
              )}
              {afficherFeedback && estBonne && <span className="ml-2 text-emerald-600">✓</span>}
              {afficherFeedback && estChoix && !estBonne && (
                <span className="ml-2 text-amber-600">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {afficherFeedback && choix !== question.bonneReponse && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Ce n&apos;était pas le bon terme. Retenez celui-ci ↓
        </p>
      )}

      {afficherFeedback && (
        <ExplicationBonneReponse
          terme={question.terme}
          correct={choix === question.bonneReponse}
        />
      )}

      {afficherFeedback && (
        <button type="button" onClick={suivant} className="bework-btn-primary w-full">
          {index + 1 >= total ? 'Voir le résultat' : 'Question suivante'}
        </button>
      )}
    </div>
  );
}
