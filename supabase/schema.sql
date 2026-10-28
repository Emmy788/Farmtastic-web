create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    username text not null check (char_length(btrim(username)) between 2 and 50),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (id, username)
    values (
        new.id,
        coalesce(nullif(btrim(new.raw_user_meta_data ->> 'username'), ''), 'farmer')
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
    before update on public.profiles
    for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
revoke all on table public.profiles from anon, authenticated;
grant select, update on table public.profiles to authenticated;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
    on public.profiles for select
    to authenticated
    using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
    on public.profiles for update
    to authenticated
    using ((select auth.uid()) = id)
    with check ((select auth.uid()) = id);

create table if not exists public.service_requests (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    service text not null check (service in (
        'farming_workshops',
        'farming_consultations',
        'organic_fertilizer',
        'veterinary_services',
        'modern_tractor_services'
    )),
    description text not null check (char_length(btrim(description)) between 20 and 2000),
    farm_location text not null check (char_length(btrim(farm_location)) between 2 and 200),
    contact_phone text check (contact_phone is null or char_length(contact_phone) <= 32),
    status text not null default 'submitted' check (status in (
        'submitted',
        'in_progress',
        'completed',
        'cancelled'
    )),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists service_requests_user_created_idx
    on public.service_requests (user_id, created_at desc);

drop trigger if exists set_service_requests_updated_at on public.service_requests;
create trigger set_service_requests_updated_at
    before update on public.service_requests
    for each row execute function public.set_updated_at();

alter table public.service_requests enable row level security;
revoke all on table public.service_requests from anon, authenticated;
grant select, insert on table public.service_requests to authenticated;

drop policy if exists "Users can view their own service requests" on public.service_requests;
create policy "Users can view their own service requests"
    on public.service_requests for select
    to authenticated
    using ((select auth.uid()) = user_id);

drop policy if exists "Users can submit their own service requests" on public.service_requests;
create policy "Users can submit their own service requests"
    on public.service_requests for insert
    to authenticated
    with check ((select auth.uid()) = user_id and status = 'submitted');
