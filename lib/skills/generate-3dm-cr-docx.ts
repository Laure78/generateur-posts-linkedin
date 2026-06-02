import { execFile } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { promisify } from 'util';
import { ensureOutputDir, missionDocxPath } from './mission-output';

const execFileAsync = promisify(execFile);

const SKILL_DIR = path.join(process.cwd(), 'skills', '3dmanager-cr-chantier');
const SCRIPT = path.join(SKILL_DIR, 'scripts', 'generate_cr.py');

export async function generate3dmCrDocx(
  crData: Record<string, unknown>,
  missionId: string
): Promise<{ docxPath: string; filename: string }> {
  await ensureOutputDir();

  const operation = String(crData.operation ?? 'Chantier');
  const crNum = crData.cr_numero != null ? String(crData.cr_numero) : '';
  const safeSlug = operation
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 40);
  const filename = `CR_${safeSlug || 'chantier'}${crNum ? `_N${crNum}` : ''}.docx`;
  const docxPath = missionDocxPath(missionId);

  const tmpDir = path.join(process.cwd(), '.data', 'tmp');
  await fs.mkdir(tmpDir, { recursive: true });
  const jsonPath = path.join(tmpDir, `cr_${missionId}.json`);
  const jsonContent = JSON.stringify(crData, null, 2);
  await fs.writeFile(jsonPath, jsonContent, 'utf8');
  await fs.writeFile(
    path.join(process.cwd(), '.data', 'mission-outputs', `${missionId}.json`),
    jsonContent,
    'utf8'
  );

  try {
    await execFileAsync('python3', [SCRIPT, jsonPath, docxPath], {
      cwd: SKILL_DIR,
      timeout: 120_000,
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Génération Word impossible (python3) : ${msg}`);
  } finally {
    await fs.unlink(jsonPath).catch(() => {});
  }

  return { docxPath, filename };
}
