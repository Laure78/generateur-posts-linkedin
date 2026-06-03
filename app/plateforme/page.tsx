import Link from 'next/link';
import { getAppUser } from '@/lib/auth/get-user';
import { getMissionTypeLabel } from '@/lib/bework/moex-platform';
import { DEV_BYPASS } from '@/lib/dev/config';
import { listMissions } from '@/lib/dev/local-missions';
import { createClient } from '@/lib/supabase/server';
import { PlusCircle, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';
import { SkillActionGrid } from '@/components/platform/SkillActionGrid';
import { MissionIcon } from '@/lib/bework/mission-icons';
import { isMoexPlatformMissionType } from '@/lib/bework/moex-platform';

export default async function PlateformeDashboardPage() {
  const user = await getAppUser();
  if (!user) return null;

  let missions: Array<{
    id: string;
    title: string;
    type: string;
    status: string;
    created_at: string;
  }> = [];

  if (DEV_BYPASS) {
    missions = await listMissions(user.id);
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('missions')
      .select('id, title, type, status, created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    missions = data ?? [];
  }

  const statusLabel: Record<string, string> = {
    recue: 'Reçue',
    en_cours: 'En cours',
    en_attente_validation: 'À valider',
    terminee: 'Terminée',
  };

  const statusStyle: Record<string, string> = {
    recue: 'bg-slate-100 text-slate-600',
    en_cours: 'bg-amber-50 text-amber-800',
    en_attente_validation: 'bg-blue-50 text-blue-800',
    terminee: 'bg-emerald-50 text-emerald-800',
  };

  const displayName = user.email?.split('@')[0] ?? 'Bienvenue';

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
      {DEV_BYPASS && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Mode développement local — données dans <code className="text-xs">.data/</code>
        </div>
      )}

      <header className="bework-card-tech bework-card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="bework-kicker">Plateforme MOEX · BeWork</p>
          <h1 className="font-display mt-2 text-2xl font-bold text-[var(--bework-navy)]">
            Bonjour, {displayName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          <p className="mt-2 max-w-md text-xs text-slate-500">{BEWORK.scopeLine}</p>
        </div>
        <Link href="/plateforme/demandes/nouvelle" className="bework-btn-primary shrink-0">
          <PlusCircle size={18} />
          Nouvelle demande
        </Link>
      </header>

      <SkillActionGrid />

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold text-slate-900">Demandes récentes</h2>
          {missions.length > 0 && (
            <Link
              href="/plateforme/demandes/nouvelle"
              className="text-sm font-medium text-[var(--bework-blue)] hover:underline"
            >
              Nouvelle demande
            </Link>
          )}
        </div>

        {!missions.length ? (
          <div className="bework-card mt-4 p-12 text-center">
            <p className="text-slate-600">Aucune demande pour le moment.</p>
            <p className="mt-2 text-sm text-slate-500">
              Choisissez un assistant ci-dessus ou créez votre première demande.
            </p>
            <Link href="/plateforme/demandes/nouvelle" className="bework-btn-primary mt-6 inline-flex">
              <PlusCircle size={18} />
              Déposer une demande
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {missions.map((m) => {
              const typeLabel = getMissionTypeLabel(m.type);
              const showIcon = isMoexPlatformMissionType(m.type);
              return (
                <li key={m.id}>
                  <Link
                    href={`/plateforme/demandes/${m.id}`}
                    className="bework-card group flex items-center justify-between gap-4 px-5 py-4 transition-all hover:border-[var(--bework-blue)]/40 hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">{m.title}</p>
                      <p className="mt-0.5 flex items-center gap-2 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-2">
                          {showIcon && <MissionIcon missionTypeId={m.type} size="sm" />}
                          {typeLabel}
                        </span>
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          statusStyle[m.status] ?? 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {statusLabel[m.status] ?? m.status}
                      </span>
                      {m.status === 'terminee' ? (
                        <CheckCircle2 size={18} className="text-emerald-600" aria-hidden />
                      ) : (
                        <Clock size={18} className="text-slate-400" aria-hidden />
                      )}
                      <ChevronRight
                        size={18}
                        className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--bework-blue)]"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
