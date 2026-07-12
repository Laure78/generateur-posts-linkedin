'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  HardHat,
  ListChecks,
} from 'lucide-react';
import {
  GROS_OEUVRE_KIT_INTRO,
  GROS_OEUVRE_PHASES,
  GROS_OEUVRE_TOOLS,
  type GrosOeuvreTool,
} from '@/lib/bework/gros-oeuvre-kit';
import { MissionIcon } from '@/lib/bework/mission-icons';
import { newDemandeUrl } from '@/lib/skills/skill-actions';

function ToolCard({ tool }: { tool: GrosOeuvreTool }) {
  const href = newDemandeUrl(tool.missionType);

  return (
    <article className="bework-card overflow-hidden border-slate-200/90 p-0">
      <div className="flex items-start gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3.5">
        <MissionIcon missionTypeId={tool.missionType} size="sm" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-sm font-bold text-[var(--bework-navy)]">{tool.title}</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{tool.covers}</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--bework-blue)]">
            {tool.whenHow}
          </p>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
          <ListChecks size={12} aria-hidden />
          Avant de lancer — Beworker
        </p>
        <ul className="mt-2 space-y-1.5">
          {tool.beworkerChecklist.map((item) => (
            <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-700">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg bg-[var(--bework-blue-soft)]/40 px-2.5 py-2 text-xs text-slate-700">
          <span className="font-semibold text-[var(--bework-navy)]">Livrable : </span>
          {tool.deliverable}
        </p>
      </div>

      <div className="border-t border-slate-100 px-4 py-3">
        <Link
          href={href}
          className="bework-btn-primary inline-flex w-full items-center justify-center gap-1.5 text-sm sm:w-auto"
        >
          Traiter cette mission
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function GrosOeuvreKitContent() {
  return (
    <div className="space-y-6">
      <div className="bework-card-tech bework-card overflow-hidden p-0">
        <div className="border-b border-slate-100 bg-[var(--bework-blue-soft)]/35 px-5 py-5 md:px-6">
          <p className="bework-kicker flex items-center gap-1.5">
            <HardHat size={12} aria-hidden />
            Outil Beworker
          </p>
          <h2 className="font-display mt-1 text-xl font-bold text-[var(--bework-navy)] md:text-2xl">
            {GROS_OEUVRE_KIT_INTRO.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            {GROS_OEUVRE_KIT_INTRO.subtitle}
          </p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-500">
            {GROS_OEUVRE_KIT_INTRO.clientExample}
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--bework-navy)]">
            {GROS_OEUVRE_KIT_INTRO.tagline}
          </p>
          <a
            href={GROS_OEUVRE_KIT_INTRO.pdfHref}
            download={GROS_OEUVRE_KIT_INTRO.pdfFilename}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--bework-blue)]/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--bework-blue)] hover:bg-[var(--bework-blue-soft)]"
          >
            <Download size={14} aria-hidden />
            Télécharger la proposition CRM Construction
          </a>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4 md:p-5">
          {GROS_OEUVRE_KIT_INTRO.method.map((step, i) => (
            <div key={step} className="rounded-xl border border-slate-200/90 bg-white px-3 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--bework-blue)]">
                Étape {i + 1}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {GROS_OEUVRE_PHASES.map((phase) => {
        const tools = GROS_OEUVRE_TOOLS.filter((t) => t.phase === phase.id);
        return (
          <section key={phase.id} className="space-y-3" aria-labelledby={`phase-${phase.id}`}>
            <div>
              <h3
                id={`phase-${phase.id}`}
                className="font-display text-base font-bold text-[var(--bework-navy)]"
              >
                {phase.label}
              </h3>
              <p className="text-sm text-slate-500">{phase.hint}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
