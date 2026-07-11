'use client';

import { useState, Suspense, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSyncMissionTypeFromUrl } from '@/components/platform/use-sync-mission-type-url';
import { isValidMissionTypeId, missionTypeFromSearchParam } from '@/lib/bework/mission-type-url';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Send, ChevronDown } from 'lucide-react';
import { getCatalogMissions } from '@/lib/bework/mission-catalog';
import { getSkillForMissionType } from '@/lib/skills/registry';
import { MissionTypePicker } from '@/components/platform/MissionTypePicker';
import { MissionIcon } from '@/lib/bework/mission-icons';
import {
  DEFAULT_DELIVERABLE_FORMAT,
  type DeliverableFormat,
} from '@/lib/bework/deliverable-formats';
import { TeamLeaderValidationAlert } from '@/components/brand/TeamLeaderValidationAlert';
import { AiModelFields } from '@/components/platform/AiModelFields';
import { DeliverableOptionsFields } from '@/components/platform/DeliverableOptionsFields';
import {
  DEFAULT_ANTHROPIC_MODEL_PRESET,
  type AnthropicModelPreset,
} from '@/lib/bework/anthropic-models';
import { BriefFileUpload } from '@/components/platform/BriefFileUpload';
import { MissionCrBriefFields, buildCrBriefPrefix } from '@/components/platform/MissionCrBriefFields';
import { MissionGuidedBriefFields } from '@/components/platform/MissionGuidedBriefFields';
import { BriefVoiceDictation } from '@/components/platform/BriefVoiceDictation';
import { DemandDraftBanner } from '@/components/platform/DemandDraftBanner';
import {
  buildGuidedBriefPrefix,
  getBriefSchema,
  crValuesFromGuided,
} from '@/lib/bework/mission-brief-schema';
import { recordRecentMissionType } from '@/lib/bework/mission-type-prefs';
import {
  loadDemandDraft,
  saveDemandDraft,
  clearDemandDraft,
  type DemandDraft,
} from '@/lib/bework/demand-draft';

function NouvelleDemandeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const titleParam = searchParams.get('title');
  const briefParam = searchParams.get('brief');
  const hasPresetType = isValidMissionTypeId(typeParam);

  const [step, setStep] = useState<1 | 2>(hasPresetType ? 2 : 1);
  const [type, setType] = useState<string>(() => missionTypeFromSearchParam(typeParam));

  useSyncMissionTypeFromUrl(setType, setStep);
  const [title, setTitle] = useState(() => titleParam?.trim() ?? '');
  const [brief, setBrief] = useState(() => briefParam?.trim() ?? '');
  const [chantier, setChantier] = useState('');
  const [outputFormat, setOutputFormat] = useState<DeliverableFormat>(DEFAULT_DELIVERABLE_FORMAT);
  const [useSkillCharter, setUseSkillCharter] = useState(true);
  const [aiModel, setAiModel] = useState<AnthropicModelPreset>(DEFAULT_ANTHROPIC_MODEL_PRESET);
  const [crNumber, setCrNumber] = useState('');
  const [previousCr, setPreviousCr] = useState('');
  const [guidedValues, setGuidedValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingDraft, setPendingDraft] = useState<DemandDraft | null>(null);
  const [draftDismissed, setDraftDismissed] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isCrType = type === 'cr-chantier-moex' || type === 'cr-chantier-3dm';
  const briefSchema = getBriefSchema(type);
  const useLegacyCrFields = isCrType && !briefSchema;

  const catalogMission = getCatalogMissions().find((m) => m.id === type);
  const skill = getSkillForMissionType(type);

  useEffect(() => {
    setGuidedValues({});
  }, [type]);

  useEffect(() => {
    if (hasPresetType || draftDismissed) return;
    const draft = loadDemandDraft();
    if (draft && (draft.title || draft.brief || draft.chantier || Object.keys(draft.guidedValues).length)) {
      setPendingDraft(draft);
    }
  }, [hasPresetType, draftDismissed]);

  const persistDraft = useCallback(() => {
    if (step !== 2) return;
    saveDemandDraft({ type, title, brief, chantier, guidedValues, step });
  }, [type, title, brief, chantier, guidedValues, step]);

  useEffect(() => {
    if (step !== 2) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(persistDraft, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [persistDraft, step]);

  const goStep2 = useCallback(() => {
    setStep(2);
    router.replace(`/plateforme/demandes/nouvelle?type=${encodeURIComponent(type)}`, { scroll: false });
  }, [router, type]);

  const restoreDraft = () => {
    if (!pendingDraft) return;
    setType(pendingDraft.type);
    setTitle(pendingDraft.title);
    setBrief(pendingDraft.brief);
    setChantier(pendingDraft.chantier);
    setGuidedValues(pendingDraft.guidedValues);
    setStep(pendingDraft.step);
    setPendingDraft(null);
    router.replace(
      `/plateforme/demandes/nouvelle?type=${encodeURIComponent(pendingDraft.type)}`,
      { scroll: false }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      recordRecentMissionType(type);
      const crFromGuided = crValuesFromGuided(guidedValues);
      const guidedPrefix = buildGuidedBriefPrefix(type, guidedValues);
      const crPrefix = useLegacyCrFields
        ? buildCrBriefPrefix(crNumber, previousCr)
        : buildCrBriefPrefix(crFromGuided.crNumber, crFromGuided.previousCr);
      const fullBrief = `${guidedPrefix || crPrefix}${brief}`.trim();

      const res = await fetch('/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title,
          brief: fullBrief,
          chantier,
          output_format: outputFormat,
          use_skill_charter: useSkillCharter,
          ai_model: aiModel,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');

      clearDemandDraft();

      if (data.integrated && skill?.toolPath) {
        router.push(`${skill.toolPath}?mission=${data.id}`);
      } else {
        router.push(`/plateforme/demandes/${data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 pb-28 lg:px-10">
      <Link
        href="/plateforme"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--bework-blue)] hover:underline"
      >
        <ArrowLeft size={16} />
        Tableau de bord
      </Link>

      <header className="mt-6">
        <h1 className="font-display text-2xl font-bold text-slate-900">Nouvelle demande</h1>
        <p className="mt-2 max-w-xl text-slate-600">
          {step === 1
            ? 'Choisissez l’assistant — recherche, favoris ou double-clic pour passer à l’étape suivante.'
            : 'Décrivez le besoin. Le brouillon est sauvegardé automatiquement.'}
        </p>
      </header>

      {pendingDraft && !draftDismissed && (
        <DemandDraftBanner
          draft={pendingDraft}
          onRestore={restoreDraft}
          onDismiss={() => {
            setDraftDismissed(true);
            setPendingDraft(null);
            clearDemandDraft();
          }}
        />
      )}

      <ol className="mt-8 flex w-full gap-2">
        {[
          { n: 1 as const, label: 'Assistant' },
          { n: 2 as const, label: 'Votre besoin' },
        ].map(({ n, label }) => (
          <li key={n} className="flex-1">
            <button
              type="button"
              onClick={() => (n === 1 ? setStep(1) : type && goStep2())}
              className={`flex flex-1 items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                step === n
                  ? 'bg-[var(--bework-blue)] text-white'
                  : step > n
                    ? 'bg-blue-50 text-[var(--bework-blue)] hover:bg-blue-100'
                    : 'bg-white text-slate-400 ring-1 ring-slate-200'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                  step === n ? 'bg-white/20' : step > n ? 'bg-[var(--bework-blue)] text-white' : 'bg-slate-100'
                }`}
              >
                {n}
              </span>
              {label}
            </button>
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div className="mt-8 bework-card p-6">
          <h2 className="text-base font-semibold text-slate-900">Quel assistant utilisez-vous ?</h2>
          <div className="mt-4">
            <MissionTypePicker
              value={type}
              onContinue={goStep2}
              onChange={(next) => {
                setType(next);
                recordRecentMissionType(next);
                router.replace(`/plateforme/demandes/nouvelle?type=${encodeURIComponent(next)}`, {
                  scroll: false,
                });
              }}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={goStep2} className="bework-btn-primary">
              Continuer
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bework-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Assistant sélectionné</p>
                <p className="mt-2 flex items-center gap-3 font-semibold text-slate-900">
                  {catalogMission && <MissionIcon missionTypeId={catalogMission.id} size="md" />}
                  {catalogMission?.label}
                </p>
                <p className="mt-1 text-sm text-slate-500">{catalogMission?.skillName}</p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium text-[var(--bework-blue)] hover:underline"
              >
                Modifier
              </button>
            </div>
          </div>

          <div className="bework-card space-y-5 p-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                Titre / référence
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder={catalogMission?.titlePlaceholder}
                className="bework-input mt-1.5"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="chantier" className="block text-sm font-medium text-slate-700">
                Chantier / marché <span className="font-normal text-slate-400">(optionnel)</span>
              </label>
              <input
                id="chantier"
                value={chantier}
                onChange={(e) => setChantier(e.target.value)}
                placeholder="Réf. marché, adresse, opération, lot…"
                className="bework-input mt-1.5"
              />
            </div>

            {useLegacyCrFields && (
              <MissionCrBriefFields
                crNumber={crNumber}
                onCrNumberChange={setCrNumber}
                previousCr={previousCr}
                onPreviousCrChange={setPreviousCr}
              />
            )}

            {briefSchema && (
              <MissionGuidedBriefFields
                missionTypeId={type}
                values={guidedValues}
                onChange={(fieldId, value) =>
                  setGuidedValues((v) => ({ ...v, [fieldId]: value }))
                }
              />
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
              <BriefVoiceDictation
                disabled={loading}
                onTranscript={(text) => {
                  const block = `--- Dictée vocale ---\n${text}\n\n`;
                  setBrief((b) => (b.trim() ? `${b.trim()}\n\n${block}` : block));
                }}
              />
              <BriefFileUpload
                disabled={loading}
                onTextExtracted={(text, fileName) => {
                  const block = `--- Pièce importée : ${fileName} ---\n\n${text}\n\n`;
                  setBrief((b) => (b.trim() ? `${b.trim()}\n\n${block}` : block));
                }}
              />
            </div>

            <div>
              <label htmlFor="brief" className="block text-sm font-medium text-slate-700">
                Contenu de la demande
              </label>
              <textarea
                id="brief"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                required
                rows={8}
                placeholder={catalogMission?.briefPlaceholder}
                className="bework-input mt-1.5 resize-y text-sm leading-relaxed"
              />
              {catalogMission?.briefHint && (
                <p className="mt-2 text-xs text-slate-500">{catalogMission.briefHint}</p>
              )}
            </div>

            <TeamLeaderValidationAlert className="border-t border-slate-100 pt-5" />

            {!skill?.integrated && (
              <details className="group border-t border-slate-100 pt-4">
                <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-slate-700">
                  <ChevronDown
                    size={16}
                    className="text-slate-400 transition-transform group-open:rotate-180"
                  />
                  Options avancées (modèle IA, format livrable)
                </summary>
                <div className="mt-4 space-y-5 pl-1">
                  <AiModelFields value={aiModel} onChange={setAiModel} />
                  <DeliverableOptionsFields
                    outputFormat={outputFormat}
                    onOutputFormatChange={setOutputFormat}
                    useSkillCharter={useSkillCharter}
                    onUseSkillCharterChange={setUseSkillCharter}
                    skillName={catalogMission?.skillName}
                  />
                </div>
              </details>
            )}
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <div className="bework-sticky-form-actions">
            <button type="button" onClick={() => setStep(1)} className="bework-btn-secondary">
              <ArrowLeft size={18} />
              Retour
            </button>
            <button type="submit" disabled={loading} className="bework-btn-primary flex-1 sm:flex-none">
              <Send size={18} />
              {loading
                ? skill?.integrated
                  ? 'Envoi…'
                  : "Envoi et traitement par l'assistant…"
                : 'Envoyer la demande'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function NouvelleDemandePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-slate-500">Chargement…</div>
      }
    >
      <NouvelleDemandeForm />
    </Suspense>
  );
}
