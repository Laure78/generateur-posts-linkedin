import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import {
  PLATFORM_GUIDE_INTRO,
  PLATFORM_GUIDE_SECTIONS,
  type GuideSection,
} from '@/lib/bework/platform-guide';
import { BEWORK } from '@/lib/bework/config';
import { InternalUseNotice } from '@/components/brand/InternalUseNotice';

function SectionIcon({ emphasis }: { emphasis?: GuideSection['emphasis'] }) {
  if (emphasis === 'warning') {
    return <AlertTriangle size={20} className="shrink-0 text-amber-600" aria-hidden />;
  }
  if (emphasis === 'info') {
    return <Info size={20} className="shrink-0 text-[var(--bework-blue)]" aria-hidden />;
  }
  return <CheckCircle2 size={20} className="shrink-0 text-emerald-600" aria-hidden />;
}

function sectionBoxClass(emphasis?: GuideSection['emphasis']): string {
  if (emphasis === 'warning') {
    return 'border-amber-200 bg-amber-50/60';
  }
  if (emphasis === 'info') {
    return 'border-blue-100 bg-blue-50/50';
  }
  return 'border-slate-200 bg-white';
}

export function PlatformGuideContent() {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="bework-card-tech bework-card p-6 md:p-8">
        <p className="bework-kicker">{PLATFORM_GUIDE_INTRO.kicker}</p>
        <h1 className="font-display mt-2 text-2xl font-bold text-[var(--bework-navy)] md:text-3xl">
          {PLATFORM_GUIDE_INTRO.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">{PLATFORM_GUIDE_INTRO.subtitle}</p>
        <div className="mt-6">
          <InternalUseNotice variant="long" />
        </div>
      </header>

      <nav
        aria-label="Sommaire du guide"
        className="bework-card mt-6 p-5"
      >
        <p className="text-sm font-semibold text-slate-900">Sommaire</p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-[var(--bework-blue)]">
          {PLATFORM_GUIDE_SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 space-y-6">
        {PLATFORM_GUIDE_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`bework-card scroll-mt-6 border p-6 ${sectionBoxClass(section.emphasis)}`}
          >
            <div className="flex items-start gap-3">
              <SectionIcon emphasis={section.emphasis} />
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-lg font-semibold text-[var(--bework-navy)]">
                  {section.title}
                </h2>
                {section.intro && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{section.intro}</p>
                )}
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bework-blue)]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="bework-card mt-8 border border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-600">
        <p>
          <strong className="text-slate-900">Rappel :</strong> {BEWORK.internalUseShort}
        </p>
        <p className="mt-2">
          Une question sur l&apos;outil ? Contact :{' '}
          <a href={`mailto:${BEWORK.email}`} className="font-medium text-[var(--bework-blue)] hover:underline">
            {BEWORK.email}
          </a>
        </p>
      </footer>
    </article>
  );
}
