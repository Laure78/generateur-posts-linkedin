-- Migration: create leads table
-- Paste and run this SQL in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.leads (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name varchar(255),
  email varchar(255) NOT NULL,
  phone varchar(50),
  message text,
  source varchar(100),
  created_at timestamptz NOT NULL DEFAULT now(),
  contacted boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);
