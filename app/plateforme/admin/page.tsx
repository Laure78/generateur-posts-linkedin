import Link from 'next/link';
import { getAppProfile } from '@/lib/auth/profile';
import { fetchMissionsList } from '@/lib/missions/access';
import { getMissionTypeLabel } from '@/lib/bework/moex-platform';
import { ROLE_LABELS } from '@/lib/bework/roles';
import { MissionDashboardFilters } from '@/components/platform/MissionDashboardFilters';
import { ChefValidationQueue } from '@/components/platform/ChefValidationQueue';
import { fetchPendingValidationQueue } from '@/lib/missions/pending-validation';
import { ChevronRight, Shield } from 'lucide-react';

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string; q?: string; page?: string }>;
}) {
  const profile = await getAppProfile();
  if (!profile) return null;

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const limit = 25;
  const offset = (page - 1) * limit;

  const missions = await fetchMissionsList({
    viewerId: profile.id,
    role: profile.role,
    status: params.status,
    type: params.type,
    q: params.q,
    limit: limit + 1,
    offset,
  });

  const hasMore = missions.length > limit;
  const rows = hasMore ? missions.slice(0, limit) : missions;

  const validationQueue = await fetchPendingValidationQueue(profile.id, profile.role);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
      <header className="bework-card border-red-100 p-6">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-red-800">
          <Shield size={18} />
          Administration BeWork
        </p>
        <h1 className="font-display mt-2 text-2xl font-bold text-[var(--bework-navy)]">
          Validation & suivi des demandes
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Connecté en tant que {ROLE_LABELS[profile.role]} — file d&apos;attente des livrables à valider avant envoi
          client.
        </p>
      </header>

      <ChefValidationQueue pending={validationQueue} />

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">Toutes les demandes</h2>
        <MissionDashboardFilters
          basePath="/plateforme/admin"
          initialStatus={params.status}
          initialType={params.type}
          initialQ={params.q}
        />
        <ul className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
          {rows.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-slate-500">Aucune demande</li>
          )}
          {rows.map((m) => (
            <li key={m.id}>
              <Link
                href={`/plateforme/admin/demandes/${m.id}`}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-900">{m.title}</p>
                  <p className="text-xs text-slate-500">
                    {getMissionTypeLabel(m.type)}
                    {m.chef_validated_at ? ' · Validé chef' : m.status === 'en_attente_validation' ? ' · À valider' : ''}
                  </p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-slate-400" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          {page > 1 && (
            <Link
              href={`/plateforme/admin?${new URLSearchParams({ ...params, page: String(page - 1) } as Record<string, string>).toString()}`}
              className="bework-btn-secondary text-sm"
            >
              Page précédente
            </Link>
          )}
          {hasMore && (
            <Link
              href={`/plateforme/admin?${new URLSearchParams({ ...params, page: String(page + 1) } as Record<string, string>).toString()}`}
              className="bework-btn-secondary text-sm"
            >
              Page suivante
            </Link>
          )}
        </div>
      </section>

      <p className="mt-8 text-sm text-slate-500">
        <Link href="/plateforme/demandes/nouvelle" className="text-[var(--bework-blue)] hover:underline">
          Créer une demande
        </Link>
        {' · '}
        <Link href="/plateforme" className="text-[var(--bework-blue)] hover:underline">
          Retour assistants travaux
        </Link>
      </p>
    </div>
  );
}
