-- Choix du modèle Claude par demande (Haiku / Sonnet / Opus)
alter table public.missions
  add column if not exists ai_model text not null default 'sonnet'
    check (ai_model in ('haiku', 'sonnet', 'opus'));
