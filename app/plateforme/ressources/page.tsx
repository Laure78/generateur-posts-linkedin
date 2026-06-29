import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { PlatformGuideContent } from '@/components/platform/PlatformGuideContent';

export const metadata: Metadata = {
  title: 'Ressources — Guide assistants travaux',
  description:
    "Bon usage de l'outil interne BeWork pour traiter les demandes MOEX externalisées et vérifier les livrables IA.",
  robots: { index: false, follow: false },
};

export default function PlateformeRessourcesPage() {
  return (
    <div className="px-6 py-8 lg:px-10">
      <Link
        href="/plateforme"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--bework-blue)] hover:underline"
      >
        <ArrowLeft size={16} />
        Tableau de bord
      </Link>
      <p className="mt-4 text-sm text-slate-500">
        <a href="/guide" className="font-medium text-[var(--bework-blue)] hover:underline">
          Lien public du guide
        </a>{' '}
        (partageable avant connexion).
      </p>

      <Link
        href="/lexique"
        className="bework-card-tech bework-card mt-6 flex items-start gap-4 p-5 transition-shadow hover:shadow-md"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--bework-blue-soft)] text-[var(--bework-blue)]">
          <GraduationCap className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <p className="bework-kicker">Nouveau</p>
          <p className="font-display mt-0.5 text-base font-bold text-[var(--bework-navy)]">
            Lexique &amp; apprentissage BTP
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Parcours guidés avec schémas, dictionnaire de 146 termes, flashcards et quiz — langage
            simple pour débutants.
          </p>
        </div>
      </Link>

      <div className="mt-6">
        <PlatformGuideContent />
      </div>
    </div>
  );
}
