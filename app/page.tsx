import Link from 'next/link';
import { BEWORK } from '@/lib/bework/config';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="font-display text-xl font-bold">{BEWORK.name}</span>
          <div className="flex items-center gap-3">
            <Link href="/auth/connexion" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Connexion
            </Link>
            <Link
              href="/auth/inscription"
              className="rounded-lg bg-[var(--bework-blue)] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Accéder à la plateforme
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-slate-900 px-4 py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-300">Plateforme client</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Le relais administratif de vos marchés travaux
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Déposez vos demandes : devis, dossiers chantier, relances MOE, vérifications DTU. Nos assistants travaux,
            augmentés par l&apos;IA Claude, préparent le travail — vous validez l&apos;essentiel.
          </p>
          <Link
            href="/auth/inscription"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 hover:bg-slate-100"
          >
            Créer un compte entreprise
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Zap, title: 'Déploiement rapide', desc: 'Une demande, un brief — le Beworker qualifie et traite.' },
            { icon: Shield, title: 'Supervisé depuis la France', desc: 'Relais humain + IA, pas un chatbot générique.' },
            { icon: Users, title: 'BTP & MOE', desc: 'Entreprises titulaires, conducteurs, bureaux marchés.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <Icon className="text-[var(--bework-blue)]" size={28} />
              <h2 className="mt-4 font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-slate-500">
          Site vitrine :{' '}
          <a href={BEWORK.url} className="text-[var(--bework-blue)] hover:underline">
            {BEWORK.url}
          </a>
        </p>
      </section>
    </div>
  );
}
