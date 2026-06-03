import {
  Inbox,
  UserPlus,
  Briefcase,
  CircleCheck,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

const STEPS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Le MOEX transmet sa demande',
    description:
      'CR de chantier, analyse DCE, courrier MOA, PV de réception… La demande est confiée à BeWork (MOEX externalisé).',
    icon: Inbox,
  },
  {
    title: "L'assistant travaux qualifie la demande",
    description:
      "Via l'outil interne BeWork : type de dossier, pièces attendues, choix de l'assistant adapté (chantier, marché, courrier, GPA).",
    icon: UserPlus,
  },
  {
    title: "L'IA prépare, le Beworker vérifie",
    description:
      "Rédaction et mise en forme accélérées par l'IA. L'assistant travaux relit, corrige et valide avant transmission au MOEX.",
    icon: Briefcase,
  },
  {
    title: 'Transmission au MOEX',
    description:
      "Livrable validé renvoyé au MOEX. Ce qui engage juridiquement ou contractuellement reste sous sa responsabilité finale.",
    icon: CircleCheck,
  },
  {
    title: 'Votre activité devient plus fluide',
    description:
      'Moins de friction entre bureau et chantier : statuts visibles, pièces classées, relances qui avancent sans sacrifier le terrain.',
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
