import {
  Inbox,
  UserPlus,
  Briefcase,
  CircleCheck,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { MOEX_PLATFORM } from '@/lib/bework/moex-platform';

const STEPS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Votre entreprise dépose la demande',
    description:
      'Marché public (DCE, mémoire, conformité d\'offre) ou marché privé (courrier promoteur, réserves, DOE) : CR, relances, tableaux de suivi — vous briefez BeWork en une demande.',
    icon: Inbox,
  },
  {
    title: "L'assistant travaux qualifie le dossier",
    description:
      "Via la plateforme : type de marché, pièces attendues, choix de l'assistant adapté (chantier, consultation, courrier, réception).",
    icon: UserPlus,
  },
  {
    title: "L'IA prépare, le Beworker vérifie",
    description:
      "Rédaction et mise en forme accélérées par l'IA. L'assistant travaux relit, corrige et valide avant transmission à votre équipe.",
    icon: Briefcase,
  },
  {
    title: 'Livrable validé pour votre marché',
    description:
      "Document relu renvoyé à l'entreprise. Ce qui engage juridiquement ou contractuellement reste sous votre responsabilité finale (MOA, promoteur, donneur d'ordre).",
    icon: CircleCheck,
  },
  {
    title: 'Plus de réactivité sur vos dossiers',
    description:
      'Moins de friction entre bureau et chantier : statuts visibles, pièces classées, AO publics et marchés privés qui avancent sans sacrifier le terrain.',
    icon: TrendingUp,
  },
];

export function BeWorkProcessSteps() {
  return (
    <section className="border-t border-slate-200/80 bg-white/70 py-16">
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <p className="bework-kicker text-center">Comment ça marche</p>
        <h2 className="font-display mt-2 text-center text-2xl font-bold text-[var(--bework-navy)] md:text-3xl">
          Du brief à la livraison, en 5 étapes
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
          {MOEX_PLATFORM.audienceLong}.
        </p>

        <ol className="mt-12 space-y-10">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const num = index + 1;
            return (
              <li key={step.title} className="flex gap-4 sm:gap-6">
                <div className="flex shrink-0 flex-col items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bework-blue)] text-sm font-bold text-white shadow-sm"
                    aria-hidden
                  >
                    {num}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[var(--bework-blue)]/25 bg-[var(--bework-blue-soft)]/50">
                    <Icon className="text-[var(--bework-blue)]" size={26} strokeWidth={1.75} />
                  </div>
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-display text-lg font-bold text-[var(--bework-navy)] sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
