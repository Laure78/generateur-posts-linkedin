import type { ReactNode } from 'react';
import {
  Calendar,
  ClipboardCheck,
  FilePen,
  HardHat,
  Lightbulb,
  Pause,
  Wrench,
} from 'lucide-react';

function Retenir({ children, icon: Icon = Lightbulb }: { children: ReactNode; icon?: typeof Lightbulb }) {
  return (
    <div className="flex gap-2 rounded-xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-bework-blue" aria-hidden />
      <p>
        <span className="font-semibold text-bework-navy">À retenir : </span>
        {children}
      </p>
    </div>
  );
}

function CarteOs({
  numero,
  titre,
  couleur,
  icone: Icone,
  children,
  retenir,
  retenirIcon,
}: {
  numero: number;
  titre: string;
  couleur: 'blue' | 'orange' | 'green';
  icone: typeof Calendar;
  children: ReactNode;
  retenir: string;
  retenirIcon?: typeof Lightbulb;
}) {
  const styles = {
    blue: {
      bande: 'bg-bework-blue',
      fond: 'bg-bework-blue-soft/60 border-bework-blue/20',
      numero: 'bg-bework-blue text-white',
    },
    orange: {
      bande: 'bg-amber-500',
      fond: 'bg-amber-50 border-amber-200',
      numero: 'bg-amber-500 text-white',
    },
    green: {
      bande: 'bg-emerald-600',
      fond: 'bg-emerald-50 border-emerald-200',
      numero: 'bg-emerald-600 text-white',
    },
  }[couleur];

  return (
    <article className={`overflow-hidden rounded-2xl border ${styles.fond}`}>
      <div className={`h-1.5 ${styles.bande}`} aria-hidden />
      <div className="p-4 sm:p-5">
        <div className="flex gap-3 sm:gap-4">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${styles.numero}`}
            aria-hidden
          >
            {numero}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <Icone className="mt-0.5 h-5 w-5 shrink-0 text-bework-navy" aria-hidden />
              <h4 className="font-display text-base font-bold text-bework-navy sm:text-lg">{titre}</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">{children}</ul>
            <div className="mt-4">
              <Retenir icon={retenirIcon}>{retenir}</Retenir>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Schéma pédagogique : les principaux ordres de service sur chantier */
export function SchemaOrdresServiceGuide() {
  return (
    <div className="space-y-4" role="img" aria-label="Schéma des principaux ordres de service sur chantier">
      {/* En-tête */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bework-blue-soft to-white px-4 py-5 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M20 60V30h8v30M36 60V20h8v40M52 60V35h8v25' fill='%232563eb'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />
        <p className="bework-kicker relative">Chantier · Administratif</p>
        <h3 className="font-display relative mt-1 text-lg font-bold text-bework-navy sm:text-xl">
          Les principaux Ordres de Service (OS)
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
          Document écrit qui donne une <strong>instruction officielle</strong> à l&apos;entreprise pendant
          l&apos;exécution du marché.
        </p>
      </div>

      <CarteOs
        numero={1}
        titre="OS de démarrage (OS n°1)"
        couleur="blue"
        icone={Calendar}
        retenir="C'est lui qui lance officiellement le délai du marché."
      >
        <li>
          <strong>Le plus important.</strong> Il fixe officiellement le point de départ du délai
          d&apos;exécution.
        </li>
        <li>
          Exemple : « Le délai de 12 mois commence à courir le 1<sup>er</sup> septembre. »
        </li>
      </CarteOs>

      <CarteOs
        numero={2}
        titre="OS de suspension / OS de reprise"
        couleur="orange"
        icone={Pause}
        retenir="Suspension = arrêt officiel · Reprise = redémarrage officiel."
        retenirIcon={Pause}
      >
        <li>Il arrête officiellement le chantier ou ordonne sa reprise.</li>
        <li>
          Utilisé en cas d&apos;intempéries graves, découverte d&apos;amiante, problème technique majeur
          ou autre blocage.
        </li>
        <li>
          Il permet de <strong>geler le décompte des jours</strong> pour éviter des pénalités de retard
          injustifiées.
        </li>
      </CarteOs>

      <CarteOs
        numero={3}
        titre="OS de travaux modificatifs"
        couleur="green"
        icone={Wrench}
        retenir="Il commande un changement ou un supplément de travaux."
        retenirIcon={ClipboardCheck}
      >
        <li>
          Il ordonne des prestations <strong>non prévues au contrat initial</strong> ou des modifications
          en cours de chantier.
        </li>
        <li>
          Il permet d&apos;exécuter le changement en attendant la régularisation par{' '}
          <strong>avenant</strong> si nécessaire.
        </li>
        <li>L&apos;entreprise doit vérifier l&apos;impact sur le <strong>prix</strong> et le{' '}
          <strong>délai</strong>.
        </li>
      </CarteOs>

      {/* Réflexe entreprise */}
      <div className="rounded-2xl bg-bework-navy px-4 py-5 text-white sm:px-6">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-bework-blue-bright" aria-hidden />
          <h4 className="font-display text-base font-bold">Réflexe entreprise</h4>
        </div>
        <ul className="mt-4 space-y-2.5 text-sm">
          {[
            'Vérifier qui a émis l\'OS',
            'Vérifier la date et le numéro',
            'Contrôler l\'impact sur le délai',
            'Contrôler l\'impact sur le prix',
            'Émettre des observations écrites si nécessaire',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-400" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Règle d'or */}
      <div className="flex items-start gap-3 rounded-2xl bg-bework-blue px-4 py-4 text-white sm:items-center sm:px-5">
        <div className="flex shrink-0 gap-1">
          <FilePen className="h-5 w-5 opacity-90" aria-hidden />
          <HardHat className="h-5 w-5 opacity-90" aria-hidden />
        </div>
        <p className="text-sm font-medium leading-snug sm:text-base">
          Un OS ne se traite <strong>jamais à l&apos;oral</strong>. Il doit être lu, enregistré et géré
          par écrit.
        </p>
      </div>
    </div>
  );
}
