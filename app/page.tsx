import Link from 'next/link';
import Image from 'next/image';
import { BEWORK } from '@/lib/bework/config';
import { BeWorkLogo } from '@/components/brand/BeWorkLogo';
import { BeWorkFooter } from '@/components/brand/BeWorkFooter';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bework-blueprint-bg flex min-h-screen flex-col">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 lg:px-6">
          <BeWorkLogo variant="header" href="/" showTagline={false} />
          <div className="flex items-center gap-3">
            <Link href="/auth/connexion" className="bework-btn-ghost hidden sm:inline-flex">
              Connexion
            </Link>
            <Link href="/auth/inscription" className="bework-btn-primary">
              Accéder à la plateforme
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto flex-1 max-w-6xl px-4 py-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-6 lg:py-20">
        <div>
          <p className="bework-kicker">Relais administratif des marchés travaux</p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-[var(--bework-navy)] md:text-5xl">
            Le relais administratif{' '}
            <span className="bework-heading-accent">de vos marchés travaux.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Déposez vos demandes : devis, dossiers chantier, relances MOE, vérifications DTU. Nos assistants
            travaux, augmentés par l&apos;IA, préparent le travail — vous validez l&apos;essentiel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth/inscription" className="bework-btn-primary px-6 py-3">
              Créer un compte entreprise
              <ArrowRight size={18} />
            </Link>
            <Link href="/auth/connexion" className="bework-btn-secondary px-6 py-3">
              Se connecter
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">{BEWORK.brandTagline}</p>
        </div>

        <div className="relative mt-10 lg:mt-0">
          <div className="bework-card-tech bework-card overflow-hidden p-2 shadow-lg">
            <Image
              src="/images/bework-hero.png"
              alt="Plateforme BeWork — assistants travaux BTP"
              width={640}
              height={480}
              className="w-full rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white/60 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 lg:px-6">
          {[
            { icon: Zap, title: 'Déploiement rapide', desc: 'Une demande, un brief — le Beworker qualifie et traite.' },
            { icon: Shield, title: 'Supervisé depuis la France', desc: 'Relais humain + IA, pas un chatbot générique.' },
            { icon: Users, title: 'BTP & MOE', desc: 'Entreprises titulaires, conducteurs, bureaux marchés.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bework-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bework-blue-soft)]">
                <Icon className="text-[var(--bework-blue)]" size={22} />
              </div>
              <h2 className="mt-4 font-semibold text-[var(--bework-navy)]">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <BeWorkFooter />
    </div>
  );
}
