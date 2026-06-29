import Link from 'next/link';
import { getAppProfile } from '@/lib/auth/profile';
import { fetchMissionsList } from '@/lib/missions/access';
import { getMissionTypeLabel, isMoexPlatformMissionType } from '@/lib/bework/moex-platform';
import { canAccessAdminPlatform } from '@/lib/bework/roles';
import { DEV_BYPASS } from '@/lib/dev/config';
import { PlusCircle, Clock, CheckCircle2, ChevronRight, BookOpen, Shield } from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';
import { SkillActionAccordion } from '@/components/platform/SkillActionAccordion';
import { MissionIcon } from '@/lib/bework/mission-icons';
import { MissionDashboardFilters } from '@/components/platform/MissionDashboardFilters';
import { MobileAppBanner } from '@/components/platform/MobileAppBanner';
import { QuickMissionLauncher } from '@/components/platform/QuickMissionLauncher';
import { DashboardStatusBar } from '@/components/platform/DashboardStatusBar';
import { QuickMissionShortcuts } from '@/components/platform/QuickMissionShortcuts';

export default async function PlateformeDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string; q?: string; page?: string }>;
}) {
  const profile = await getAppProfile();
  if (!profile) return null;

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const limit = 20;
  const offset = (page - 1) * limit;

  const [missions, statsSource] = await Promise.all([
    fetchMissionsList({
      viewerId: profile.id,
      role: profile.role,
      status: params.status,
      type: params.type,
      q: params.q,
      limit: limit + 1,
      offset,
    }),
    fetchMissionsList({
      viewerId: profile.id,
      role: profile.role,
      limit: 200,
      offset: 0,
    }),
  ]);

  const hasMore = missions.length > limit;
  const rows = hasMore ? missions.slice(0, limit) : missions;

  const enCours = statsSource.filter((m) => m.status === 'en_cours').length;
  const aValider = statsSource.filter(
    (m) => m.status === 'en_attente_validation' && !m.chef_validated_at
  ).length;

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

  const displayName = profile.email?.split('@')[0] ?? 'Bienvenue';
  const showAdmin = canAccessAdminPlatform(profile.role);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
      {DEV_BYPASS && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Mode développement local — données dans <code className="text-xs">.data/</code>
          <span className="mt-1 block text-xs">
            Chef : email <code>chef@…</code> ou <code>+chef</code> · Admin : <code>admin@…</code>
          </span>
        </div>
      )}

      <header className="bework-card-tech bework-card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="bework-kicker">Assistants travaux · BeWork</p>
          <h1 className="font-display mt-2 text-2xl font-bold text-[var(--bework-navy)]">
            Bonjour, {displayName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{profile.email}</p>
          <p className="mt-2 max-w-md text-xs text-slate-500">{BEWORK.scopeLine}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <Link href="/plateforme/demandes/nouvelle" className="bework-btn-primary">
            <PlusCircle size={18} />
            Nouvelle demande
          </Link>
          {showAdmin && (
            <Link
              href="/plateforme/admin"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-900 hover:bg-red-100"
            >
              <Shield size={16} />
              Administration
            </Link>
          )}
        </div>
      </header>

      <DashboardStatusBar
        enCours={enCours}
        aValider={aValider}
        showAdmin={showAdmin}
      />

      <div className="mt-6">
        <QuickMissionLauncher />
      </div>

      <QuickMissionShortcuts className="mt-4" maxItems={5} />

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-slate-900">Demandes récentes</h2>
        <MissionDashboardFilters
          basePath="/plateforme"
          initialStatus={params.status}
          initialType={params.type}
          initialQ={params.q}
        />

        {!rows.length ? (
          <div className="bework-card mt-4 p-12 text-center">
            <p className="text-slate-600">Aucune demande pour le moment.</p>
            <p className="mt-2 text-sm text-slate-500">
              Utilisez la recherche ci-dessus ou créez une demande en 2 clics.
            </p>
            <Link href="/plateforme/demandes/nouvelle" className="bework-btn-primary mt-6 inline-flex">
              <PlusCircle size={18} />
              Déposer une demande
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-4 space-y-2">
              {rows.map((m) => {
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
                          {showIcon && <MissionIcon missionTypeId={m.type} size="sm" />}
                          {typeLabel}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            statusStyle[m.status] ?? 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {m.chef_validated_at ? 'Validé chef' : statusLabel[m.status] ?? m.status}
                        </span>
                        {m.status === 'terminee' || m.chef_validated_at ? (
                          <CheckCircle2 size={18} className="text-emerald-600" aria-hidden />
                        ) : (
                          <Clock size={18} className="text-slate-400" aria-hidden />
                        )}
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-[var(--bework-blue)]" aria-hidden />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex gap-2">
              {page > 1 && (
                <Link href={`/plateforme?page=${page - 1}`} className="bework-btn-secondary text-sm">
                  Page précédente
                </Link>
              )}
              {hasMore && (
                <Link href={`/plateforme?page=${page + 1}`} className="bework-btn-secondary text-sm">
                  Page suivante
                </Link>
              )}
            </div>
          </>
        )}
      </section>

      <SkillActionAccordion />

      <MobileAppBanner />

      <section className="mt-8">
        <Link
          href="/plateforme/ressources"
          className="bework-card flex flex-wrap items-center justify-between gap-4 p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--bework-blue-soft)]">
              <BookOpen className="text-[var(--bework-blue)]" size={22} aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-base font-semibold text-slate-900">
                Ressources — guide d&apos;utilisation
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-600">
                Bonnes pratiques pour les assistants travaux : traiter les demandes MOEX et faire valider chaque
                livrable par le chef d&apos;équipe.
              </p>
            </div>
          </div>
          <span className="text-sm font-semibold text-[var(--bework-blue)]">Lire le guide →</span>
        </Link>
      </section>

    </div>
  );
}
