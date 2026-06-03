import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

/** Rappel tutoriel + lien vers le guide (accessible avant connexion). */
export function AuthResourcesTeaser() {
  return (
    <div className="bework-card mt-6 border-blue-100 bg-blue-50/40 p-4 text-left">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--bework-blue)] ring-1 ring-[var(--bework-blue)]/15">
          <BookOpen size={20} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-slate-900">Ressources & tutoriel</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            Bon usage de l&apos;IA, précautions et{' '}
            <strong className="font-semibold text-slate-800">validation par le chef d&apos;équipe</strong> avant
            envoi au client, après relecture de chaque livrable.
          </p>
          <Link
            href="/guide"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--bework-blue)] hover:underline"
          >
            Consulter le guide complet
            <ChevronRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
