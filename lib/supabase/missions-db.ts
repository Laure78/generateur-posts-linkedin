import type { SupabaseClient } from '@supabase/supabase-js';
import {
  appendMissionMetaToBrief,
  isMissingMissionOptionsColumnError,
  type MissionOptions,
} from '@/lib/bework/mission-meta';

export type CreateMissionInput = {
  user_id: string;
  type: string;
  title: string;
  brief: string;
  chantier: string | null;
  skill_id: string;
  status: string;
  options: MissionOptions;
};

export async function insertMissionRow(
  supabase: SupabaseClient,
  input: CreateMissionInput
): Promise<{ id: string } | { error: string }> {
  const base = {
    user_id: input.user_id,
    type: input.type,
    title: input.title,
    brief: input.brief,
    chantier: input.chantier,
    skill_id: input.skill_id,
    status: input.status,
  };

  const withOptions = {
    ...base,
    output_format: input.options.output_format,
    use_skill_charter: input.options.use_skill_charter,
    ai_model: input.options.ai_model,
  };

  let { data, error } = await supabase.from('missions').insert(withOptions).select('id').single();

  if (error && isMissingMissionOptionsColumnError(error.message)) {
    const brief = appendMissionMetaToBrief(input.brief, input.options);
    ({ data, error } = await supabase
      .from('missions')
      .insert({ ...base, brief })
      .select('id')
      .single());
  }

  if (error) return { error: error.message };
  if (!data?.id) return { error: 'Création de mission impossible' };
  return { id: data.id };
}
