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
    title: 'Vous nous envoyez votre demande',
    description:
      'Via la plateforme MOEX : CR de chantier, analyse DCE, courrier MOA, PV de réception — un brief court suffit.',
    icon: Inbox,
  },
  {
    title: 'BeWork analyse et prépare le travail',
    description:
      "Qualification MOEX, pièces attendues et orientation vers l'assistant adapté (chantier, marché, courrier, GPA).",
    icon: UserPlus,
  },
  {
    title: "L'assistant MOEX augmenté par l'IA exécute ou pré-remplit",
    description:
      "Rédaction, relances, classement, pré-remplissage et suivi : le relais humain reste piloté, l'IA accélère tout ce qui est reproductible.",
    icon: Briefcase,
  },
  {
    title: "Vous validez uniquement l'essentiel",
    description:
      'Ce qui engage (prix, engagement, envoi sensible) passe par vous. Le reste est traité dans le cadre défini avec votre forfait.',
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
