import { promises as fs } from 'fs';
import path from 'path';
import type { BeworkRole } from '@/lib/bework/roles';
import { parseBeworkRole } from '@/lib/bework/roles';

export type LocalProfile = {
  id: string;
  email: string;
  role: BeworkRole;
  company_name: string | null;
};

const DATA_DIR = path.join(process.cwd(), '.data');
const FILE = path.join(DATA_DIR, 'profiles.json');

async function readAll(): Promise<LocalProfile[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    return JSON.parse(raw) as LocalProfile[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    return [];
  }
}

async function writeAll(profiles: LocalProfile[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(profiles, null, 2), 'utf8');
}

/** Rôle dev : email contenant +chef ou +admin, sinon beworker. */
function roleFromDevEmail(email: string): BeworkRole {
  const lower = email.toLowerCase();
  if (lower.includes('+admin') || lower.startsWith('admin@')) return 'admin';
  if (lower.includes('+chef') || lower.startsWith('chef@')) return 'chef_equipe';
  return 'beworker';
}

export async function getDevProfile(userId: string, email: string): Promise<LocalProfile> {
  const all = await readAll();
  let p = all.find((x) => x.id === userId);
  if (!p) {
    p = {
      id: userId,
      email,
      role: roleFromDevEmail(email),
      company_name: null,
    };
    all.push(p);
    await writeAll(all);
  }
  return { ...p, role: parseBeworkRole(p.role) };
}

export async function setDevProfileRole(userId: string, role: BeworkRole): Promise<void> {
  const all = await readAll();
  const i = all.findIndex((x) => x.id === userId);
  if (i >= 0) {
    all[i] = { ...all[i], role };
    await writeAll(all);
  }
}
