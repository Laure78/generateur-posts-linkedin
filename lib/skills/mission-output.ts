import { promises as fs } from 'fs';
import path from 'path';
import {
  type DeliverableFormat,
  DEFAULT_DELIVERABLE_FORMAT,
  deliverableExtension,
} from '@/lib/bework/deliverable-formats';

const OUTPUT_DIR = path.join(process.cwd(), '.data', 'mission-outputs');

export function missionDeliverablePath(missionId: string, format: DeliverableFormat): string {
  return path.join(OUTPUT_DIR, `${missionId}${deliverableExtension(format)}`);
}

/** Chemin historique CR 3D Manager (toujours .docx). */
export function missionDocxPath(missionId: string): string {
  return missionDeliverablePath(missionId, 'docx');
}

export async function missionDeliverableExists(
  missionId: string,
  format: DeliverableFormat = DEFAULT_DELIVERABLE_FORMAT
): Promise<boolean> {
  try {
    await fs.access(missionDeliverablePath(missionId, format));
    return true;
  } catch {
    if (format === 'doc') {
      try {
        await fs.access(missionDeliverablePath(missionId, 'docx'));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

export async function missionDocxExists(missionId: string): Promise<boolean> {
  return missionDeliverableExists(missionId, 'docx');
}

export async function ensureOutputDir(): Promise<void> {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}
