-- Plateforme BeWork — missions clients BTP / MOE

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  company_name text,
  role text default 'client' check (role in ('client', 'beworker', 'admin')),
  credits_total int default 0,
  credits_used int default 0,
  created_at timestamptz default now()
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  skill_id text not null,
  title text not null,
  brief text not null,
  chantier text,
  status text default 'recue' check (status in ('recue', 'en_cours', 'en_attente_validation', 'terminee', 'annulee')),
  ai_result text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists missions_user_id_idx on public.missions(user_id);

alter table public.profiles enable row level security;
alter table public.missions enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

create policy "missions_all_own" on public.missions for all using (auth.uid() = user_id);

create or replace function public.handle_new_user_bework()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created_bework on auth.users;
create trigger on_auth_user_created_bework
  after insert on auth.users
  for each row execute function public.handle_new_user_bework();
