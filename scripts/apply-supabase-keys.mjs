#!/usr/bin/env node
/**
 * Met à jour .env.local avec les clés Supabase (anon + service_role optionnel).
 * Usage : node scripts/apply-supabase-keys.mjs <anon_key> [service_role_key]
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');

const anon = process.argv[2]?.trim();
const service = process.argv[3]?.trim();

function supabaseUrlFromJwt(token) {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64url').toString('utf8')
    );
    if (payload.ref) return `https://${payload.ref}.supabase.co`;
  } catch {
    /* ignore */
  }
  return null;
}

const url = (anon && supabaseUrlFromJwt(anon)) || process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!anon) {
  console.error('Usage: node scripts/apply-supabase-keys.mjs <anon_key> [service_role_key]');
  process.exit(1);
}

if (!url) {
  console.error('❌ Impossible de déduire l’URL Supabase depuis la clé anon.');
  process.exit(1);
}

async function main() {
  console.log('Projet Supabase :', url);
  const supabase = createClient(url, anon);
  const { error } = await supabase.from('missions').select('id').limit(1);
  if (error?.message?.includes('Invalid API key')) {
    console.error('❌ Clé anon refusée par Supabase (Invalid API key). Régénère-la dans le dashboard.');
    process.exit(1);
  }
  if (error && !/relation|does not exist|schema cache/i.test(error.message)) {
    console.warn('⚠️', error.message, '— exécute la migration SQL si la table missions manque.');
  } else {
    console.log('✅ Clé anon acceptée par Supabase');
  }

  let content = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';

  function setVar(name, value) {
    const line = `${name}=${value}`;
    const re = new RegExp(`^${name}=.*$`, 'm');
    if (re.test(content)) content = content.replace(re, line);
    else content = content.trimEnd() + (content.endsWith('\n') ? '' : '\n') + line + '\n';
  }

  setVar('NEXT_PUBLIC_SUPABASE_URL', url);
  setVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', anon);
  if (service) setVar('SUPABASE_SERVICE_ROLE_KEY', service);

  writeFileSync(envPath, content);
  console.log('✅ .env.local mis à jour');
  console.log('Ensuite : npm run db:bework (si DATABASE_URL) ou colle la migration dans SQL Editor');
  console.log('Puis : NEXT_PUBLIC_DEV_BYPASS=false et DEV_BYPASS=false quand tout est OK');
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
