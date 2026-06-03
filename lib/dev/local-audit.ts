import { promises as fs } from 'fs';
import path from 'path';

export type LocalAuditEntry = {
  id: string;
  mission_id: string;
  actor_id: string | null;
  action: string;
  detail?: Record<string, unknown>;
  created_at: string;
};

const FILE = path.join(process.cwd(), '.data', 'mission-audit.json');

export async function appendLocalAudit(input: {
  mission_id: string;
  actor_id: string | null;
  action: string;
  detail?: Record<string, unknown>;
}): Promise<void> {
  const { randomUUID } = await import('crypto');
  let all: LocalAuditEntry[] = [];
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    all = JSON.parse(raw) as LocalAuditEntry[];
  } catch {
    /* empty */
  }
  all.push({
    id: randomUUID(),
    ...input,
    created_at: new Date().toISOString(),
  });
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(all, null, 2), 'utf8');
}

export async function listAuditForMission(missionId: string): Promise<LocalAuditEntry[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    const all = JSON.parse(raw) as LocalAuditEntry[];
    return all.filter((e) => e.mission_id === missionId).sort((a, b) => b.created_at.localeCompare(a.created_at));
  } catch {
    return [];
  }
}
