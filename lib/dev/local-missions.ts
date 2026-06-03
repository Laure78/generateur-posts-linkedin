import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export type LocalMission = {
  id: string;
  user_id: string;
  type: string;
  skill_id: string;
  title: string;
  brief: string;
  chantier: string | null;
  status: string;
  ai_result: string | null;
  output_format: string;
  use_skill_charter: boolean;
  ai_model: string;
  created_at: string;
  updated_at: string;
  chef_validated_at: string | null;
  chef_validated_by: string | null;
  chef_validation_note: string | null;
  internal_comment: string | null;
  duplicate_of: string | null;
  ai_tokens_input: number | null;
  ai_tokens_output: number | null;
  deliverable_version: number;
};

const DATA_DIR = path.join(process.cwd(), '.data');
const FILE = path.join(DATA_DIR, 'missions.json');

async function writeAll(missions: LocalMission[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(missions, null, 2), 'utf8');
}

async function readAll(): Promise<LocalMission[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    const parsed = JSON.parse(raw) as Array<LocalMission & Partial<LocalMission>>;
    return parsed.map(normalizeMission);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeAll([]);
      return [];
    }
    return [];
  }
}

function normalizeMission(m: LocalMission & Partial<LocalMission>): LocalMission {
  return {
    ...m,
    output_format: m.output_format ?? 'docx',
    use_skill_charter: m.use_skill_charter ?? true,
    ai_model: m.ai_model ?? 'sonnet',
    chef_validated_at: m.chef_validated_at ?? null,
    chef_validated_by: m.chef_validated_by ?? null,
    chef_validation_note: m.chef_validation_note ?? null,
    internal_comment: m.internal_comment ?? null,
    duplicate_of: m.duplicate_of ?? null,
    ai_tokens_input: m.ai_tokens_input ?? null,
    ai_tokens_output: m.ai_tokens_output ?? null,
    deliverable_version: m.deliverable_version ?? 1,
    ai_result: m.ai_result ?? null,
    created_at: m.created_at ?? new Date().toISOString(),
    updated_at: m.updated_at ?? new Date().toISOString(),
  };
}

export async function listMissions(userId: string): Promise<LocalMission[]> {
  const all = await readAll();
  return all
    .filter((m) => m.user_id === userId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function listAllMissions(): Promise<LocalMission[]> {
  const all = await readAll();
  return all.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getMission(id: string, userId: string): Promise<LocalMission | null> {
  const all = await readAll();
  const found = all.find((m) => m.id === id && m.user_id === userId);
  return found ?? null;
}

export async function getMissionById(id: string): Promise<LocalMission | null> {
  const all = await readAll();
  return all.find((m) => m.id === id) ?? null;
}

export async function createMission(input: {
  user_id: string;
  type: string;
  skill_id: string;
  title: string;
  brief: string;
  chantier: string | null;
  status: string;
  output_format?: string;
  use_skill_charter?: boolean;
  ai_model?: string;
  duplicate_of?: string | null;
}): Promise<LocalMission> {
  const now = new Date().toISOString();
  const mission: LocalMission = {
    id: randomUUID(),
    ...input,
    duplicate_of: input.duplicate_of ?? null,
    output_format: input.output_format ?? 'docx',
    use_skill_charter: input.use_skill_charter ?? true,
    ai_model: input.ai_model ?? 'sonnet',
    ai_result: null,
    chef_validated_at: null,
    chef_validated_by: null,
    chef_validation_note: null,
    internal_comment: null,
    ai_tokens_input: null,
    ai_tokens_output: null,
    deliverable_version: 1,
    created_at: now,
    updated_at: now,
  };
  const all = await readAll();
  all.push(mission);
  await writeAll(all);
  return mission;
}

export type MissionPatch = Partial<
  Pick<
    LocalMission,
    | 'status'
    | 'ai_result'
    | 'brief'
    | 'chef_validated_at'
    | 'chef_validated_by'
    | 'chef_validation_note'
    | 'internal_comment'
    | 'ai_tokens_input'
    | 'ai_tokens_output'
    | 'deliverable_version'
  >
>;

export async function updateMission(
  id: string,
  userId: string | null,
  patch: MissionPatch
): Promise<LocalMission | null> {
  const all = await readAll();
  const i = all.findIndex((m) => m.id === id && (userId === null || m.user_id === userId));
  if (i < 0) return null;
  all[i] = { ...all[i], ...patch, updated_at: new Date().toISOString() };
  await writeAll(all);
  return all[i];
}

export async function updateMissionById(id: string, patch: MissionPatch): Promise<LocalMission | null> {
  return updateMission(id, null, patch);
}

export async function resetMissionForRerun(id: string, userId: string, newBrief: string): Promise<LocalMission | null> {
  const all = await readAll();
  const i = all.findIndex((m) => m.id === id && m.user_id === userId);
  if (i < 0) return null;
  all[i] = {
    ...all[i],
    brief: newBrief,
    ai_result: null,
    status: 'recue',
    chef_validated_at: null,
    chef_validated_by: null,
    chef_validation_note: null,
    deliverable_version: (all[i].deliverable_version ?? 1) + 1,
    updated_at: new Date().toISOString(),
  };
  await writeAll(all);
  return all[i];
}
