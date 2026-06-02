import { promises as fs } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), '.data', 'mission-outputs');

export function missionDocxPath(missionId: string): string {
  return path.join(OUTPUT_DIR, `${missionId}.docx`);
}

export async function missionDocxExists(missionId: string): Promise<boolean> {
  try {
    await fs.access(missionDocxPath(missionId));
    return true;
  } catch {
    return false;
  }
}

export async function ensureOutputDir(): Promise<void> {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}
