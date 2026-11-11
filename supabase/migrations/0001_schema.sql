-- ===========================================================================
-- RusGo — 0001: sxema, RLS va RPC funksiyalar
-- Supabase SQL Editor yoki `supabase db push` orqali bajariladi.
--
-- Xavfsizlik printsipi: XP, streak, kunlik vazifalar va yutuqlar faqat
-- SECURITY DEFINER funksiyalarida hisoblanadi. Mijoz (client) ularni
-- to'g'ridan-to'g'ri o'zgartira olmaydi — RLS bunga yo'l qo'ymaydi.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. Tablitsalar
-- ---------------------------------------------------------------------------

-- Foydalanuvchi profili (auth.users bilan 1:1)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (char_length(username) between 3 and 24),
  full_name text not null default '',
  avatar_id text not null default 'av1',
  role text not null default 'user' check (role in ('user', 'admin')),
  current_level text not null default 'A1',
  total_xp integer not null default 0 check (total_xp >= 0),
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_active_date date,
  daily_goal integer not null default 30 check (daily_goal in (20, 30, 50)),
  sound_enabled boolean not null default true,
  notifications_enabled boolean not null default true,
  hearts_enabled boolean not null default true,
  onboarding jsonb,
  created_at timestamptz not null default now()
);

-- Kontent (admin boshqaradi, hamma o'qiydi)
create table if not exists public.modules (
  id text primary key,
  level text not null default 'A1',
  order_index integer not null default 1,
  title text not null,
  title_uz text not null default '',
  description text not null default ''
);

create table if not exists public.lessons (
  id text primary key,
  module_id text not null references public.modules (id) on delete cascade,
  order_index integer not null default 1,
  title text not null,
  title_ru text not null default '',
  description text not null default '',
  xp_reward integer not null default 15,
  estimated_minutes integer not null default 5
);

create table if not exists public.questions (
  id text primary key,
  lesson_id text not null references public.lessons (id) on delete cascade,
  order_index integer not null default 1,
  question_type text not null,
  explanation_uz text not null default '',
  payload jsonb not null,
  -- Quyidagi ustunlar qidiruv/monitoring uchun (asosiy ma'lumot payload ichida)
  question_text text not null default '',
  options text[],
  correct_answer integer
);

create table if not exists public.vocabulary (
  id text primary key,
  russian_word text not null,
  uzbek_translation text not null,
  transliteration text not null default '',
  part_of_speech text not null default '',
  example_ru text not null default '',
  example_uz text not null default '',
  audio_url text,
  level text not null default 'A1',
  topic text not null default ''
);

-- Gamifikatsiya definitsiyalari (SQL ichidagi mantiq uchun)
create table if not exists public.achievements (
  id text primary key,
  title text not null,
  description text not null default '',
  icon text not null default 'Trophy',
  xp_reward integer not null default 10,
  condition_type text not null,
  condition_value integer not null
);

create table if not exists public.daily_quests (
  id text primary key,
  title text not null,
  description text not null default '',
  quest_type text not null check (quest_type in ('lessons', 'words', 'reviews')),
  target_value integer not null,
  xp_reward integer not null default 20
);

-- Foydalanuvchi progressi (har biri o'z egasiga tegishli)
create table if not exists public.lesson_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id text not null references public.lessons (id) on delete cascade,
  completed boolean not null default false,
  best_score integer not null default 0,
  correct_count integer not null default 0,
  total_questions integer not null default 0,
  xp_earned integer not null default 0,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table if not exists public.xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  amount integer not null,
  source text not null check (source in ('lesson', 'perfect_bonus', 'quest', 'review', 'achievement')),
  label text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.user_daily_quests (
  user_id uuid not null references public.profiles (id) on delete cascade,
  quest_id text not null references public.daily_quests (id) on delete cascade,
  date date not null,
  progress integer not null default 0,
  completed boolean not null default false,
  primary key (user_id, quest_id, date)
);

create table if not exists public.user_vocabulary (
  user_id uuid not null references public.profiles (id) on delete cascade,
  vocabulary_id text not null references public.vocabulary (id) on delete cascade,
  is_favorite boolean not null default false,
  is_learned boolean not null default false,
  review_count integer not null default 0,
  next_review_at timestamptz,
  mastery_level integer not null default 0 check (mastery_level between 0 and 5),
  wrong_count integer not null default 0,
  last_reviewed_at timestamptz,
  primary key (user_id, vocabulary_id)
);

create table if not exists public.mistakes (
  user_id uuid not null references public.profiles (id) on delete cascade,
  question_id text not null,
  lesson_id text not null default '',
  count integer not null default 1,
  last_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.user_achievements (
  user_id uuid not null references public.profiles (id) on delete cascade,
  achievement_id text not null references public.achievements (id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

create index if not exists idx_lessons_module on public.lessons (module_id, order_index);
create index if not exists idx_questions_lesson on public.questions (lesson_id, order_index);
create index if not exists idx_xp_events_user_date on public.xp_events (user_id, created_at desc);
create index if not exists idx_lesson_progress_user on public.lesson_progress (user_id);
create index if not exists idx_user_vocabulary_review on public.user_vocabulary (user_id, next_review_at);
create index if not exists idx_mistakes_user on public.mistakes (user_id, count desc);

-- ---------------------------------------------------------------------------
-- 2. Avtomatik profil yaratish (signup trigger)
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', 'user_' || substr(new.id::text, 1, 6)),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 3. Yordamchi funksiyalar
-- ---------------------------------------------------------------------------

-- Administratormi? (RLS va admin amallari uchun)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- XP qo'shish (faqat ichki funksiyalardan chaqiriladi)
create or replace function public.add_xp(
  p_user_id uuid,
  p_amount integer,
  p_source text,
  p_label text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_amount <= 0 then
    return;
  end if;
  insert into public.xp_events (user_id, amount, source, label)
  values (p_user_id, p_amount, p_source, p_label);
  update public.profiles
     set total_xp = total_xp + p_amount
   where id = p_user_id;
end;
$$;

-- Streak yangilash (mahalliy kun bo'yicha, UTC)
create or replace function public.apply_activity(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_last date;
  v_cur integer;
  v_long integer;
  v_today date := (now() at time zone 'utc')::date;
begin
  select last_active_date, current_streak, longest_streak
    into v_last, v_cur, v_long
    from public.profiles where id = p_user_id for update;

  if v_last is null then
    -- Birinchi faoliyat
    v_cur := 1;
  elsif v_last = v_today then
    -- Bugun allaqachon faol — o'zgarmaydi
    null;
  elsif v_last = v_today - 1 then
    v_cur := v_cur + 1;
  else
    -- Streak uzildi
    v_long := greatest(v_long, v_cur);
    v_cur := 1;
  end if;

  update public.profiles
     set current_streak = v_cur,
         longest_streak = greatest(v_long, v_cur),
         last_active_date = v_today
   where id = p_user_id;
end;
$$;

-- Kunlik vazifani oshirish va tugagach XP berish
create or replace function public.bump_quest(
  p_user_id uuid,
  p_quest_type text,
  p_amount integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_date date := (now() at time zone 'utc')::date;
  q record;
  v_progress integer;
  v_completed boolean;
begin
  if p_amount <= 0 then
    return;
  end if;

  for q in select * from public.daily_quests where quest_type = p_quest_type loop
    insert into public.user_daily_quests (user_id, quest_id, date, progress, completed)
    values (p_user_id, q.id, v_date, 0, false)
    on conflict (user_id, quest_id, date) do nothing;

    select progress, completed into v_progress, v_completed
      from public.user_daily_quests
     where user_id = p_user_id and quest_id = q.id and date = v_date;

    if v_completed then
      continue;
    end if;

    v_progress := least(q.target_value, v_progress + p_amount);
    v_completed := v_progress >= q.target_value;

    update public.user_daily_quests
       set progress = v_progress, completed = v_completed
     where user_id = p_user_id and quest_id = q.id and date = v_date;

    if v_completed then
      perform public.add_xp(p_user_id, q.xp_reward, 'quest', 'Vazifa: ' || q.title);
    end if;
  end loop;
end;
$$;

-- Yutuqlarni tekshirish va ochish (shart bajarilsa). Takrorlanadi (chegarali).
create or replace function public.unlock_achievements(p_user_id uuid)
returns text[]
language plpgsql
security definer
set search_path = public
as $$
declare
  a record;
  v_value integer;
  v_stats record;
  v_unlocked text[] := '{}';
  v_xp integer;
begin
  select
    (select count(*) from public.lesson_progress where user_id = p_user_id and completed) as lessons_completed,
    (select count(*) from public.lesson_progress where user_id = p_user_id and completed and best_score = 100) as perfect_lessons,
    (select total_xp from public.profiles where id = p_user_id) as total_xp,
    (select current_streak from public.profiles where id = p_user_id) as streak,
    (select count(*) from public.user_vocabulary where user_id = p_user_id and is_learned) as words_learned
  into v_stats;

  for a in select * from public.achievements loop
    if exists (
      select 1 from public.user_achievements
       where user_id = p_user_id and achievement_id = a.id
    ) then
      continue;
    end if;

    case a.condition_type
      when 'lessons_completed' then v_value := v_stats.lessons_completed;
      when 'perfect_lessons'    then v_value := v_stats.perfect_lessons;
      when 'total_xp'           then v_value := v_stats.total_xp;
      when 'streak'             then v_value := v_stats.streak;
      when 'words_learned'      then v_value := v_stats.words_learned;
      else v_value := 0;
    end case;

    if v_value >= a.condition_value then
      insert into public.user_achievements (user_id, achievement_id)
      values (p_user_id, a.id)
      on conflict do nothing;
      v_xp := a.xp_reward;
      perform public.add_xp(p_user_id, v_xp, 'achievement', 'Yutuq: ' || a.title);
      v_unlocked := v_unlocked || a.id;
      -- XP oshgani boshqa yutuqlarni ham ochishi mumkin (qayta hisoblash)
      select
        (select total_xp from public.profiles where id = p_user_id) into v_stats.total_xp;
    end if;
  end loop;

  return v_unlocked;
end;
$$;

-- ---------------------------------------------------------------------------
-- 4. Asosiy RPC funksiyalar (XP mantiqi server tomonida)
-- ---------------------------------------------------------------------------

-- Darsni tugatish
create or replace function public.complete_lesson(
  p_lesson_id text,
  p_correct integer,
  p_total integer
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_lesson public.lessons%rowtype;
  v_prev public.lesson_progress%rowtype;
  v_already boolean := false;
  v_score integer := 0;
  v_xp integer := 0;
  v_bonus integer := 0;
  v_new text[] := '{}';
begin
  if v_user is null then
    raise exception 'Avval tizimga kiring.';
  end if;

  select * into v_lesson from public.lessons where id = p_lesson_id;
  if not found then
    raise exception 'Dars topilmadi.';
  end if;

  select * into v_prev
    from public.lesson_progress
   where user_id = v_user and lesson_id = p_lesson_id;

  v_already := coalesce(v_prev.completed, false);
  if p_total > 0 then
    v_score := round(p_correct::numeric / p_total * 100);
  end if;

  if not v_already then
    v_xp := v_lesson.xp_reward;
    if v_score = 100 then
      v_bonus := 5;
    end if;
    perform public.add_xp(v_user, v_xp, 'lesson', 'Dars: ' || v_lesson.title);
    if v_bonus > 0 then
      perform public.add_xp(v_user, v_bonus, 'perfect_bonus', 'Mukammal dars (+5)');
    end if;
  end if;

  insert into public.lesson_progress
    (user_id, lesson_id, completed, best_score, correct_count, total_questions, xp_earned, completed_at)
  values
    (v_user, p_lesson_id, true,
     greatest(coalesce(v_prev.best_score, 0), v_score),
     greatest(coalesce(v_prev.correct_count, 0), p_correct),
     p_total,
     coalesce(v_prev.xp_earned, 0) + v_xp + v_bonus,
     now())
  on conflict (user_id, lesson_id) do update
    set completed = true,
        best_score = greatest(lesson_progress.best_score, excluded.best_score),
        correct_count = greatest(lesson_progress.correct_count, excluded.correct_count),
        total_questions = excluded.total_questions,
        xp_earned = excluded.xp_earned,
        completed_at = excluded.completed_at;

  perform public.apply_activity(v_user);
  perform public.bump_quest(v_user, 'lessons', 1);
  v_new := public.unlock_achievements(v_user);

  return jsonb_build_object(
    'xp_awarded', v_xp,
    'bonus_xp', v_bonus,
    'already_completed', v_already,
    'new_achievements', to_jsonb(v_new),
    'total_xp', (select total_xp from public.profiles where id = v_user),
    'current_streak', (select current_streak from public.profiles where id = v_user)
  );
end;
$$;

-- So'zni 'o'rganildi' deb belgilash (yutuq va vazifa hisobi bilan)
create or replace function public.learn_vocab(p_vocab_id text, p_learned boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_was_learned boolean := false;
begin
  if v_user is null then
    raise exception 'Avval tizimga kiring.';
  end if;

  select is_learned into v_was_learned
    from public.user_vocabulary
   where user_id = v_user and vocabulary_id = p_vocab_id;

  insert into public.user_vocabulary (user_id, vocabulary_id, is_learned, mastery_level, next_review_at)
  values (v_user, p_vocab_id, p_learned,
          case when p_learned then 3 else 0 end,
          case when p_learned then now() + interval '1 day' else null end)
  on conflict (user_id, vocabulary_id) do update
    set is_learned = excluded.is_learned,
        mastery_level = case
          when excluded.is_learned then greatest(user_vocabulary.mastery_level, 3)
          else user_vocabulary.mastery_level
        end,
        next_review_at = coalesce(user_vocabulary.next_review_at,
          case when excluded.is_learned then now() + interval '1 day' else null end);

  if p_learned and not coalesce(v_was_learned, false) then
    perform public.bump_quest(v_user, 'words', 1);
    perform public.apply_activity(v_user);
    perform public.unlock_achievements(v_user);
  end if;

  return jsonb_build_object('ok', true);
end;
$$;

-- So'zni takrorlash (SRS: SM-2 soddalashtirilgan)
create or replace function public.review_word(p_vocab_id text, p_correct boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_cur public.user_vocabulary%rowtype;
  v_mastery integer;
  v_next timestamptz;
  v_xp integer := 0;
  v_today date := (now() at time zone 'utc')::date;
  v_intervals constant integer[] := array[0, 1, 2, 4, 7, 14];
begin
  if v_user is null then
    raise exception 'Avval tizimga kiring.';
  end if;

  select * into v_cur
    from public.user_vocabulary
   where user_id = v_user and vocabulary_id = p_vocab_id
     for update;

  if not found then
    insert into public.user_vocabulary (user_id, vocabulary_id)
    values (v_user, p_vocab_id)
    returning * into v_cur;
  end if;

  if p_correct then
    v_mastery := least(5, v_cur.mastery_level + 1);
    v_next := now() + make_interval(days => coalesce(v_intervals[v_mastery + 1], 14));
  else
    v_mastery := greatest(0, v_cur.mastery_level - 1);
    v_next := now() + interval '10 minutes';
  end if;

  update public.user_vocabulary
     set review_count = review_count + 1,
         mastery_level = v_mastery,
         next_review_at = v_next,
         wrong_count = wrong_count + case when p_correct then 0 else 1 end,
         last_reviewed_at = now(),
         is_learned = case
           when p_correct and v_mastery >= 3 then true
           else is_learned
         end
   where user_id = v_user and vocabulary_id = p_vocab_id
   returning * into v_cur;

  -- Kunlik takrorlash sessiyasi uchun XP (birinchi marta)
  if not exists (
    select 1 from public.xp_events
     where user_id = v_user and source = 'review'
       and (created_at at time zone 'utc')::date = v_today
  ) then
    v_xp := 5;
    perform public.add_xp(v_user, 5, 'review', 'Takrorlash sessiyasi');
  end if;

  perform public.bump_quest(v_user, 'reviews', 1);
  perform public.apply_activity(v_user);
  perform public.unlock_achievements(v_user);

  return jsonb_build_object(
    'xp_awarded', v_xp,
    'state', to_jsonb(v_cur)
  );
end;
$$;

-- Xato qaydini oshirish (yechim: to'g'ri javob berilganda o'chiriladi)
create or replace function public.bump_mistake(p_question_id text, p_lesson_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'Avval tizimga kiring.';
  end if;

  insert into public.mistakes (user_id, question_id, lesson_id, count, last_at, updated_at)
  values (v_user, p_question_id, coalesce(p_lesson_id, ''), 1, now(), now())
  on conflict (user_id, question_id) do update
    set count = mistakes.count + 1,
        last_at = now(),
        updated_at = now();

  return jsonb_build_object('ok', true);
end;
$$;

-- ---------------------------------------------------------------------------
-- 5. Haftalik reyting ko'rinishi
-- ---------------------------------------------------------------------------

-- Eslatma: view egalari (postgres) RLS'siz o'qiydi — bu ataylab qilingan:
-- faqat agregat reyting ma'lumotlari ommaga ochiladi (email, streak yo'q).
create or replace view public.public_leaderboard as
select
  p.id,
  p.username,
  p.avatar_id,
  p.total_xp,
  coalesce(
    (
      select sum(e.amount)::integer
        from public.xp_events e
       where e.user_id = p.id
         and e.created_at >= date_trunc('week', now())
    ),
    0
  ) as weekly_xp
from public.profiles p
where p.role <> 'admin';

-- ---------------------------------------------------------------------------
-- 6. RLS — Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.vocabulary enable row level security;
alter table public.achievements enable row level security;
alter table public.daily_quests enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.xp_events enable row level security;
alter table public.user_daily_quests enable row level security;
alter table public.user_vocabulary enable row level security;
alter table public.mistakes enable row level security;
alter table public.user_achievements enable row level security;

-- --- profiles ---
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (id = auth.uid());

-- self-update'da himoyalangan ustunlarni himoya qilish:
-- foydalanuvchi role/total_xp/streak'larni o'zgartira olmaydi.
-- Eslatma: RPC ichidagi (SECURITY DEFINER) yangilashlar current_user = postgres
-- bo'ladi — ular o'tkazib yuboriladi, faqat client tomonidan kelgan
-- o'zgarishlar (current_user = authenticated) cheklanadi.
create or replace function public.protect_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if current_user <> 'authenticated' or public.is_admin() then
    return new;
  end if;
  new.role := old.role;
  new.total_xp := old.total_xp;
  new.current_streak := old.current_streak;
  new.longest_streak := old.longest_streak;
  new.last_active_date := old.last_active_date;
  return new;
end;
$$;

drop trigger if exists protect_profile_update on public.profiles;
create trigger protect_profile_update
  before update on public.profiles
  for each row execute function public.protect_profile();

-- --- Kontent tablitsalari: o'qish hamma uchun, yozish faqat admin ---
do $$
declare
  t text;
begin
  foreach t in array array['modules', 'lessons', 'questions', 'vocabulary', 'achievements', 'daily_quests']
  loop
    execute format('drop policy if exists "%s_read_all" on public.%I', t, t);
    execute format(
      'create policy "%s_read_all" on public.%I for select using (true)', t, t);

    execute format('drop policy if exists "%s_admin_write" on public.%I', t, t);
    execute format(
      'create policy "%s_admin_write" on public.%I for all
       using (public.is_admin()) with check (public.is_admin())', t, t);
  end loop;
end;
$$;

-- --- Foydalanuvchi progressi: faqat o'z yozuvlari ---
do $$
declare
  t text;
begin
  foreach t in array array['lesson_progress', 'user_daily_quests', 'user_vocabulary', 'mistakes', 'user_achievements']
  loop
    execute format('drop policy if exists "%s_own_all" on public.%I', t, t);
    execute format(
      'create policy "%s_own_all" on public.%I for all
       using (user_id = auth.uid()) with check (user_id = auth.uid())', t, t);
  end loop;
end;
$$;

-- xp_events: faqat o'qish. Yozish faqat SECURITY DEFINER funksiyalar orqali
-- (ularning egasi — tablitsa egasi bo'lgan postgres — RLS'dan mustasno).
drop policy if exists "xp_events_select_own" on public.xp_events;
create policy "xp_events_select_own" on public.xp_events
  for select using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- 7. Avtorizatsiya: anon/authenticated rollari
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated;

grant select on public.profiles, public.modules, public.lessons, public.questions,
  public.vocabulary, public.achievements, public.daily_quests,
  public.lesson_progress, public.xp_events, public.user_daily_quests,
  public.user_vocabulary, public.mistakes, public.user_achievements,
  public.public_leaderboard to authenticated;

grant insert, update on public.profiles to authenticated;
grant insert, update on public.user_vocabulary to authenticated;
grant delete on public.mistakes to authenticated;

-- Kontent yozishlari: grant beriladi, lekin RLS faqat admin uchun o'tadi
grant insert, update, delete on public.modules, public.lessons, public.questions,
  public.vocabulary, public.achievements, public.daily_quests to authenticated;

grant select on public.profiles to anon;
grant select on public.modules, public.lessons, public.questions, public.vocabulary,
  public.achievements, public.daily_quests, public.public_leaderboard to anon;

grant execute on function
  public.is_admin(), public.complete_lesson(text, integer, integer),
  public.learn_vocab(text, boolean), public.review_word(text, boolean),
  public.bump_mistake(text, text)
to authenticated;

-- Bajarildi belgisi
insert into public.modules (id, level, order_index, title, title_uz, description)
values ('__schema_check__', 'A1', 999, 'schema', 'schema', 'migration 0001 ok')
on conflict (id) do nothing;
delete from public.modules where id = '__schema_check__';
