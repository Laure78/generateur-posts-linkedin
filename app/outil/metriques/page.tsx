'use client';

import { useState } from 'react';

const MOCK_STATS = {
  posts: 324,
  postsChange: 95,
  impressions: 17438,
  impressionsChange: 20,
  likes: 222,
  likesChange: 3,
  postsPerWeek: 7.4,
  postsPerWeekChange: 2.2,
  newSubscribers: 34266,
  totalImpressions: 22545719,
  impressionsTotalChange: 91,
};

/** Statistiques et outils — KPIs principaux (maquette LinkedIn) */
const STATS_KPI = {
  impressionsPosts: 12421,
  impressionsChange: 76.8,
  abonnes: 4381,
  abonnesChange: 2.4,
  vuesProfil: 329,
  vuesProfilPeriod: 'Les 90 derniers jours',
  apparitionsRecherche: 226,
  apparitionsPeriod: 'La semaine précédente',
};

const MONTHLY_DATA = [
  { month: 'Jan', value: 2100 },
  { month: 'Fév', value: 2800 },
  { month: 'Mar', value: 3200 },
  { month: 'Avr', value: 4100 },
  { month: 'Mai', value: 3800 },
  { month: 'Juin', value: 4500 },
  { month: 'Juil', value: 5200 },
  { month: 'Août', value: 4800 },
  { month: 'Sep', value: 5100 },
  { month: 'Oct', value: 4900 },
];

export default function MetriquesPage() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Métriques</h1>
        <p className="mt-1 text-neutral-600">
          Analyse toutes tes performances au même endroit.
        </p>
      </div>

      {!connected ? (
        <>
          {/* CTA Connexion */}
          <div className="mb-8 rounded-2xl border border-violet-200 bg-violet-50/50 p-8 text-center">
            <h2 className="text-xl font-bold text-neutral-900">
              Accède à tes <span className="text-violet-600">métriques</span> LinkedIn™
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-neutral-600">
              Analyse toutes tes performances au même endroit : impressions, engagement, followers gagnés, thèmes qui fonctionnent…
            </p>
            <button
              type="button"
              onClick={() => setConnected(true)}
              className="mt-6 rounded-xl bg-violet-600 px-8 py-3 text-base font-semibold text-white hover:bg-violet-700"
            >
              Se connecter à LinkedIn
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-600">
              <span className="text-emerald-600">✓</span>
              Connexion sécurisée avec l&apos;API LinkedIn
            </p>
          </div>

          {/* Aperçu démo */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 opacity-75">
            <p className="mb-4 text-sm font-medium text-neutral-500">Aperçu des métriques (exemple)</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-2xl font-bold text-neutral-900">{MOCK_STATS.posts}</p>
                <p className="text-xs text-neutral-500">Nombre de posts</p>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-2xl font-bold text-neutral-900">{MOCK_STATS.impressions.toLocaleString('fr')}</p>
                <p className="text-xs text-neutral-500">Moyenne impressions</p>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-2xl font-bold text-neutral-900">{MOCK_STATS.likes}</p>
                <p className="text-xs text-neutral-500">Moyenne likes</p>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <p className="text-2xl font-bold text-neutral-900">{MOCK_STATS.postsPerWeek}</p>
                <p className="text-xs text-neutral-500">Posts / semaine</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Dashboard connecté — Statistiques et outils */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 font-bold">
                LO
              </div>
              <div>
                <h2 className="font-semibold text-neutral-800">Statistiques et outils</h2>
                <p className="text-sm text-neutral-500">
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                ↻ Rafraîchir les posts
              </button>
              <button
                type="button"
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                title="Gestion multi-comptes"
              >
                👥
              </button>
            </div>
          </div>

          {/* Statistiques — 4 KPIs principaux */}
          <section className="mb-8">
            <h3 className="mb-4 font-semibold text-neutral-800">Statistiques</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-bold text-neutral-900">
                  {STATS_KPI.impressionsPosts.toLocaleString('fr')}
                </p>
                <p className="text-sm text-neutral-600">Impressions de posts</p>
                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <span>▲</span> +{STATS_KPI.impressionsChange}% sur les 7 derniers jours
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-bold text-neutral-900">
                  {STATS_KPI.abonnes.toLocaleString('fr')}
                </p>
                <p className="text-sm text-neutral-600">Abonnés</p>
                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <span>▲</span> +{STATS_KPI.abonnesChange}% sur les 7 derniers jours
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-bold text-neutral-900">
                  {STATS_KPI.vuesProfil.toLocaleString('fr')}
                </p>
                <p className="text-sm text-neutral-600">Vues du profil</p>
                <p className="mt-2 text-xs text-neutral-500">{STATS_KPI.vuesProfilPeriod}</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-bold text-neutral-900">
                  {STATS_KPI.apparitionsRecherche.toLocaleString('fr')}
                </p>
                <p className="text-sm text-neutral-600">Apparitions dans les recherches</p>
                <p className="mt-2 text-xs text-neutral-500">{STATS_KPI.apparitionsPeriod}</p>
              </div>
            </div>
          </section>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Reporting
              </button>
              <button
                type="button"
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
              >
                Publications
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded-lg border border-neutral-200 px-3 py-2 text-sm">
                <option>1 janv. - 31 oct. 2025</option>
              </select>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                ⬇ Exporter les stats
              </button>
            </div>
          </div>

          {/* Stats des posts */}
          <div className="mb-8">
            <h3 className="mb-4 font-semibold text-neutral-800">Statistiques des posts</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="text-2xl font-bold text-neutral-900">{MOCK_STATS.posts}</p>
                <p className="text-xs text-neutral-500">Nombre de posts</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+{MOCK_STATS.postsChange}</p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {MOCK_STATS.impressions.toLocaleString('fr')}
                </p>
                <p className="text-xs text-neutral-500">Moyenne impressions</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+{MOCK_STATS.impressionsChange}%</p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="text-2xl font-bold text-neutral-900">{MOCK_STATS.likes}</p>
                <p className="text-xs text-neutral-500">Moyenne likes</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+{MOCK_STATS.likesChange}%</p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="text-2xl font-bold text-neutral-900">{MOCK_STATS.postsPerWeek}</p>
                <p className="text-xs text-neutral-500">Posts par semaine</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+{MOCK_STATS.postsPerWeekChange}</p>
              </div>
            </div>
          </div>

          {/* Progression */}
          <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-800">Progression</h3>
              <select className="rounded-lg border border-neutral-200 px-2 py-1 text-sm">
                <option>Abonnés</option>
              </select>
            </div>
            <p className="mb-4 text-sm text-neutral-500">Nouveaux abonnés par mois</p>
            <div className="flex h-32 items-end gap-2">
              {MONTHLY_DATA.map((d, i) => (
                <div
                  key={d.month}
                  className="flex-1 rounded-t bg-violet-200 transition-opacity hover:opacity-80"
                  style={{ height: `${(d.value / 5200) * 100}%`, minHeight: 8 }}
                  title={`${d.month}: ${d.value}`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-neutral-500">
              {MONTHLY_DATA.map((d) => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>

          {/* Total cumulé */}
          <div>
            <h3 className="mb-4 font-semibold text-neutral-800">Total cumulé sur la période</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {MOCK_STATS.newSubscribers.toLocaleString('fr')}
                </p>
                <p className="text-xs text-neutral-500">Nouveaux abonnés</p>
                <p className="mt-1 text-xs text-neutral-400">0%</p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {MOCK_STATS.totalImpressions.toLocaleString('fr')}
                </p>
                <p className="text-xs text-neutral-500">Impressions</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+{MOCK_STATS.impressionsTotalChange}%</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
