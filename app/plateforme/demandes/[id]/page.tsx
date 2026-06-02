import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAppUser } from '@/lib/auth/get-user';
import { MISSION_TYPES } from '@/lib/bework/config';
import { getSkillForMissionType } from '@/lib/skills/registry';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getMission } from '@/lib/dev/local-missions';
import { createClient } from '@/lib/supabase/server';

export default async function DemandeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAppUser();
  if (!user) return null;

  let mission: {
    title: string;
    type: string;
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

  const typeLabel = MISSION_TYPES.find((t) => t.id === mission.type)?.label ?? mission.type;
  const skill = getSkillForMissionType(mission.type);

  return (
    <div className="mx-auto max-w-3xl p-8">
      <Link href="/plateforme" className="text-sm text-[var(--bework-blue)] hover:underline">
        ← Tableau de bord
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold">{mission.title}</h1>
      <p className="mt-1 text-slate-600">{typeLabel}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[var(--bework-blue)]">
          {mission.status}
        </span>
        {skill && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{skill.name}</span>
        )}
      </div>
      {mission.chantier && (
        <p className="mt-4 text-sm text-slate-600">
          <strong>Chantier :</strong> {mission.chantier}
        </p>
      )}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">Brief</h2>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-slate-700">{mission.brief}</pre>
      </div>
      {mission.ai_result && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
          <h2 className="text-sm font-semibold text-emerald-900">Résultat assistant</h2>
          <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-800">{mission.ai_result}</pre>
        </div>
      )}
      {skill?.integrated && skill.toolPath && (
        <Link
          href={skill.toolPath}
          className="mt-6 inline-block rounded-xl bg-[var(--bework-blue)] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Ouvrir l&apos;outil {skill.name}
        </Link>
      )}
    </div>
  );
}
