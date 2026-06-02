import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { MISSION_TYPES } from '@/lib/bework/config';
import { PlusCircle, Clock, CheckCircle2 } from 'lucide-react';

export default async function PlateformeDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: missions } = await supabase
    .from('missions')
    .select('id, title, type, status, created_at')
    .order('created_at', { ascending: false })
    .limit(20);

  const statusLabel: Record<string, string> = {
    recue: 'Reçue',
    en_cours: 'En cours',
    en_attente_validation: 'À valider',
    terminee: 'Terminée',
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Tableau de bord</h1>
          <p className="mt-1 text-slate-600">{user?.email}</p>
        </div>
        <Link
          href="/plateforme/demandes/nouvelle"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--bework-blue)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          Nouvelle demande
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Forfait crédits</p>
          <p className="mt-1 text-2xl font-bold">— / —</p>
          <p className="mt-1 text-xs text-slate-400">1 crédit = 12 min (à configurer)</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">En cours</p>
          <p className="mt-1 text-2xl font-bold">
            {missions?.filter((m) => m.status === 'en_cours').length ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Terminées</p>
          <p className="mt-1 text-2xl font-bold">
            {missions?.filter((m) => m.status === 'terminee').length ?? 0}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Vos demandes récentes</h2>
        {!missions?.length ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-slate-600">Aucune demande pour le moment.</p>
            <Link href="/plateforme/demandes/nouvelle" className="mt-4 inline-block text-sm font-medium text-[var(--bework-blue)] hover:underline">
              Déposer une première demande →
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {missions.map((m) => {
              const typeLabel = MISSION_TYPES.find((t) => t.id === m.type)?.label ?? m.type;
              return (
                <li key={m.id}>
                  <Link
                    href={`/plateforme/demandes/${m.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4 hover:border-blue-200"
                  >
                    <div>
                      <p className="font-medium">{m.title}</p>
                      <p className="text-sm text-slate-500">{typeLabel}</p>
                    </div>
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      {m.status === 'terminee' ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Clock size={16} />}
                      {statusLabel[m.status] ?? m.status}
                    </span>
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
