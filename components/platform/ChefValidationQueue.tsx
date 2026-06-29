import Link from 'next/link';
import { AlertTriangle, ChevronRight, Clock } from 'lucide-react';
import { getMissionTypeLabel } from '@/lib/bework/moex-platform';
import { VALIDATION_REMINDER_DAYS, type PendingMission } from '@/lib/missions/pending-validation';
import { ChefRemindButton } from '@/components/platform/ChefRemindButton';

type ChefValidationQueueProps = {
  pending: PendingMission[];
  adminBasePath?: string;
};

export function ChefValidationQueue({
  pending,
  adminBasePath = '/plateforme/admin',
}: ChefValidationQueueProps) {
  const overdue = pending.filter((m) => m.isOverdue);
  const onTime = pending.filter((m) => !m.isOverdue);

  if (pending.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm text-emerald-800">
        Aucun livrable en attente de validation chef d&apos;équipe.
      </div>
    );
  }

  return (
    <section className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-red-800">
            File d&apos;attente validation ({pending.length})
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Triées par ancienneté — rappel conseillé après {VALIDATION_REMINDER_DAYS} jours.
          </p>
        </div>
        <ChefRemindButton overdueCount={overdue.length} />
      </div>

      {overdue.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1 text-xs font-semibold text-amber-800">
            <AlertTriangle size={14} />
            En retard ({overdue.length})
          </p>
          <QueueList missions={overdue} adminBasePath={adminBasePath} highlight />
        </div>
      )}

      {onTime.length > 0 && (
        <div>
          {overdue.length > 0 && (
            <p className="mb-2 flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Clock size={14} />
              Récentes
            </p>
          )}
          <QueueList missions={onTime} adminBasePath={adminBasePath} />
        </div>
      )}
    </section>
  );
}

function QueueList({
  missions,
  adminBasePath,
  highlight,
}: {
  missions: PendingMission[];
  adminBasePath: string;
  highlight?: boolean;
}) {
  return (
    <ul className="space-y-2">
      {missions.map((m) => (
        <li key={m.id}>
          <Link
            href={`${adminBasePath}/demandes/${m.id}`}
            className={`bework-card flex items-center justify-between gap-3 p-4 transition-shadow hover:shadow-md ${
              highlight ? 'border-amber-200 bg-amber-50/30' : ''
            }`}
          >
            <div className="min-w-0">
              <p className="font-medium text-slate-900">{m.title}</p>
              <p className="text-xs text-slate-500">
                {getMissionTypeLabel(m.type)}
                {m.chantier ? ` · ${m.chantier}` : ''}
              </p>
              <p className="mt-1 text-xs font-medium text-amber-800">
                En attente depuis {m.daysPending} jour{m.daysPending > 1 ? 's' : ''}
                {m.isOverdue ? ' — rappel recommandé' : ''}
              </p>
            </div>
            <ChevronRight size={18} className="shrink-0 text-slate-400" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
