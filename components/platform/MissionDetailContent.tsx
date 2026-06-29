import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getMissionTypeLabel, isMoexPlatformMissionType } from '@/lib/bework/moex-platform';
import { MissionIcon } from '@/lib/bework/mission-icons';
import { getSkillById, getSkillForMissionType } from '@/lib/skills/registry';
import { MissionDeliverableDownload } from '@/components/platform/MissionDeliverableDownload';
import { MissionSkillRunner } from '@/components/platform/MissionSkillRunner';
import { InternalUseNotice } from '@/components/brand/InternalUseNotice';
import { TeamLeaderValidationAlert } from '@/components/brand/TeamLeaderValidationAlert';
import { AdminValidatePanel } from '@/components/platform/AdminValidatePanel';
import { MissionInternalComment } from '@/components/platform/MissionInternalComment';
import { MissionRerunPanel } from '@/components/platform/MissionRerunPanel';
import { MissionDuplicateButton } from '@/components/platform/MissionDuplicateButton';
import { MissionValidationChecklist } from '@/components/platform/MissionValidationChecklist';
import { MissionDeliverablePreview } from '@/components/platform/MissionDeliverablePreview';
import { MissionAiUsageBadge } from '@/components/platform/MissionAiUsageBadge';
import { canAccessAdminPlatform } from '@/lib/bework/roles';
import type { BeworkRole } from '@/lib/bework/roles';
import { ANTHROPIC_MODEL_LABELS } from '@/lib/bework/anthropic-models';
import {
  DELIVERABLE_FORMAT_LABELS,
  parseDeliverableFormat,
} from '@/lib/bework/deliverable-formats';
import { resolveMissionOptions, stripMissionMetaFromBrief } from '@/lib/bework/mission-meta';
import type { MissionRow } from '@/lib/missions/types';

const STATUS_LABEL: Record<string, string> = {
  recue: 'Reçue',
  en_cours: 'En cours',
  en_attente_validation: 'À valider (chef)',
  terminee: 'Terminée',
  annulee: 'Annulée',
};

type MissionDetailContentProps = {
  mission: MissionRow;
  hasDeliverable: boolean;
  viewerRole: BeworkRole;
  viewerId: string;
  backHref: string;
  backLabel: string;
  adminMode?: boolean;
};

export function MissionDetailContent({
  mission,
  hasDeliverable,
  viewerRole,
  viewerId,
  backHref,
  backLabel,
  adminMode = false,
}: MissionDetailContentProps) {
  const missionOptions = resolveMissionOptions({
    brief: mission.brief,
    output_format: mission.output_format,
    use_skill_charter: mission.use_skill_charter,
    ai_model: mission.ai_model,
  });
  const displayBrief = stripMissionMetaFromBrief(mission.brief);
  const outputFormat = missionOptions.output_format;
  const modelLabel = ANTHROPIC_MODEL_LABELS[missionOptions.ai_model].label;
  const typeLabel = getMissionTypeLabel(mission.type);
  const showTypeIcon = isMoexPlatformMissionType(mission.type);
  const skill = getSkillById(mission.skill_id) ?? getSkillForMissionType(mission.type);
  const isChef = canAccessAdminPlatform(viewerRole);
  const showValidate = adminMode && isChef && Boolean(mission.ai_result);
  const isOwner = mission.user_id === viewerId;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 lg:px-10">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--bework-blue)] hover:underline"
      >
        <ArrowLeft size={16} />
        {backLabel}
      </Link>

      {adminMode && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-900">
          Espace Administration — validation chef d&apos;équipe
        </p>
      )}

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[var(--bework-blue)]">
            {STATUS_LABEL[mission.status] ?? mission.status}
          </span>
          {mission.chef_validated_at && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
              Validé chef
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs text-[var(--bework-blue)]">
            {showTypeIcon && (
              <MissionIcon missionTypeId={mission.type} size="sm" className="!h-6 !w-6 rounded-lg" />
            )}
            {typeLabel}
          </span>
          {(mission.deliverable_version ?? 1) > 1 && (
            <span className="text-xs text-slate-500">v{mission.deliverable_version}</span>
          )}
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
        <MissionAiUsageBadge
          inputTokens={mission.ai_tokens_input}
          outputTokens={mission.ai_tokens_output}
          aiModel={mission.ai_model}
        />
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {isOwner && <MissionDuplicateButton missionId={mission.id} />}
      </div>

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
        {isOwner && !skill?.integrated && mission.ai_result && (
          <MissionRerunPanel missionId={mission.id} currentBrief={mission.brief} />
        )}
      </div>

      {mission.ai_result && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-6">
          <h2 className="text-sm font-semibold text-emerald-900">Résultat de l&apos;assistant</h2>
          <MissionDeliverablePreview aiResult={mission.ai_result} />
          <div className="prose prose-sm mt-3 max-w-none text-slate-800">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{mission.ai_result}</pre>
          </div>
          <MissionDeliverableDownload
            missionId={mission.id}
            hasFile={hasDeliverable}
            outputFormat={outputFormat}
            chefValidated={Boolean(mission.chef_validated_at)}
          />
        </div>
      )}

      {showValidate && (
        <AdminValidatePanel
          missionId={mission.id}
          alreadyValidated={Boolean(mission.chef_validated_at)}
          validatedAt={mission.chef_validated_at}
          validationNote={mission.chef_validation_note}
        />
      )}

      <MissionInternalComment
        missionId={mission.id}
        initialComment={mission.internal_comment ?? null}
        canEdit={isChef || isOwner}
      />

      <MissionValidationChecklist missionTypeId={mission.type} />

      {skill?.integrated && skill.toolPath && (
        <Link href={skill.toolPath} className="bework-btn-primary mt-6 inline-flex">
          Ouvrir l&apos;outil {skill.name}
        </Link>
      )}
    </div>
  );
}
