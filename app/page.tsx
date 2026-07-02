import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BEWORK } from '@/lib/bework/config';
import { MOEX_PLATFORM } from '@/lib/bework/moex-platform';
import { createAppPageMetadata, buildLandingSoftwareApplicationJsonLd, VITRINE_BEWORK_URL } from '@/lib/bework/seo';
import { BeWorkLogo } from '@/components/brand/BeWorkLogo';
import { BeWorkFooter } from '@/components/brand/BeWorkFooter';
import { BeWorkProcessSteps } from '@/components/brand/BeWorkProcessSteps';
import { InternalUseNotice } from '@/components/brand/InternalUseNotice';
import { JsonLd } from '@/components/JsonLd';
import { ArrowRight, ExternalLink, GraduationCap, Shield, Zap, Users } from 'lucide-react';

const LANDING_TITLE = 'BeWork — Plateforme entreprises BTP';
const LANDING_DESCRIPTION =
  "Espace BeWork pour les entreprises du BTP : déposez vos demandes (marchés publics et privés), suivez vos livrables et travaillez avec des assistants chantier augmentés par l'IA.";

export const metadata: Metadata = createAppPageMetadata({
  title: LANDING_TITLE,
  description: LANDING_DESCRIPTION,
  path: '/',
  index: true,
});

export default function HomePage() {
  return (
    <div className="bework-blueprint-bg flex min-h-screen flex-col">
      <JsonLd id="ld-software-application" schema={buildLandingSoftwareApplicationJsonLd()} />
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 lg:px-6">
          <BeWorkLogo variant="header" href="/" showTagline={false} />
          <div className="flex items-center gap-3">
            <Link href="/lexique" className="bework-btn-ghost hidden sm:inline-flex">
              <GraduationCap size={18} aria-hidden />
              Lexique BTP
            </Link>
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
          <p className="bework-kicker">Entreprises BTP · BeWork</p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-[var(--bework-navy)] md:text-5xl">
            Plateforme BeWork —{' '}
            <span className="bework-heading-accent">marchés publics &amp; privés</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {BEWORK.platformRoleLine} Connectez-vous pour déposer une demande, suivre vos livrables et
            collaborer avec des assistants travaux augmentés par l&apos;IA.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm">
              <p className="font-semibold text-[var(--bework-navy)]">{MOEX_PLATFORM.marketsPublicLabel}</p>
              <p className="mt-1 text-slate-600">{MOEX_PLATFORM.marketsPublicHint}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm">
              <p className="font-semibold text-[var(--bework-navy)]">{MOEX_PLATFORM.marketsPrivateLabel}</p>
              <p className="mt-1 text-slate-600">{MOEX_PLATFORM.marketsPrivateHint}</p>
            </div>
          </div>
          <InternalUseNotice variant="long" className="mt-6" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth/inscription" className="bework-btn-primary px-6 py-3">
              Créer un compte entreprise
              <ArrowRight size={18} />
            </Link>
            <Link href="/auth/connexion" className="bework-btn-secondary px-6 py-3">
              Se connecter
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            {BEWORK.brandTagline} —{' '}
            <a
              href={VITRINE_BEWORK_URL}
              className="inline-flex items-center gap-1 text-[var(--bework-blue)] underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              Découvrir BeWork sur laureolivie.fr
              <ExternalLink size={14} aria-hidden />
            </a>
          </p>
        </div>

        <div className="relative mt-10 lg:mt-0">
          <div className="bework-card-tech bework-card overflow-hidden p-2 shadow-lg">
            <Image
              src="/images/bework-hero.png"
              alt="Plateforme BeWork — entreprises BTP, marchés publics et privés"
              width={640}
              height={480}
              className="w-full rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <BeWorkProcessSteps />

      <section className="border-t border-slate-200/80 bg-[var(--bework-blue-soft)]/30 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <Link
            href="/lexique"
            className="bework-card-tech bework-card group flex flex-col gap-6 p-6 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="flex items-start gap-4 sm:items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--bework-blue-soft)] ring-1 ring-[var(--bework-blue)]/15">
                <GraduationCap className="text-[var(--bework-blue)]" size={28} aria-hidden />
              </span>
              <div>
                <p className="bework-kicker">Ressource gratuite</p>
                <h2 className="font-display mt-1 text-xl font-bold text-[var(--bework-navy)] sm:text-2xl">
                  Lexique &amp; apprentissage BTP
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Comprendre le vocabulaire des marchés publics et du chantier : parcours guidés avec schémas
                  (OS, DCE, acteurs…), dictionnaire de 146 termes, flashcards et quiz.
                </p>
              </div>
            </div>
            <span className="bework-btn-primary shrink-0 self-start sm:self-center">
              Ouvrir l&apos;outil
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white/60 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 lg:px-6">
          {[
            { icon: Zap, title: 'Déploiement rapide', desc: 'Une demande, un brief — qualification et traitement par votre équipe BeWork.' },
            { icon: Shield, title: 'Supervisé depuis la France', desc: 'Relais humain + IA, pas un chatbot générique.' },
            {
              icon: Users,
              title: 'Entreprises BTP',
              desc: 'PME, artisans et équipes qui répondent aux AO publics et aux marchés privés (promoteur, lots, contrats).',
            },
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
