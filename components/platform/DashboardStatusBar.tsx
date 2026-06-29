import Link from 'next/link';
import { Clock, ShieldCheck, Loader2 } from 'lucide-react';

type DashboardStatusBarProps = {
  enCours: number;
  aValider: number;
  adminHref?: string;
  showAdmin?: boolean;
};

export function DashboardStatusBar({
  enCours,
  aValider,
  adminHref = '/plateforme/admin',
  showAdmin = false,
}: DashboardStatusBarProps) {
  if (enCours === 0 && aValider === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {enCours > 0 && (
        <Link
          href="/plateforme?status=en_cours"
          className="inline-flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100"
        >
          <Loader2 size={16} className="text-amber-700" />
          {enCours} en cours
        </Link>
      )}
      {aValider > 0 && (
        <Link
          href={showAdmin ? `${adminHref}?status=en_attente_validation` : '/plateforme?status=en_attente_validation'}
          className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-900 transition-colors hover:bg-blue-100"
        >
          <Clock size={16} />
          {aValider} à valider
        </Link>
      )}
      {showAdmin && aValider > 0 && (
        <Link
          href={adminHref}
          className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-900 transition-colors hover:bg-red-100"
        >
          <ShieldCheck size={16} />
          File chef
        </Link>
      )}
    </div>
  );
}
