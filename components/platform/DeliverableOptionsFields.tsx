'use client';

import {
  DELIVERABLE_FORMATS,
  DELIVERABLE_FORMAT_LABELS,
  DEFAULT_DELIVERABLE_FORMAT,
  type DeliverableFormat,
} from '@/lib/bework/deliverable-formats';
import { FileCheck2, Palette } from 'lucide-react';

type DeliverableOptionsFieldsProps = {
  outputFormat: DeliverableFormat;
  onOutputFormatChange: (format: DeliverableFormat) => void;
  useSkillCharter: boolean;
  onUseSkillCharterChange: (value: boolean) => void;
  skillName?: string;
  showCharterOption?: boolean;
};

export function DeliverableOptionsFields({
  outputFormat,
  onOutputFormatChange,
  useSkillCharter,
  onUseSkillCharterChange,
  skillName,
  showCharterOption = true,
}: DeliverableOptionsFieldsProps) {
  return (
    <div className="space-y-5 border-t border-slate-100 pt-5">
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <FileCheck2 size={16} className="text-[var(--bework-blue)]" aria-hidden />
          Format du livrable à télécharger
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {DELIVERABLE_FORMATS.map((fmt) => {
            const meta = DELIVERABLE_FORMAT_LABELS[fmt];
            const selected = outputFormat === fmt;
            return (
              <label
                key={fmt}
                className={`flex cursor-pointer flex-col rounded-xl border px-4 py-3 transition-colors ${
                  selected
                    ? 'border-[var(--bework-blue)] bg-blue-50/80 ring-1 ring-[var(--bework-blue)]/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="output_format"
                    value={fmt}
                    checked={selected}
                    onChange={() => onOutputFormatChange(fmt)}
                    className="text-[var(--bework-blue)] focus:ring-[var(--bework-blue)]"
                  />
                  <span className="font-medium text-slate-900">{meta.label}</span>
                </span>
                <span className="mt-1 pl-6 text-xs text-slate-500">{meta.hint}</span>
              </label>
            );
          })}
        </div>
      </div>

      {showCharterOption && (
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-4">
          <input
            type="checkbox"
            checked={useSkillCharter}
            onChange={(e) => onUseSkillCharterChange(e.target.checked)}
            className="mt-1 rounded border-slate-300 text-[var(--bework-blue)] focus:ring-[var(--bework-blue)]"
          />
          <span>
            <span className="flex items-center gap-2 font-medium text-slate-900">
              <Palette size={16} className="text-[var(--bework-blue)]" aria-hidden />
              Appliquer la charte du skill
            </span>
            <span className="mt-1 block text-sm text-slate-600">
              Structure, mentions et conventions du skill
              {skillName ? ` « ${skillName} »` : ''} (charte graphique, modèles, nommage des fichiers).
              Décochez pour un livrable neutre BeWork.
            </span>
          </span>
        </label>
      )}
    </div>
  );
}

export { DEFAULT_DELIVERABLE_FORMAT };
