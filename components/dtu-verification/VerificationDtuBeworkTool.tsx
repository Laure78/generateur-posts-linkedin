'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import baseFile from '@/lib/dtu-verification/base-dtu.json';
import { analyzeDevisText } from '@/lib/dtu-verification/analyze';
import {
  devisRectifiePlainLines,
  devisRectifieToCsv,
  devisRectifieToTxt,
} from '@/lib/dtu-verification/export-devis-rectifie';
import { construireMemoExplicatif } from '@/lib/dtu-verification/memo-explicatif';
import type { DtuBaseFile, LigneAnalyse, RapportDtuPayload } from '@/lib/dtu-verification/types';
import { BEWORK } from '@/lib/bework/config';

function todayFr(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function VerificationDtuBeworkTool() {
  const dtus = useMemo(() => (baseFile as DtuBaseFile).dtus, []);
  const [raw, setRaw] = useState('');
  const [client, setClient] = useState('');
  const [projet, setProjet] = useState('');
  const [rows, setRows] = useState<LigneAnalyse[] | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [copyLibellesOk, setCopyLibellesOk] = useState(false);

  const memoParagraphs = useMemo(() => {
    if (!rows?.length) return null;
    return construireMemoExplicatif({
      client: client.trim() || 'Client non renseigné',
      projet: projet.trim() || 'Projet non renseigné',
      date: todayFr(),
      lignes: rows,
    });
  }, [rows, client, projet]);

  const run = useCallback(() => {
    setExportError(null);
    setRows(analyzeDevisText(raw, dtus));
  }, [raw, dtus]);

  const downloadDocx = useCallback(async () => {
    if (!rows || rows.length === 0) return;
    setExporting(true);
    setExportError(null);
    const payload: RapportDtuPayload = {
      client: client.trim() || 'Client non renseigné',
      projet: projet.trim() || 'Projet non renseigné',
      date: todayFr(),
      redacteur: 'BeWork',
      lignes: rows,
      memo_paragraphs:
        memoParagraphs ??
        construireMemoExplicatif({
          client: client.trim() || 'Client non renseigné',
          projet: projet.trim() || 'Projet non renseigné',
          date: todayFr(),
          lignes: rows,
        }),
    };
    try {
      const res = await fetch('/api/verification-dtu-bework/docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? 'Export impossible');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Rapport_DTU_${client.trim().replace(/\s+/g, '_') || 'export'}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setExportError(e instanceof Error ? e.message : 'Erreur export');
    } finally {
      setExporting(false);
    }
  }, [rows, client, projet, memoParagraphs]);

  const telechargerTxtDevisRectifie = useCallback(() => {
    if (!rows?.length) return;
    const slug =
      `${client.trim().replace(/\s+/g, '_').replace(/[^\wÀ-ÿ-]/gu, '') || 'export'}_${todayFr().replace(/\//g, '')}`;
    const txt = devisRectifieToTxt(rows, {
      client: client.trim() || 'Client non renseigné',
      projet: projet.trim() || 'Projet non renseigné',
      date: todayFr(),
    });
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Devis_rectifie_${slug}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [rows, client, projet]);

  const telechargerCsvDevisRectifie = useCallback(() => {
    if (!rows?.length) return;
    const slug =
      `${client.trim().replace(/\s+/g, '_').replace(/[^\wÀ-ÿ-]/gu, '') || 'export'}_${todayFr().replace(/\//g, '')}`;
    const csv = devisRectifieToCsv(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Devis_rectifie_${slug}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [rows, client]);

  const copierLibellesRectifies = useCallback(async () => {
    if (!rows?.length) return;
    setExportError(null);
    try {
      await navigator.clipboard.writeText(devisRectifiePlainLines(rows));
      setCopyLibellesOk(true);
      window.setTimeout(() => setCopyLibellesOk(false), 2500);
    } catch {
      setExportError(
        'Impossible de copier dans le presse-papiers. Utilisez le téléchargement .txt ou .csv (navigateur en HTTPS recommandé).'
      );
    }
  }, [rows]);

  return (
    <div className="space-y-10">
      <section
        className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 md:p-5"
        aria-labelledby="dtu-legal-title"
      >
        <h2 id="dtu-legal-title" className="font-display text-base font-bold text-amber-950">
          Cadre juridique (obligatoire)
        </h2>
        <p className="mt-2 leading-relaxed">
          Les DTU sont des documents normatifs diffusés par{' '}
          <a href="https://boutique.afnor.org" className="font-semibold text-[#377CF3] underline">
            AFNOR
          </a>{' '}
          et le{' '}
          <a href="https://boutique.cstb.fr" className="font-semibold text-[#377CF3] underline">
            CSTB
          </a>
          . Cet outil ne reproduit aucun extrait officiel&nbsp;: il propose une orientation et des reformulations maisons.
          Chaque point à contrôler doit être confirmé dans le document officiel payant concerné (
          <strong>article exact à confirmer dans le document officiel</strong>).
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
        <h2 className="font-display text-lg font-bold text-[#1A1A1A]">Données de rapport</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Client ou entreprise
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-[#377CF3] focus:ring-2"
              placeholder="Ex. Dupont Rénovation SARL"
              autoComplete="organization"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Intitulé de projet ou lot
            <input
              type="text"
              value={projet}
              onChange={(e) => setProjet(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-[#377CF3] focus:ring-2"
              placeholder="Ex. Lot 04 — Sols souples — Paris"
            />
          </label>
        </div>

        <label htmlFor="devis-paste" className="mt-6 block text-sm font-medium text-slate-700">
          Coller le texte du devis, DPGF ou liste de prestations (une ligne ou un libellé par ligne)
        </label>
        <textarea
          id="devis-paste"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={12}
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm text-slate-900 outline-none ring-[#377CF3] focus:ring-2"
          placeholder={'Exemple :\nFourniture et pose carrelage grès cérame 60x60 collé en salle de bain\nPeinture acrylique murs et plafonds, finition mate\nIsolation combles perdus laine minérale'}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={run}
            className="rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
          >
            Analyser les lignes
          </button>
          {rows && rows.length > 0 && (
            <button
              type="button"
              onClick={downloadDocx}
              disabled={exporting}
              className={`rounded-xl border-2 px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60 ${
                exporting ? 'border-slate-400 bg-slate-400' : 'border-[#1D4ED8] bg-[#1D4ED8]'
              }`}
            >
              {exporting ? 'Génération…' : 'Télécharger le rapport Word (charte BeWork)'}
            </button>
          )}
        </div>
        {rows && rows.length > 0 ? (
          <div className="mt-6 rounded-xl border border-slate-200 bg-[#F2F2F2] p-5">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-[#5A5A5A]">
              Obtenir le devis rectifié
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Fichiers prêts à recoller dans un tableur (.csv) ou un éditeur texte (.txt). Les prix et quantités restent à
              ressaisir depuis votre devis initial.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={telechargerTxtDevisRectifie}
                className="rounded-xl border-2 border-[#377CF3] bg-white px-5 py-2.5 text-sm font-semibold text-[#377CF3] shadow-sm hover:bg-blue-50"
              >
                Télécharger .txt (libellés rectifiés)
              </button>
              <button
                type="button"
                onClick={telechargerCsvDevisRectifie}
                className="rounded-xl border-2 border-[#377CF3] bg-white px-5 py-2.5 text-sm font-semibold text-[#377CF3] shadow-sm hover:bg-blue-50"
              >
                Télécharger .csv pour Excel (séparateur ; )
              </button>
              <button
                type="button"
                onClick={() => void copierLibellesRectifies()}
                className="rounded-xl border-2 border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-[#377CF3] hover:text-[#377CF3]"
              >
                {copyLibellesOk ? 'Libellés copiés ✓' : 'Copier les libellés rectifiés'}
              </button>
            </div>
          </div>
        ) : null}
        {exportError && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {exportError}
          </p>
        )}
      </section>

      {rows && rows.length === 0 && (
        <p className="text-center text-sm text-slate-600">
          Aucune ligne technique détectée après filtrage (totaux, TVA, générales, etc.). Collez davantage de détail
          chantier ou vérifiez le format.
        </p>
      )}

      {rows && rows.length > 0 && (
        <section aria-labelledby="dtu-results-title">
          <h2 id="dtu-results-title" className="font-display text-xl font-bold text-[#1A1A1A] md:text-2xl">
            Tableau d’analyse
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {rows.length} ligne(s) analysée(s). Défilement horizontal sur mobile si besoin.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-[900px] w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Rapprochement des lignes de devis avec un DTU probable et alertes de complétude
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-3 py-3 font-semibold text-slate-900">
                    Ligne devis
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold text-slate-900">
                    Ouvrage détecté
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold text-[#1D4ED8]">
                    DTU probable
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold text-slate-900">
                    Articles à vérifier
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold text-slate-900">
                    Confiance
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold text-slate-900">
                    Alertes complétude
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r, i) => (
                  <tr key={`${r.ligne_devis}-${i}`} className={i % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                    <td className="max-w-[220px] px-3 py-3 align-top text-slate-800">{r.ligne_devis}</td>
                    <td className="max-w-[180px] px-3 py-3 align-top text-slate-700">{r.ouvrage_detecte}</td>
                    <td className="max-w-[160px] px-3 py-3 align-top">
                      <span className="font-semibold text-[#1D4ED8]">{r.dtu_probable}</span>
                      {r.dtu_titre_court ? (
                        <span className="mt-1 block text-xs text-slate-600">{r.dtu_titre_court}</span>
                      ) : null}
                    </td>
                    <td className="max-w-[280px] px-3 py-3 align-top text-slate-700">
                      <ul className="list-disc space-y-1 pl-4">
                        {r.articles_a_verifier.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-3 py-3 align-top font-medium text-slate-900">{r.niveau_confiance}</td>
                    <td className="max-w-[260px] px-3 py-3 align-top text-xs text-slate-700">
                      {r.alertes.length === 0 ? (
                        <span className="text-slate-400">—</span>
                      ) : (
                        <ul className="list-disc space-y-1 pl-4">
                          {r.alertes.map((a) => (
                            <li key={a}>{a}</li>
                          ))}
                        </ul>
                      )}
                      {r.notes ? <p className="mt-2 text-slate-500">{r.notes}</p> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {rows && rows.length > 0 && (
        <>
          <section aria-labelledby="dtu-rectified-title">
            <h2 id="dtu-rectified-title" className="font-display text-xl font-bold text-[#1A1A1A] md:text-2xl">
              Proposition de devis rectifié (libellés)
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Chaque ligne propose un complément descriptif basé sur les alertes&nbsp;; les prix et quantités restent à
              saisir ou à recoller depuis votre tableau d’origine. Aucun texte officiel DTU repris tel quel.
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-[800px] w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  Lignes d’origine et libellés rectifiés proposés pour mémo dossier prix
                </caption>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th scope="col" className="px-3 py-3 font-semibold text-slate-900">
                      Ligne d’origine
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold text-[#1D4ED8]">
                      Libellé rectifié proposé
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold text-slate-900">
                      Synthèse des ajouts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((r, i) => (
                    <tr key={`rect-${r.ligne_devis}-${i}`} className={i % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                      <td className="max-w-[260px] px-3 py-3 align-top text-slate-800">{r.ligne_devis}</td>
                      <td className="max-w-[360px] px-3 py-3 align-top text-slate-800">{r.ligne_devis_rectifiee}</td>
                      <td className="max-w-[280px] px-3 py-3 align-top text-xs text-slate-700">
                        <ul className="list-disc space-y-1 pl-4">
                          {r.rectifications_appliquees.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {memoParagraphs && (
            <section
              aria-labelledby="dtu-memo-title"
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            >
              <h2 id="dtu-memo-title" className="font-display text-xl font-bold text-[#1A1A1A] md:text-2xl">
                Mémo explicatif
              </h2>
              <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-700 md:text-base">
                {memoParagraphs.map((para, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <footer className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
        <p>
          Intégration future : dépôt devis sur{' '}
          <a href="https://www.bework.fr" className="font-semibold text-[#377CF3] underline">
            bework.fr
          </a>{' '}
          et livrables client — ce prototype locale ne transmet aucune donnée à un tiers.
        </p>
        <p className="mt-4">
          <Link href="/plateforme" className="font-semibold text-[#377CF3] underline-offset-2 hover:underline">
            Tableau de bord
          </Link>
          {' · '}
          <a href={BEWORK.url} className="font-semibold text-[#377CF3] underline-offset-2 hover:underline">
            {BEWORK.url}
          </a>
        </p>
      </footer>
    </div>
  );
}
