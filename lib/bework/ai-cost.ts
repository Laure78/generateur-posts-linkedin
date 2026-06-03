import type { AnthropicModelPreset } from './anthropic-models';

/** Estimation USD (ordre de grandeur, tarifs publics Anthropic 2025). */
const USD_PER_MTOK: Record<AnthropicModelPreset, { input: number; output: number }> = {
  haiku: { input: 0.25, output: 1.25 },
  sonnet: { input: 3, output: 15 },
  opus: { input: 15, output: 75 },
};

export function estimateAiCostUsd(
  model: AnthropicModelPreset,
  inputTokens: number,
  outputTokens: number
): number {
  const rates = USD_PER_MTOK[model] ?? USD_PER_MTOK.sonnet;
  return (
    (inputTokens / 1_000_000) * rates.input + (outputTokens / 1_000_000) * rates.output
  );
}

export function formatAiCostEur(usd: number): string {
  const eur = usd * 0.92;
  if (eur < 0.01) return '< 0,01 €';
  return `${eur.toFixed(2).replace('.', ',')} € (est.)`;
}
