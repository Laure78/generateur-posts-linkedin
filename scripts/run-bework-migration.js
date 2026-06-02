#!/usr/bin/env node
/**
 * Applique les migrations supabase/migrations/*.sql (001, 002, …)
 * Nécessite DATABASE_URL dans .env.local
 */
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach((line) => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
      }
    });
}

const DATABASE_URL =
  process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || process.env.DIRECT_URL;

if (!DATABASE_URL) {
  console.error('❌ Ajoute DATABASE_URL dans .env.local');
  console.error('   Supabase → Settings → Database → Connection string (URI, mode Session)');
  process.exit(1);
}

const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

async function run() {
  const pg = require('pg');
  const client = new pg.Client({ connectionString: DATABASE_URL });
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.error('❌ Aucune migration dans supabase/migrations/');
    process.exit(1);
  }

  await client.connect();
  console.log('✅ Connecté — application des migrations BeWork…\n');

  for (const file of files) {
    const sqlPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(sqlPath, 'utf8');
    try {
      await client.query(sql);
      console.log(`✅ ${file}`);
    } catch (e) {
      if (e.message?.includes('already exists') || e.code === '42701') {
        console.log(`⏭ ${file} (déjà appliquée)`);
      } else {
        console.error(`❌ ${file}:`, e.message);
        throw e;
      }
    }
  }

  try {
    await client.query(`NOTIFY pgrst, 'reload schema';`);
    console.log('\n✅ Cache schéma PostgREST rechargé.');
  } catch {
    console.log('\n⏭ NOTIFY pgrst ignoré (rechargez le schéma dans Supabase si besoin).');
  }

  await client.end();
  console.log('\n✅ Toutes les migrations BeWork sont à jour.');
}

run().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
