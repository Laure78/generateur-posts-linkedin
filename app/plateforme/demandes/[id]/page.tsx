import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getAppUser } from '@/lib/auth/get-user';
import { MISSION_TYPES } from '@/lib/bework/config';
import { MissionIcon } from '@/lib/bework/mission-icons';
import { getSkillById, getSkillForMissionType } from '@/lib/skills/registry';
import { MissionDocumentDownload } from '@/components/platform/MissionDocumentDownload';
import { MissionSkillRunner } from '@/components/platform/MissionSkillRunner';
import { missionDocxExists } from '@/lib/skills/mission-output';
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

  const hasDocx = await missionDocxExists(id);
  const typeMeta = MISSION_TYPES.find((t) => t.id === mission.type);
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
          {typeMeta && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs text-[var(--bework-blue)]">
              <MissionIcon missionTypeId={typeMeta.id} size="sm" className="!h-6 !w-6 rounded-lg" />
              {typeMeta.label}
            </span>
          )}
        </div>
        <h1 className="font-display mt-3 text-2xl font-bold text-slate-900">{mission.title}</h1>
        {skill && <p className="mt-1 text-sm text-slate-500">Assistant : {skill.name}</p>}
      </header>

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
          {mission.brief}
        </pre>
      </div>

      {mission.ai_result && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-6">
          <h2 className="text-sm font-semibold text-emerald-900">Résultat de l&apos;assistant</h2>
          <div className="prose prose-sm mt-3 max-w-none text-slate-800">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{mission.ai_result}</pre>
          </div>
          <MissionDocumentDownload missionId={id} hasDocx={hasDocx} />
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
