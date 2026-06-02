#!/usr/bin/env node
/**
 * Ouvre Supabase + copie la migration SQL dans le presse-papiers (macOS)
 */
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const PROJECT = 'hiskonqyzpkjcvdsfyho';

const sql = readFileSync(
  join(root, 'supabase/migrations/001_bework_platform.sql'),
  'utf8'
);

const urls = [
  `https://supabase.com/dashboard/project/${PROJECT}/settings/api`,
  `https://supabase.com/dashboard/project/${PROJECT}/sql/new`,
  `https://supabase.com/dashboard/project/${PROJECT}/auth/url-configuration`,
  'https://railway.com/dashboard',
];

console.log('\n🔧 Setup BeWork\n');
console.log('1. SQL migration copié dans le presse-papiers → colle dans SQL Editor → Run');
console.log('2. Onglets Supabase + Railway ouverts dans le navigateur');
console.log('3. Copie anon key + service_role : npm run env:supabase -- "<anon>" "<service_role>"\n');

try {
  execSync('pbcopy', { input: sql });
  console.log('✅ SQL dans le presse-papiers\n');
} catch {
  console.log('⚠️ pbcopy indisponible — ouvre supabase/migrations/001_bework_platform.sql\n');
}

for (const url of urls) {
  try {
    execSync(`open "${url}"`);
  } catch {
    console.log(url);
  }
}

console.log('Mode local actif : NEXT_PUBLIC_DEV_BYPASS=true dans .env.local');
console.log('Lance : npm run dev → http://localhost:3000/auth/connexion\n');
