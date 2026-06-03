'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSyncMissionTypeFromUrl } from '@/components/platform/use-sync-mission-type-url';
import { isValidMissionTypeId, missionTypeFromSearchParam } from '@/lib/bework/mission-type-url';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { MISSION_TYPES } from '@/lib/bework/config';
import { getCatalogMissions } from '@/lib/bework/mission-catalog';
import { getSkillForMissionType } from '@/lib/skills/registry';
import { MissionTypePicker } from '@/components/platform/MissionTypePicker';
import { MissionIcon } from '@/lib/bework/mission-icons';
import {
  DEFAULT_DELIVERABLE_FORMAT,
  type DeliverableFormat,
} from '@/lib/bework/deliverable-formats';
import { DeliverableOptionsFields } from '@/components/platform/DeliverableOptionsFields';

function NouvelleDemandeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const hasPresetType = isValidMissionTypeId(typeParam);

  const [step, setStep] = useState<1 | 2>(hasPresetType ? 2 : 1);
  const [type, setType] = useState<string>(() => missionTypeFromSearchParam(typeParam));

  useSyncMissionTypeFromUrl(setType, setStep);
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [chantier, setChantier] = useState('');
  const [outputFormat, setOutputFormat] = useState<DeliverableFormat>(DEFAULT_DELIVERABLE_FORMAT);
  const [useSkillCharter, setUseSkillCharter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const catalogMission = getCatalogMissions().find((m) => m.id === type);
  const skill = getSkillForMissionType(type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title,
          brief,
          chantier,
          output_format: outputFormat,
          use_skill_charter: useSkillCharter,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');

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
    <div className="mx-auto max-w-3xl px-6 py-8 lg:px-10">
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
          En 2 étapes : choisissez l&apos;assistant adapté, puis décrivez votre besoin. Un Beworker supervise le
          résultat.
        </p>
      </header>

      <ol className="mt-8 flex gap-2">
        {[
          { n: 1, label: 'Assistant' },
          { n: 2, label: 'Votre besoin' },
        ].map(({ n, label }) => (
          <li
            key={n}
            className={`flex flex-1 items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
              step === n
                ? 'bg-[var(--bework-blue)] text-white'
                : step > n
                  ? 'bg-blue-50 text-[var(--bework-blue)]'
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
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div className="mt-8 bework-card p-6">
          <h2 className="text-base font-semibold text-slate-900">Quel assistant utilisez-vous ?</h2>
          <div className="mt-4">
            <MissionTypePicker
              value={type}
              onChange={(next) => {
                setType(next);
                router.replace(`/plateforme/demandes/nouvelle?type=${encodeURIComponent(next)}`, {
                  scroll: false,
                });
              }}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setStep(2);
                router.replace(
                  `/plateforme/demandes/nouvelle?type=${encodeURIComponent(type)}`,
                  { scroll: false }
                );
              }}
              className="bework-btn-primary"
            >
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
                  {catalogMission && (
                    <MissionIcon missionTypeId={catalogMission.id} size="md" />
                  )}
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

            <div>
              <label htmlFor="brief" className="block text-sm font-medium text-slate-700">
                Contenu de la demande
              </label>
              <textarea
                id="brief"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                required
                rows={10}
                placeholder={catalogMission?.briefPlaceholder}
                className="bework-input mt-1.5 resize-y font-mono text-sm leading-relaxed"
              />
              {catalogMission?.briefHint && (
                <p className="mt-2 text-xs text-slate-500">{catalogMission.briefHint}</p>
              )}
            </div>

            {!skill?.integrated && (
              <DeliverableOptionsFields
                outputFormat={outputFormat}
                onOutputFormatChange={setOutputFormat}
                useSkillCharter={useSkillCharter}
                onUseSkillCharterChange={setUseSkillCharter}
                skillName={catalogMission?.skillName}
              />
            )}
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setStep(1)} className="bework-btn-secondary">
              <ArrowLeft size={18} />
              Retour
            </button>
            <button type="submit" disabled={loading} className="bework-btn-primary flex-1 sm:flex-none">
              <Send size={18} />
              {loading
            ? skill?.integrated
              ? 'Envoi…'
              : 'Envoi et traitement par l\'assistant…'
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
