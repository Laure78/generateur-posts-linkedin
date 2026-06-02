-- Profil : entreprise depuis les métadonnées signup
create or replace function public.handle_new_user_bework()
returns trigger as $$
begin
  insert into public.profiles (id, email, company_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'company_name', null)
  )
  on conflict (id) do update set
    email = excluded.email,
    company_name = coalesce(excluded.company_name, public.profiles.company_name);
  return new;
end;
$$ language plpgsql security definer;
