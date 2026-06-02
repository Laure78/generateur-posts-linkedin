import { readFileSync, existsSync } from 'fs';
import path from 'path';

const SKILLS_DIR = path.join(process.cwd(), 'skills');

function stripFrontmatter(markdown: string): string {
  if (!markdown.startsWith('---')) return markdown.trim();
  const end = markdown.indexOf('---', 3);
  if (end === -1) return markdown.trim();
  return markdown.slice(end + 3).trim();
}

export function loadSkillPrompt(skillId: string): string | null {
  const file = path.join(SKILLS_DIR, skillId, 'SKILL.md');
  if (!existsSync(file)) return null;
  try {
    const body = stripFrontmatter(readFileSync(file, 'utf8'));
    const max = 48_000;
    return body.length > max ? `${body.slice(0, max)}\n\n[… skill tronqué]` : body;
  } catch {
    return null;
  }
}
