import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getAppUser } from '@/lib/auth/get-user';
import { getMissionTypeLabel, isMoexPlatformMissionType } from '@/lib/bework/moex-platform';
import { MissionIcon } from '@/lib/bework/mission-icons';
import { getSkillById, getSkillForMissionType } from '@/lib/skills/registry';
import { MissionDeliverableDownload } from '@/components/platform/MissionDeliverableDownload';
import { MissionSkillRunner } from '@/components/platform/MissionSkillRunner';
import { InternalUseNotice } from '@/components/brand/InternalUseNotice';
import { TeamLeaderValidationAlert } from '@/components/brand/TeamLeaderValidationAlert';
import { ANTHROPIC_MODEL_LABELS } from '@/lib/bework/anthropic-models';
import {
  DELIVERABLE_FORMAT_LABELS,
  parseDeliverableFormat,
} from '@/lib/bework/deliverable-formats';
import { resolveMissionOptions, stripMissionMetaFromBrief } from '@/lib/bework/mission-meta';
import { missionDeliverableExists } from '@/lib/skills/mission-output';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getMission } from '@/lib/dev/local-missions';
import { createClient } from '@/lib/supabase/server';

export default async function DemandeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAppUser();
  if (!user) return null;

  let mission: {
    id: string;
    title: string;
    type: string;
    skill_id: string;
    status: string;
    chantier: string | null;
    brief: string;
    ai_result: string | null;
    output_format?: string | null;
    use_skill_charter?: boolean | null;
    ai_model?: string | null;
  } | null = null;

  if (DEV_BYPASS) {
    const m = await getMission(id, user.id);
    if (m) mission = m;
  } else {
    const supabase = await createClient();
    const { data } = await supabase.from('missions').select('*').eq('id', id).eq('user_id', user.id).single();
    if (data) mission = data;
  }

  if (!mission) notFound();

  const missionOptions = resolveMissionOptions({
    brief: mission.brief,
    output_format: mission.output_format,
    use_skill_charter: mission.use_skill_charter,
    ai_model: mission.ai_model,
  });
  const displayBrief = stripMissionMetaFromBrief(mission.brief);
  const outputFormat = missionOptions.output_format;
  const modelLabel = ANTHROPIC_MODEL_LABELS[missionOptions.ai_model].label;
  const hasDeliverable = await missionDeliverableExists(id, outputFormat);
  const typeLabel = getMissionTypeLabel(mission.type);
  const showTypeIcon = isMoexPlatformMissionType(mission.type);
  const skill = getSkillById(mission.skill_id) ?? getSkillForMissionType(mission.type);

  const statusLabel: Record<string, string> = {
    recue: 'Reçue',
    en_cours: 'En cours',
    en_attente_validation: 'À valider',
    terminee: 'Terminée',
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
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[var(--bework-blue)]">
            {statusLabel[mission.status] ?? mission.status}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs text-[var(--bework-blue)]">
            {showTypeIcon && (
              <MissionIcon missionTypeId={mission.type} size="sm" className="!h-6 !w-6 rounded-lg" />
            )}
            {typeLabel}
          </span>
        </div>
        <h1 className="font-display mt-3 text-2xl font-bold text-slate-900">{mission.title}</h1>
        {skill && <p className="mt-1 text-sm text-slate-500">Assistant : {skill.name}</p>}
        {!skill?.integrated && (
          <p className="mt-2 text-xs text-slate-500">
            Livrable : {DELIVERABLE_FORMAT_LABELS[outputFormat].label}
            {missionOptions.use_skill_charter ? ' · charte du skill appliquée' : ' · sans charte propriétaire'}
            {' · '}
            {modelLabel}
          </p>
        )}
      </header>

      <InternalUseNotice variant="short" className="mt-6" />
      <TeamLeaderValidationAlert className="mt-4" />

      {mission.chantier && (
        <p className="mt-4 text-sm text-slate-600">
          <strong className="text-slate-700">Chantier :</strong> {mission.chantier}
        </p>
      )}

      <MissionSkillRunner
        missionId={mission.id}
        status={mission.status}
        aiResult={mission.ai_result}
        integrated={Boolean(skill?.integrated)}
        skillName={skill?.name ?? 'Assistant BeWork'}
      />

      <div className="bework-card mt-6 p-6">
        <h2 className="text-sm font-semibold text-slate-800">Votre demande</h2>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
          {displayBrief}
        </pre>
      </div>

      {mission.ai_result && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-6">
          <h2 className="text-sm font-semibold text-emerald-900">Résultat de l&apos;assistant</h2>
          <div className="prose prose-sm mt-3 max-w-none text-slate-800">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{mission.ai_result}</pre>
          </div>
          <MissionDeliverableDownload
            missionId={id}
            hasFile={hasDeliverable}
            outputFormat={outputFormat}
          />
        </div>
      )}

      {skill?.integrated && skill.toolPath && (
        <Link href={skill.toolPath} className="bework-btn-primary mt-6 inline-flex">
          Ouvrir l&apos;outil {skill.name}
        </Link>
      )}
    </div>
  );
}
