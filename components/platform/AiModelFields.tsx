'use client';

import { Cpu } from 'lucide-react';
import {
  ANTHROPIC_MODEL_LABELS,
  ANTHROPIC_MODEL_PRESETS,
  type AnthropicModelPreset,
} from '@/lib/bework/anthropic-models';

type AiModelFieldsProps = {
  value: AnthropicModelPreset;
  onChange: (preset: AnthropicModelPreset) => void;
};

export function AiModelFields({ value, onChange }: AiModelFieldsProps) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <Cpu size={16} className="text-[var(--bework-blue)]" aria-hidden />
        Modèle Claude (consommation de tokens)
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Haiku pour les demandes simples, Sonnet par défaut, Opus pour les dossiers exigeants.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {ANTHROPIC_MODEL_PRESETS.map((preset) => {
          const meta = ANTHROPIC_MODEL_LABELS[preset];
          const selected = value === preset;
          return (
            <label
              key={preset}
              className={`flex cursor-pointer flex-col rounded-xl border px-4 py-3 transition-colors ${
                selected
                  ? 'border-[var(--bework-blue)] bg-blue-50/80 ring-1 ring-[var(--bework-blue)]/30'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="ai_model"
                  value={preset}
                  checked={selected}
                  onChange={() => onChange(preset)}
                  className="text-[var(--bework-blue)] focus:ring-[var(--bework-blue)]"
                />
                <span className="font-medium text-slate-900">{meta.label}</span>
              </span>
              <span className="mt-1 pl-6 text-xs font-medium text-[var(--bework-blue)]">{meta.cost}</span>
              <span className="mt-0.5 pl-6 text-xs text-slate-500">{meta.hint}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
