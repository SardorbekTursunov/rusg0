-- 0005: Admin — foydalanuvchilarni boshqarish
-- Funksiyalar (hammasi SECURITY DEFINER + faqat admin chaqira oladi):
--   admin_list_users        → userlar ro'yxati (email bilan)
--   admin_set_role          → admin qilish / olib tashlash
--   admin_grant_achievement → yutuq berish
--   admin_reset_password    → parolni yangilash (ko'rish mumkin emas — hash)
--
-- Eslatma: parollar bcrypt hash holda saqlanadi, ko'rsatilmaydi.

create or replace function public.admin_list_users(p_limit integer default 200, p_offset integer default 0)
returns table (
  user_id uuid,
  username text,
  full_name text,
  email text,
  role text,
  total_xp integer,
  current_streak integer,
  created_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    p.id,
    p.username,
    p.full_name,
    u.email,
    p.role,
    p.total_xp,
    p.current_streak,
    p.created_at
  from public.profiles p
  join auth.users u on u.id = p.id
  where public.is_admin()
  order by p.created_at desc
  limit greatest(coalesce(p_limit, 200), 1)
  offset greatest(coalesce(p_offset, 0), 0);
$$;

create or replace function public.admin_set_role(p_user_id uuid, p_role text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Faqat admin uchun.';
  end if;
  if p_role not in ('user', 'admin') then
    raise exception 'Noto''g''ri rol.';
  end if;
  if p_user_id = auth.uid() then
    raise exception 'O''z rolingizni o''zgartira olmaysiz (o''zingizni qulflab qo''ymang).';
  end if;

  update public.profiles
     set role = p_role
   where id = p_user_id;

  if not found then
    raise exception 'Foydalanuvchi topilmadi.';
  end if;

  return jsonb_build_object('ok', true, 'user_id', p_user_id, 'role', p_role);
end;
$$;

create or replace function public.admin_grant_achievement(p_user_id uuid, p_achievement_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_xp integer;
  v_exists boolean;
begin
  if not public.is_admin() then
    raise exception 'Faqat admin uchun.';
  end if;

  select xp_reward into v_xp from public.achievements where id = p_achievement_id;
  if not found then
    raise exception 'Yutuq topilmadi.';
  end if;

  select exists(
    select 1 from public.user_achievements
     where user_id = p_user_id and achievement_id = p_achievement_id
  ) into v_exists;

  if v_exists then
    return jsonb_build_object('ok', true, 'already', true, 'xp_awarded', 0);
  end if;

  insert into public.user_achievements (user_id, achievement_id)
  values (p_user_id, p_achievement_id);

  perform public.add_xp(p_user_id, coalesce(v_xp, 0), 'achievement', 'Yutuq: ' || p_achievement_id);

  return jsonb_build_object('ok', true, 'already', false, 'xp_awarded', coalesce(v_xp, 0));
end;
$$;

create or replace function public.admin_reset_password(p_user_id uuid, p_new_password text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Faqat admin uchun.';
  end if;
  if length(p_new_password) < 6 then
    raise exception 'Parol kamida 6 ta belgi.';
  end if;
  if not exists (select 1 from auth.users where id = p_user_id) then
    raise exception 'Foydalanuvchi topilmadi.';
  end if;

  update auth.users
     set encrypted_password = crypt(p_new_password, gen_salt('bf')),
         updated_at = now()
   where id = p_user_id;

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.admin_list_users(integer, integer) from public, anon;
revoke all on function public.admin_set_role(uuid, text) from public, anon;
revoke all on function public.admin_grant_achievement(uuid, text) from public, anon;
revoke all on function public.admin_reset_password(uuid, text) from public, anon;
grant execute on function public.admin_list_users(integer, integer) to authenticated;
grant execute on function public.admin_set_role(uuid, text) to authenticated;
grant execute on function public.admin_grant_achievement(uuid, text) to authenticated;
grant execute on function public.admin_reset_password(uuid, text) to authenticated;
