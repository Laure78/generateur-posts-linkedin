#!/usr/bin/env node
/**
 * Applique supabase/migrations/001_bework_platform.sql
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

const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_bework_platform.sql');

async function run() {
  const pg = require('pg');
  const client = new pg.Client({ connectionString: DATABASE_URL });
  const sql = fs.readFileSync(sqlPath, 'utf8');
  await client.connect();
  console.log('✅ Connecté — application migration BeWork…');
  try {
    await client.query(sql);
    console.log('✅ Migration 001_bework_platform appliquée.');
  } catch (e) {
    if (e.message?.includes('already exists')) {
      console.log('⏭ Déjà appliquée (objets existants).');
    } else {
      throw e;
    }
  } finally {
    await client.end();
  }
}

run().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
