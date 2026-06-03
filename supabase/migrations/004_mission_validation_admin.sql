-- Validation chef d'équipe, commentaires, audit, coûts IA

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('client', 'beworker', 'chef_equipe', 'admin'));

alter table public.missions
  add column if not exists chef_validated_at timestamptz,
  add column if not exists chef_validated_by uuid references public.profiles(id),
  add column if not exists chef_validation_note text,
  add column if not exists internal_comment text,
  add column if not exists duplicate_of uuid references public.missions(id),
  add column if not exists ai_tokens_input int,
  add column if not exists ai_tokens_output int,
  add column if not exists deliverable_version int default 1;

create index if not exists missions_status_created_idx on public.missions(status, created_at desc);
create index if not exists missions_chef_validated_idx on public.missions(chef_validated_at) where chef_validated_at is not null;

create table if not exists public.mission_audit_log (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  action text not null,
  detail jsonb,
  created_at timestamptz default now()
);

create index if not exists mission_audit_mission_idx on public.mission_audit_log(mission_id, created_at desc);

alter table public.mission_audit_log enable row level security;

-- Lecture audit : propriétaire mission ou chef/admin
create policy "audit_select_mission_owner" on public.mission_audit_log for select
  using (
    exists (
      select 1 from public.missions m
      where m.id = mission_id and m.user_id = auth.uid()
    )
  );

create policy "audit_select_chef_admin" on public.mission_audit_log for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('chef_equipe', 'admin')
    )
  );

-- Missions : chefs/admins peuvent lire toutes les missions
drop policy if exists "missions_select_chef_admin" on public.missions;
create policy "missions_select_chef_admin" on public.missions for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('chef_equipe', 'admin')
    )
  );

drop policy if exists "missions_update_chef_admin" on public.missions;
create policy "missions_update_chef_admin" on public.missions for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('chef_equipe', 'admin')
    )
  );
