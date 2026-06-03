/** Présélections Claude exposées dans le formulaire de demande (économie de tokens). */
export const ANTHROPIC_MODEL_PRESETS = ['haiku', 'sonnet', 'opus'] as const;

export type AnthropicModelPreset = (typeof ANTHROPIC_MODEL_PRESETS)[number];

export const DEFAULT_ANTHROPIC_MODEL_PRESET: AnthropicModelPreset = 'sonnet';

/** Identifiant API Anthropic — centralisé pour faciliter les mises à jour. */
export const ANTHROPIC_MODEL_API_IDS: Record<AnthropicModelPreset, string> = {
  haiku: 'claude-haiku-4-20250514',
  sonnet: 'claude-sonnet-4-20250514',
  opus: 'claude-opus-4-20250514',
};

export const ANTHROPIC_MODEL_LABELS: Record<
  AnthropicModelPreset,
  { label: string; hint: string; cost: string }
> = {
  haiku: {
    label: 'Claude Haiku',
    hint: 'Rapide — courriers courts, synthèses simples, relances',
    cost: 'Coût le plus bas',
  },
  sonnet: {
    label: 'Claude Sonnet',
    hint: 'Équilibre qualité / coût — CR, analyses, dossiers courants',
    cost: 'Recommandé',
  },
  opus: {
    label: 'Claude Opus',
    hint: 'Maximum de qualité — DCE complexes, comparatifs, dossiers lourds',
    cost: 'Coût le plus élevé',
  },
};

export function isAnthropicModelPreset(value: string): value is AnthropicModelPreset {
  return (ANTHROPIC_MODEL_PRESETS as readonly string[]).includes(value);
}

export function parseAnthropicModelPreset(value: unknown): AnthropicModelPreset {
  if (typeof value === 'string' && isAnthropicModelPreset(value)) return value;
  return DEFAULT_ANTHROPIC_MODEL_PRESET;
}

/** Résout l’identifiant API à partir du choix utilisateur ou de ANTHROPIC_MODEL (repli serveur). */
export function resolveAnthropicApiModel(preset?: AnthropicModelPreset | string | null): string {
  if (preset && isAnthropicModelPreset(preset)) {
    return ANTHROPIC_MODEL_API_IDS[preset];
  }
  return process.env.ANTHROPIC_MODEL || ANTHROPIC_MODEL_API_IDS[DEFAULT_ANTHROPIC_MODEL_PRESET];
}
