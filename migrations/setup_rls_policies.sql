-- Migration: Setup RLS policies for leads table
-- Paste and run this SQL in the Supabase SQL editor AFTER creating the table

-- Option 1: Désactiver RLS (développement uniquement - NON RECOMMANDÉ en production)
-- ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- Option 2: Activer RLS avec politiques sécurisées (RECOMMANDÉ)
-- Activer RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Allow public inserts" ON public.leads;
DROP POLICY IF EXISTS "Allow service role full access" ON public.leads;

-- Politique pour permettre l'insertion publique (formulaire de contact)
-- Les utilisateurs anonymes peuvent insérer des leads
CREATE POLICY "Allow public inserts" ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique pour permettre la lecture avec service role (admin)
-- Le service role peut tout faire (lecture, écriture, suppression)
CREATE POLICY "Allow service role full access" ON public.leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Note: Les utilisateurs authentifiés (authenticated) n'ont pas accès par défaut
-- Si vous voulez permettre l'accès aux utilisateurs authentifiés, ajoutez :
-- CREATE POLICY "Allow authenticated read" ON public.leads
--   FOR SELECT
--   TO authenticated
--   USING (true);
