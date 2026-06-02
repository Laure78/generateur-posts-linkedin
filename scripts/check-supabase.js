#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Fichier .env.local introuvable');
  process.exit(1);
}

fs.readFileSync(envPath, 'utf8')
  .split('\n')
  .forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY manquant');
  process.exit(1);
}

async function main() {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(url, key);

  const { error: authErr } = await supabase.auth.getSession();
  if (authErr) console.warn('⚠️ Auth:', authErr.message);

  const { error: tableErr } = await supabase.from('missions').select('id').limit(1);
  if (tableErr) {
    console.error('❌ Table missions:', tableErr.message);
    console.error('   → Applique supabase/migrations/001_bework_platform.sql');
    process.exit(1);
  }

  console.log('✅ Supabase OK — URL:', url);
  console.log('✅ Table missions accessible');
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
