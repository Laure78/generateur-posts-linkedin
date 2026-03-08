-- Migration: create posts table
-- À exécuter dans Supabase SQL Editor (Dashboard → SQL Editor → New query)

CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  status text NOT NULL DEFAULT 'brouillon' CHECK (status IN ('brouillon', 'planifie', 'publie')),
  label text NOT NULL DEFAULT 'Instructif' CHECK (label IN ('Instructif', 'Inspirant', 'Storytelling', 'Conseil', 'Ressources')),
  scheduled_at timestamptz,
  published_at timestamptz,
  favorite boolean NOT NULL DEFAULT false,
  has_media boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS posts_status_idx ON public.posts (status);
CREATE INDEX IF NOT EXISTS posts_created_idx ON public.posts (created_at DESC);

-- RLS : accès uniquement via service_role (backend)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access" ON public.posts;
CREATE POLICY "Service role full access" ON public.posts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
