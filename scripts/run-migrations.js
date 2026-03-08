#!/usr/bin/env node
/**
 * Script pour exécuter les migrations Supabase
 * Nécessite DATABASE_URL dans .env.local (chaîne de connexion PostgreSQL)
 * Supabase Dashboard → Settings → Database → Connection string (URI)
 */

const fs = require('fs');
const path = require('path');

// Charger .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = val;
    }
  });
}

const DATABASE_URL =
  process.env.DATABASE_URL ||
  process.env.SUPABASE_DB_URL ||
  process.env.DIRECT_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL manquante dans .env.local');
  console.error('');
  console.error('Ajoute la chaîne de connexion PostgreSQL :');
  console.error('  Supabase Dashboard → Settings → Database → Connection string (URI)');
  console.error('');
  console.error('Exemple :');
  console.error('  DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"');
  process.exit(1);
}

async function run() {
  let pg;
  try {
    pg = require('pg');
  } catch {
    console.error('❌ Le package "pg" est requis. Lance : npm install pg');
    process.exit(1);
  }

  const client = new pg.Client({ connectionString: DATABASE_URL });

  try {
    await client.connect();
    console.log('✅ Connecté à Supabase\n');

    const migrationsDir = path.join(__dirname, '..', 'migrations');
    const files = ['create_posts_table.sql', 'create_leads_table.sql', 'setup_rls_policies.sql'];

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Fichier non trouvé : ${file}`);
        continue;
      }
      const sql = fs.readFileSync(filePath, 'utf8');
      // Ignorer les commentaires et lignes vides pour exécuter le SQL utile
      const statements = sql
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s && !s.startsWith('--'));

      for (const stmt of statements) {
        if (stmt) {
          try {
            await client.query(stmt + ';');
            console.log(`  ✓ ${file}`);
          } catch (err) {
            if (err.code === '42P07') {
              console.log(`  ⏭ ${file} (table existe déjà)`);
            } else if (err.message.includes('already exists')) {
              console.log(`  ⏭ ${file} (déjà appliqué)`);
            } else {
              throw err;
            }
          }
        }
      }
    }

    console.log('\n✅ Migrations terminées.');
  } catch (err) {
    console.error('\n❌ Erreur :', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
