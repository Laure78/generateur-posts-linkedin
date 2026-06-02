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
  created_at: string;
  updated_at: string;
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
    return JSON.parse(raw) as LocalMission[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeAll([]);
      return [];
    }
    return [];
  }
}

export async function listMissions(userId: string): Promise<LocalMission[]> {
  const all = await readAll();
  return all
    .filter((m) => m.user_id === userId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getMission(id: string, userId: string): Promise<LocalMission | null> {
  const all = await readAll();
  return all.find((m) => m.id === id && m.user_id === userId) ?? null;
}

export async function createMission(input: {
  user_id: string;
  type: string;
  skill_id: string;
  title: string;
  brief: string;
  chantier: string | null;
  status: string;
}): Promise<LocalMission> {
  const now = new Date().toISOString();
  const mission: LocalMission = {
    id: randomUUID(),
    ...input,
    ai_result: null,
    created_at: now,
    updated_at: now,
  };
  const all = await readAll();
  all.push(mission);
  await writeAll(all);
  return mission;
}

export async function updateMission(
  id: string,
  userId: string,
  patch: Partial<Pick<LocalMission, 'status' | 'ai_result'>>
): Promise<LocalMission | null> {
  const all = await readAll();
  const i = all.findIndex((m) => m.id === id && m.user_id === userId);
  if (i < 0) return null;
  all[i] = { ...all[i], ...patch, updated_at: new Date().toISOString() };
  await writeAll(all);
  return all[i];
}
