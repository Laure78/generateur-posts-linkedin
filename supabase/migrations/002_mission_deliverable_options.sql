-- Options livrable : format fichier + application charte skill

alter table public.missions
  add column if not exists output_format text not null default 'docx'
    check (output_format in ('docx', 'doc', 'pdf', 'xls', 'pptx'));

alter table public.missions
  add column if not exists use_skill_charter boolean not null default true;
