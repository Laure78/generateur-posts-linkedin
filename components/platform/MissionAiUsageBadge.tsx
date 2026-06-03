import { estimateAiCostUsd, formatAiCostEur } from '@/lib/bework/ai-cost';
import { parseAnthropicModelPreset, type AnthropicModelPreset } from '@/lib/bework/anthropic-models';

type MissionAiUsageBadgeProps = {
  inputTokens: number | null | undefined;
  outputTokens: number | null | undefined;
  aiModel?: string | null;
};

export function MissionAiUsageBadge({ inputTokens, outputTokens, aiModel }: MissionAiUsageBadgeProps) {
  if (!inputTokens && !outputTokens) return null;
  const model = parseAnthropicModelPreset(aiModel ?? 'sonnet') as AnthropicModelPreset;
  const cost = formatAiCostEur(
    estimateAiCostUsd(model, inputTokens ?? 0, outputTokens ?? 0)
  );

  return (
    <p className="mt-2 text-xs text-slate-500">
      IA : {(inputTokens ?? 0).toLocaleString('fr-FR')} tokens entrée ·{' '}
      {(outputTokens ?? 0).toLocaleString('fr-FR')} sortie — {cost}
    </p>
  );
}
