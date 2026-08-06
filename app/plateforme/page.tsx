import Link from 'next/link';
import { getAppProfile } from '@/lib/auth/profile';
import { fetchMissionsList } from '@/lib/missions/access';
import { getMissionTypeLabel } from '@/lib/bework/moex-platform';
import { DEV_BYPASS } from '@/lib/dev/config';
import { PlusCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { MissionDashboardFilters } from '@/components/platform/MissionDashboardFilters';

function formatDate(iso?: string) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

function isThisMonth(iso?: string) {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

export default async function PlateformeDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string; q?: string; page?: string; toutes?: string }>;
}) {
  const profile = await getAppProfile();
  if (!profile) return null;

  const params = await searchParams;
  const showAll = params.toutes === '1';
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const limit = showAll ? 20 : 10;
  const offset = showAll ? (page - 1) * limit : 0;

  const [missions, statsSource] = await Promise.all([
    fetchMissionsList({
      viewerId: profile.id,
      role: profile.role,
      status: showAll ? params.status : undefined,
      type: showAll ? params.type : undefined,
      q: showAll ? params.q : undefined,
      limit: showAll ? limit + 1 : 10,
      offset,
    }),
    fetchMissionsList({
      viewerId: profile.id,
      role: profile.role,
      limit: 200,
      offset: 0,
    }),
  ]);

  const hasMore = showAll && missions.length > limit;
  const rows = showAll ? (hasMore ? missions.slice(0, limit) : missions) : missions.slice(0, 10);

  const enCours = statsSource.filter((m) => m.status === 'en_cours').length;
  const aValider = statsSource.filter(
    (m) => m.status === 'en_attente_validation' && !m.chef_validated_at
  ).length;
  const termineesMois = statsSource.filter(
    (m) =>
      (m.status === 'terminee' || Boolean(m.chef_validated_at)) &&
      isThisMonth(m.updated_at ?? m.created_at)
  ).length;

  const statusLabel: Record<string, string> = {
    recue: 'Reçue',
    en_cours: 'En cours',
    en_attente_validation: 'À valider',
    terminee: 'Terminée',
  };

  const statusStyle: Record<string, string> = {
    recue: 'bg-[#F8FAFC] text-[#64748B]',
    en_cours: 'bg-amber-50 text-amber-800',
    en_attente_validation: 'bg-blue-50 text-[#1D4ED8]',
    terminee: 'bg-emerald-50 text-emerald-800',
  };

  const displayName =
    profile.company_name ||
    profile.email?.split('@')[0] ||
    'Utilisateur';

  if (showAll) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-semibold text-[#0F172A]">Mes demandes</h1>
            <p className="mt-1 text-sm text-[#64748B]">{displayName}</p>
          </div>
          <Link href="/plateforme/demandes/nouvelle" className="bework-btn-primary">
            <PlusCircle size={18} />
            Nouvelle demande
          </Link>
        </div>

        <MissionDashboardFilters
          basePath="/plateforme"
          initialStatus={params.status}
          initialType={params.type}
          initialQ={params.q}
        />

        {!rows.length ? (
          <p className="mt-8 text-center text-sm text-[#64748B]">Aucune demande pour le moment.</p>
        ) : (
          <DemandesTable rows={rows} statusLabel={statusLabel} statusStyle={statusStyle} />
        )}

        <div className="mt-4 flex gap-2">
          {page > 1 && (
            <Link
              href={`/plateforme?toutes=1&page=${page - 1}`}
              className="bework-btn-secondary text-sm"
            >
              Page précédente
            </Link>
          )}
          {hasMore && (
            <Link
              href={`/plateforme?toutes=1&page=${page + 1}`}
              className="bework-btn-secondary text-sm"
            >
              Page suivante
            </Link>
          )}
          <Link href="/plateforme" className="bework-btn-ghost text-sm">
            ← Tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
      {DEV_BYPASS && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Mode développement local — données dans <code className="text-xs">.data/</code>
        </div>
      )}

      {/* 1. Barre supérieure */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-base font-medium text-[#0F172A]">{displayName}</p>
        <Link href="/plateforme/demandes/nouvelle" className="bework-btn-primary">
          <PlusCircle size={18} />
          Nouvelle demande
        </Link>
      </header>

      {/* 2. Compteurs */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link
          href="/plateforme?toutes=1&status=en_cours"
          className="bework-card flex flex-col gap-1 px-5 py-4 transition-colors hover:border-[#1D4ED8]/40"
        >
          <span className="text-2xl font-semibold tabular-nums text-[#0F172A]">{enCours}</span>
          <span className="text-sm text-[#64748B]">En cours</span>
        </Link>
        <Link
          href="/plateforme?toutes=1&status=en_attente_validation"
          className="bework-card flex flex-col gap-1 px-5 py-4 transition-colors hover:border-[#1D4ED8]/40"
        >
          <span className="text-2xl font-semibold tabular-nums text-[#0F172A]">{aValider}</span>
          <span className="text-sm text-[#64748B]">À valider</span>
        </Link>
        <Link
          href="/plateforme?toutes=1&status=terminee"
          className="bework-card flex flex-col gap-1 px-5 py-4 transition-colors hover:border-[#1D4ED8]/40"
        >
          <span className="text-2xl font-semibold tabular-nums text-[#0F172A]">{termineesMois}</span>
          <span className="text-sm text-[#64748B]">Terminées ce mois</span>
        </Link>
      </div>

      {/* 3. Alerte contextuelle */}
      {aValider > 0 && (
        <div
          role="alert"
          className="mt-6 flex flex-wrap items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-700" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">
              {aValider} livrable{aValider > 1 ? 's' : ''} en attente de validation
            </p>
            <p className="mt-0.5 text-amber-900/80">
              Relisez et validez avant envoi au client ou au maître d&apos;ouvrage.
            </p>
          </div>
          <Link
            href="/plateforme?toutes=1&status=en_attente_validation"
            className="shrink-0 font-semibold text-[#1D4ED8] hover:underline"
          >
            Voir les livrables →
          </Link>
        </div>
      )}

      {/* 4. Tableau dernières demandes */}
      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-base font-semibold text-[#0F172A]">
            Dernières demandes
          </h2>
          <Link
            href="/plateforme?toutes=1"
            className="text-sm font-semibold text-[#1D4ED8] hover:underline"
          >
            Voir tout
          </Link>
        </div>

        {!rows.length ? (
          <div className="bework-card mt-4 px-5 py-10 text-center">
            <p className="text-[#64748B]">Aucune demande pour le moment.</p>
            <Link href="/plateforme/demandes/nouvelle" className="bework-btn-primary mt-4 inline-flex">
              <PlusCircle size={18} />
              Nouvelle demande
            </Link>
          </div>
        ) : (
          <div className="mt-4">
            <DemandesTable rows={rows} statusLabel={statusLabel} statusStyle={statusStyle} />
          </div>
        )}
      </section>
    </div>
  );
}

function DemandesTable({
  rows,
  statusLabel,
  statusStyle,
}: {
  rows: Array<{
    id: string;
    title: string;
    type: string;
    chantier: string | null;
    status: string;
    chef_validated_at?: string | null;
    created_at?: string;
    updated_at?: string;
  }>;
  statusLabel: Record<string, string>;
  statusStyle: Record<string, string>;
}) {
  return (
    <div className="bework-card overflow-x-auto">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead>
          <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold uppercase tracking-wide text-[#64748B]">
            <th className="px-4 py-3 font-semibold">Objet</th>
            <th className="px-4 py-3 font-semibold">Assistant</th>
            <th className="px-4 py-3 font-semibold">Chantier</th>
            <th className="px-4 py-3 font-semibold">Statut</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">
              <span className="sr-only">Ouvrir</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id} className="border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC]/80">
              <td className="max-w-[12rem] truncate px-4 py-3 font-medium text-[#0F172A]">
                <Link href={`/plateforme/demandes/${m.id}`} className="hover:text-[#1D4ED8]">
                  {m.title}
                </Link>
              </td>
              <td className="max-w-[10rem] truncate px-4 py-3 text-[#64748B]">
                {getMissionTypeLabel(m.type)}
              </td>
              <td className="max-w-[8rem] truncate px-4 py-3 text-[#64748B]">
                {m.chantier || '—'}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusStyle[m.status] ?? 'bg-[#F8FAFC] text-[#64748B]'
                  }`}
                >
                  {m.chef_validated_at ? 'Validé chef' : statusLabel[m.status] ?? m.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-[#64748B]">
                {formatDate(m.updated_at ?? m.created_at)}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/plateforme/demandes/${m.id}`}
                  className="inline-flex text-[#64748B] hover:text-[#1D4ED8]"
                  aria-label={`Ouvrir ${m.title}`}
                >
                  <ChevronRight size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
