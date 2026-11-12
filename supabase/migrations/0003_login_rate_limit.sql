-- ===========================================================================
-- RusGo — login limit (QAT'IY REJIM)
-- 3 marta noto'g'ri parol → 10 daqiqa blok.
-- Har keyingi blok 2 barobar uzayadi: 10 → 20 → 40 → 60 (maksimum) daqiqa.
-- Server tomonda saqlanadi: brauzer ma'lumotlarini tozalash blokni bekitolmaydi.
-- Parollar BU JADVALDA SAQLANMAYDI (faqat email + hisoblagich).
-- ===========================================================================

create table if not exists public.login_attempts (
  email        text primary key,
  failed_count integer not null default 0,
  lock_count   integer not null default 0,
  locked_until timestamptz,
  updated_at   timestamptz not null default now()
);

alter table public.login_attempts enable row level security;

-- RLS siyosatlari ATAYLAB yo'q: jadvalga to'g'ridan-to'g'ri kirish taqiqlangan.
-- Unga faqat quyidagi SECURITY DEFINER funksiyalar orqali kiriladi.

-- ---------------------------------------------------------------------------
-- 1) Tekshirish: hisob bloklanganmi? (login oldin chaqiriladi)
-- ---------------------------------------------------------------------------
create or replace function public.check_login_allowed(p_email text)
returns table (allowed boolean, remaining_seconds integer, attempts_left integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(p_email));
  v_row   public.login_attempts%rowtype;
  v_rem   integer := 0;
begin
  select * into v_row from public.login_attempts where email = v_email;

  if found and v_row.locked_until is not null then
    v_rem := greatest(0, ceil(extract(epoch from (v_row.locked_until - now())))::integer);
    if v_rem = 0 then
      -- Blok muddati tugagan — hisoblagichni tozalaymiz
      update public.login_attempts
         set failed_count = 0, locked_until = null, updated_at = now()
       where email = v_email;
    end if;
  end if;

  return query select
    (v_rem = 0),
    v_rem,
    greatest(0, 3 - coalesce(v_row.failed_count, 0));
end;
$$;

-- ---------------------------------------------------------------------------
-- 2) Xato urinishni yozish (parol xato bo'lganda chaqiriladi)
-- ---------------------------------------------------------------------------
create or replace function public.register_login_failure(p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email    text := lower(trim(p_email));
  v_row      public.login_attempts%rowtype;
  v_lock_min integer;
begin
  insert into public.login_attempts (email) values (v_email)
    on conflict (email) do nothing;

  select * into v_row from public.login_attempts where email = v_email;

  -- Allaqachon blokda bo'lsa — hech narsa qilmaymiz (blok uzaymaydi)
  if v_row.locked_until is not null and v_row.locked_until > now() then
    return;
  end if;

  if v_row.failed_count + 1 >= 3 then
    -- 3-xato → blok: 10 daqiqa, har keyingi blok 2 barobar (maks 60)
    v_lock_min := least(60, (10 * power(2, v_row.lock_count))::integer);
    update public.login_attempts
       set failed_count  = 0,
           lock_count    = lock_count + 1,
           locked_until  = now() + make_interval(mins => v_lock_min),
           updated_at    = now()
     where email = v_email;
  else
    update public.login_attempts
       set failed_count = failed_count + 1, updated_at = now()
     where email = v_email;
  end if;

  -- Eski yozuvlarni tozalash (30 kundan ortiq qolganlari)
  delete from public.login_attempts where updated_at < now() - interval '30 days';
end;
$$;

-- ---------------------------------------------------------------------------
-- 3) Muvaffaqiyatli kirganda hisoblagichni tozalash
-- ---------------------------------------------------------------------------
create or replace function public.clear_login_failures(p_email text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.login_attempts where email = lower(trim(p_email));
$$;

-- ---------------------------------------------------------------------------
-- Ruxsatlar: faqat anon/authenticated ijro etadi, public'ga ochiq emas
-- ---------------------------------------------------------------------------
revoke execute on function public.check_login_allowed(text) from public;
revoke execute on function public.register_login_failure(text) from public;
revoke execute on function public.clear_login_failures(text) from public;

grant execute on function public.check_login_allowed(text) to anon, authenticated;
grant execute on function public.register_login_failure(text) to anon, authenticated;
grant execute on function public.clear_login_failures(text) to anon, authenticated;
