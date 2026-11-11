-- ===========================================================================
-- RusGo — 0002: kontent infratuzilmasi (A1–C2, 500 dars, 1M+ lug'at)
--
-- Bu migratsiya mavjud 0001 sxemasini buzmasdan kengaytiradi:
--   * lug'at: boy maydonlar, 40 kategoriya, normalizatsiya jadvallari
--   * darslar: CEFR daraja, maqsadlar, grammatika, o'qish/tinglash, holat
--   * mashqlar: lesson_exercises (10–20 ta / dars)
--   * SRS: SM-2 maydonlari va yangilangan review_word()
--   * import: job/error jadvallari
--   * sifat nazorati: content_reviews + status/published
--   * qidiruv: PostgreSQL FTS + trigram + RPC'lar
-- ===========================================================================

create extension if not exists pg_trgm;
create extension if not exists unaccent;

-- ---------------------------------------------------------------------------
-- 1. Lug'at: mavjud jadvalni kengaytirish
-- ---------------------------------------------------------------------------
alter table public.vocabulary
  add column if not exists entry_type text not null default 'lemma',
  add column if not exists meanings jsonb not null default '[]'::jsonb,
  add column if not exists examples jsonb not null default '[]'::jsonb,
  add column if not exists gender text,
  add column if not exists plural text,
  add column if not exists infinitive text,
  add column if not exists forms jsonb not null default '[]'::jsonb,
  add column if not exists synonyms text[] not null default '{}',
  add column if not exists antonyms text[] not null default '{}',
  add column if not exists word_family text[] not null default '{}',
  add column if not exists categories text[] not null default '{}',
  add column if not exists frequency_rank integer,
  add column if not exists difficulty smallint,
  add column if not exists source text,
  add column if not exists status text not null default 'verified',
  add column if not exists verified_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'vocabulary_entry_type_check'
  ) then
    alter table public.vocabulary
      add constraint vocabulary_entry_type_check
      check (entry_type in ('lemma', 'form', 'expression', 'collocation'));
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'vocabulary_status_check'
  ) then
    alter table public.vocabulary
      add constraint vocabulary_status_check
      check (status in ('draft', 'pending', 'verified', 'published', 'rejected'));
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'vocabulary_gender_check'
  ) then
    alter table public.vocabulary
      add constraint vocabulary_gender_check
      check (gender is null or gender in ('m', 'f', 'n'));
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- 2. 40 ta kategoriya va ko'p-kategoriyali bog'lanish
-- ---------------------------------------------------------------------------
create table if not exists public.vocabulary_categories (
  slug text primary key,
  title_uz text not null,
  title_ru text,
  description_uz text,
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists public.vocabulary_entry_categories (
  vocabulary_id text not null references public.vocabulary (id) on delete cascade,
  category_slug text not null references public.vocabulary_categories (slug) on delete cascade,
  primary key (vocabulary_id, category_slug)
);

-- Normalizatsiya: ma'no, misol va shakllar (JSON nusxalaridan tashqari,
-- analitika va kelajakdagi tahrirlash uchun alohida jadvallar).
create table if not exists public.vocabulary_meanings (
  id uuid primary key default gen_random_uuid(),
  vocabulary_id text not null references public.vocabulary (id) on delete cascade,
  meaning_index integer not null default 0,
  uz text not null,
  ru text,
  note_uz text,
  unique (vocabulary_id, meaning_index)
);

create table if not exists public.vocabulary_examples (
  id uuid primary key default gen_random_uuid(),
  vocabulary_id text not null references public.vocabulary (id) on delete cascade,
  example_index integer not null default 0,
  ru text not null,
  uz text not null,
  unique (vocabulary_id, example_index)
);

create table if not exists public.vocabulary_forms (
  id uuid primary key default gen_random_uuid(),
  vocabulary_id text not null references public.vocabulary (id) on delete cascade,
  form text not null,
  label text not null default '',
  form_index integer not null default 0,
  unique (vocabulary_id, form_index)
);

-- ---------------------------------------------------------------------------
-- 3. Darslar: CEFR, maqsadlar, o'qish/tinglash, nashr holati
-- ---------------------------------------------------------------------------
alter table public.lessons
  add column if not exists level text not null default 'A1',
  add column if not exists objectives text[] not null default '{}',
  add column if not exists grammar_topic text,
  add column if not exists grammar_explanation text,
  add column if not exists vocabulary_ids text[] not null default '{}',
  add column if not exists examples jsonb not null default '[]'::jsonb,
  add column if not exists reading_text text,
  add column if not exists reading_title text,
  add column if not exists listening_text text,
  add column if not exists prerequisites text[] not null default '{}',
  add column if not exists completion_criteria jsonb not null default '{"minScore": 70}'::jsonb,
  add column if not exists tags text[] not null default '{}',
  add column if not exists status text not null default 'published',
  add column if not exists published boolean not null default true,
  add column if not exists source text,
  add column if not exists exercise_count integer not null default 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'lessons_status_check'
  ) then
    alter table public.lessons
      add constraint lessons_status_check
      check (status in ('draft', 'pending', 'verified', 'published', 'rejected'));
  end if;
end;
$$;

-- Mashqlar (yangi nomlangan jadval; 0001 dagi `questions` legacy sifatida qoladi)
create table if not exists public.lesson_exercises (
  id text primary key,
  lesson_id text not null references public.lessons (id) on delete cascade,
  order_index integer not null default 1,
  exercise_type text not null,
  explanation_uz text not null default '',
  payload jsonb not null,
  question_text text not null default '',
  options text[],
  correct_answer jsonb,
  created_at timestamptz not null default now(),
  unique (lesson_id, order_index)
);

create table if not exists public.lesson_vocabulary (
  lesson_id text not null references public.lessons (id) on delete cascade,
  vocabulary_id text not null references public.vocabulary (id) on delete cascade,
  primary key (lesson_id, vocabulary_id)
);

-- ---------------------------------------------------------------------------
-- 4. SRS: SM-2 maydonlari + progress ko'rinishi
-- ---------------------------------------------------------------------------
alter table public.user_vocabulary
  add column if not exists ease_factor numeric(4, 2) not null default 2.50,
  add column if not exists interval_days integer not null default 0,
  add column if not exists repetitions integer not null default 0,
  add column if not exists streak integer not null default 0;

-- Top-level API uchun barqaror nom (view oddiy jadval ustida — avtomatik
-- yangilanadi; security_invoker RLS'ni saqlaydi).
create or replace view public.user_vocabulary_progress
with (security_invoker = true)
as
select
  user_id,
  vocabulary_id,
  is_favorite,
  is_learned,
  review_count,
  next_review_at,
  mastery_level,
  wrong_count,
  last_reviewed_at,
  ease_factor,
  interval_days,
  repetitions,
  streak
from public.user_vocabulary;

-- ---------------------------------------------------------------------------
-- 5. Ommaviy import: joblar va xatolar
-- ---------------------------------------------------------------------------
create table if not exists public.content_import_jobs (
  id uuid primary key default gen_random_uuid(),
  file_name text not null default '',
  format text not null default 'csv' check (format in ('csv', 'json')),
  total_rows integer not null default 0,
  processed_rows integer not null default 0,
  imported integer not null default 0,
  updated integer not null default 0,
  duplicates integer not null default 0,
  failed integer not null default 0,
  status text not null default 'queued'
    check (status in ('queued', 'running', 'completed', 'partial', 'failed')),
  default_status text not null default 'pending'
    check (default_status in ('draft', 'pending', 'verified', 'published', 'rejected')),
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists public.content_import_errors (
  id bigserial primary key,
  job_id uuid not null references public.content_import_jobs (id) on delete cascade,
  row_number integer not null default 0,
  message text not null default '',
  raw text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 6. Sifat nazorati jurnali
-- ---------------------------------------------------------------------------
create table if not exists public.content_reviews (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('vocabulary', 'lesson')),
  content_id text not null,
  from_status text,
  to_status text not null,
  reviewer_id uuid references public.profiles (id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 7. Indekslar: FTS, trigram, filtrlar
-- ---------------------------------------------------------------------------
alter table public.vocabulary
  add column if not exists search_vector tsvector
  generated always as (
    setweight(to_tsvector('russian', coalesce(russian_word, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(transliteration, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(uzbek_translation, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(topic, '')), 'C')
  ) stored;

create index if not exists vocabulary_search_idx
  on public.vocabulary using gin (search_vector);

create index if not exists vocabulary_ru_trgm_idx
  on public.vocabulary using gin (russian_word gin_trgm_ops);

create index if not exists vocabulary_uz_trgm_idx
  on public.vocabulary using gin (uzbek_translation gin_trgm_ops);

create index if not exists vocabulary_translit_trgm_idx
  on public.vocabulary using gin (transliteration gin_trgm_ops);

create index if not exists vocabulary_meta_idx
  on public.vocabulary (status, level, part_of_speech);

create index if not exists vocabulary_frequency_idx
  on public.vocabulary (frequency_rank asc nulls last);

create index if not exists vocabulary_categories_idx
  on public.vocabulary using gin (categories);

create index if not exists vocabulary_dup_idx
  on public.vocabulary (lower(russian_word), lower(part_of_speech));

create index if not exists lessons_level_status_idx
  on public.lessons (level, status, published);

create index if not exists lesson_exercises_lesson_idx
  on public.lesson_exercises (lesson_id, order_index);

create index if not exists lesson_vocabulary_vocab_idx
  on public.lesson_vocabulary (vocabulary_id);

create index if not exists user_vocabulary_due_idx
  on public.user_vocabulary (user_id, next_review_at);

create index if not exists content_import_errors_job_idx
  on public.content_import_errors (job_id, row_number);

-- ---------------------------------------------------------------------------
-- 8. RLS: o'quvchi faqat verified/published kontentni ko'radi
-- ---------------------------------------------------------------------------
alter table public.vocabulary_categories enable row level security;
alter table public.vocabulary_entry_categories enable row level security;
alter table public.vocabulary_meanings enable row level security;
alter table public.vocabulary_examples enable row level security;
alter table public.vocabulary_forms enable row level security;
alter table public.lesson_exercises enable row level security;
alter table public.lesson_vocabulary enable row level security;
alter table public.content_import_jobs enable row level security;
alter table public.content_import_errors enable row level security;
alter table public.content_reviews enable row level security;

-- Lug'at: 0001 dagi "hamma o'qiydi" siyosatini almashtiramiz.
drop policy if exists "vocabulary_read_all" on public.vocabulary;
drop policy if exists "vocabulary_read_public" on public.vocabulary;
create policy "vocabulary_read_public" on public.vocabulary
  for select using (status in ('verified', 'published') or public.is_admin());

-- Darslar: faqat nashr etilganlari ko'rinadi (admin hammasini ko'radi).
drop policy if exists "lessons_read_all" on public.lessons;
drop policy if exists "lessons_read_published" on public.lessons;
create policy "lessons_read_published" on public.lessons
  for select using (
    (status = 'published' and published = true) or public.is_admin()
  );

-- Mashqlar: dars nashr etilgan bo'lsa o'qish mumkin.
drop policy if exists "lesson_exercises_read" on public.lesson_exercises;
create policy "lesson_exercises_read" on public.lesson_exercises
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.lessons l
      where l.id = lesson_exercises.lesson_id
        and l.status = 'published'
        and l.published = true
    )
  );
drop policy if exists "lesson_exercises_admin_write" on public.lesson_exercises;
create policy "lesson_exercises_admin_write" on public.lesson_exercises
  for all using (public.is_admin()) with check (public.is_admin());

-- Kategoriyalar: hamma o'qiydi, admin yozadi.
drop policy if exists "vocabulary_categories_read" on public.vocabulary_categories;
create policy "vocabulary_categories_read" on public.vocabulary_categories
  for select using (true);
drop policy if exists "vocabulary_categories_admin" on public.vocabulary_categories;
create policy "vocabulary_categories_admin" on public.vocabulary_categories
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "vocabulary_entry_categories_read" on public.vocabulary_entry_categories;
create policy "vocabulary_entry_categories_read" on public.vocabulary_entry_categories
  for select using (true);
drop policy if exists "vocabulary_entry_categories_admin" on public.vocabulary_entry_categories;
create policy "vocabulary_entry_categories_admin" on public.vocabulary_entry_categories
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "lesson_vocabulary_read" on public.lesson_vocabulary;
create policy "lesson_vocabulary_read" on public.lesson_vocabulary
  for select using (true);
drop policy if exists "lesson_vocabulary_admin" on public.lesson_vocabulary;
create policy "lesson_vocabulary_admin" on public.lesson_vocabulary
  for all using (public.is_admin()) with check (public.is_admin());

-- Normalizatsiya jadvallari: lug'at bilan bir xil qoida.
do $$
declare
  t text;
begin
  foreach t in array array['vocabulary_meanings', 'vocabulary_examples', 'vocabulary_forms']
  loop
    execute format('drop policy if exists "%s_read" on public.%I', t, t);
    execute format(
      'create policy "%s_read" on public.%I for select using (
         exists (
           select 1 from public.vocabulary v
           where v.id = %I.vocabulary_id
             and (v.status in (''verified'', ''published'') or public.is_admin())
         )
       )', t, t, t);
    execute format('drop policy if exists "%s_admin" on public.%I', t, t);
    execute format(
      'create policy "%s_admin" on public.%I for all
       using (public.is_admin()) with check (public.is_admin())', t, t);
  end loop;
end;
$$;

-- Import va sifat nazorati: faqat admin.
do $$
declare
  t text;
begin
  foreach t in array array['content_import_jobs', 'content_import_errors', 'content_reviews']
  loop
    execute format('drop policy if exists "%s_admin" on public.%I', t, t);
    execute format(
      'create policy "%s_admin" on public.%I for all
       using (public.is_admin()) with check (public.is_admin())', t, t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- 9. Qidiruv RPC'lari (server-side pagination, filtrlar, facets)
-- ---------------------------------------------------------------------------
create or replace function public.search_vocabulary(
  p_query text default '',
  p_level text default null,
  p_category text default null,
  p_pos text default null,
  p_entry_type text default null,
  p_favorites boolean default false,
  p_learned boolean default false,
  p_sort text default 'frequency',
  p_page integer default 1,
  p_page_size integer default 24
)
returns jsonb
language plpgsql
security invoker
stable
set search_path = public
as $$
declare
  v_query text := nullif(trim(p_query), '');
  v_page integer := greatest(coalesce(p_page, 1), 1);
  v_size integer := least(greatest(coalesce(p_page_size, 24), 1), 100);
  v_offset integer := (v_page - 1) * v_size;
  v_total bigint;
  v_items jsonb;
  v_counts jsonb;
begin
  with filtered as (
    select v.*
    from public.vocabulary v
    left join public.user_vocabulary uv
      on uv.vocabulary_id = v.id and uv.user_id = auth.uid()
    where v.status in ('verified', 'published')
      and (p_level is null or v.level = p_level)
      and (p_category is null or p_category = any (v.categories))
      and (p_pos is null or v.part_of_speech = p_pos)
      and (p_entry_type is null or v.entry_type = p_entry_type)
      and (not coalesce(p_favorites, false) or coalesce(uv.is_favorite, false))
      and (not coalesce(p_learned, false) or coalesce(uv.is_learned, false))
      and (
        v_query is null
        or v.search_vector @@ websearch_to_tsquery('russian', v_query)
        or v.russian_word ilike '%' || v_query || '%'
        or v.uzbek_translation ilike '%' || v_query || '%'
        or v.transliteration ilike '%' || v_query || '%'
      )
  ),
  counts as (
    select level, count(*)::integer as n from filtered group by level
  ),
  page_rows as (
    select f.* from filtered f
    order by
      case when p_sort = 'alphabet' then f.russian_word end asc,
      case when p_sort = 'level'
        then array_position(array['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], f.level)
      end asc,
      case when p_sort = 'recent' then f.verified_at end desc nulls last,
      case when p_sort not in ('alphabet', 'level', 'recent')
        then f.frequency_rank
      end asc nulls last,
      f.russian_word asc
    limit v_size offset v_offset
  )
  select
    (select count(*) from filtered),
    coalesce((select jsonb_agg(to_jsonb(p)) from page_rows p), '[]'::jsonb),
    coalesce((select jsonb_object_agg(level, n) from counts), '{}'::jsonb)
  into v_total, v_items, v_counts;

  return jsonb_build_object(
    'items', v_items,
    'total', v_total,
    'page', v_page,
    'page_size', v_size,
    'level_counts', v_counts
  );
end;
$$;

create or replace function public.vocabulary_facets()
returns jsonb
language sql
security invoker
stable
set search_path = public
as $$
  select jsonb_build_object(
    'categories', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'slug', c.slug,
          'titleUz', c.title_uz,
          'count', coalesce(x.n, 0)
        )
        order by coalesce(x.n, 0) desc, c.title_uz
      )
      from public.vocabulary_categories c
      left join (
        select unnest(v.categories) as slug, count(*)::integer as n
        from public.vocabulary v
        where v.status in ('verified', 'published')
        group by 1
      ) x on x.slug = c.slug
    ), '[]'::jsonb),
    'parts_of_speech', coalesce((
      select jsonb_agg(
        jsonb_build_object('value', pos, 'count', n)
        order by n desc, pos
      )
      from (
        select part_of_speech as pos, count(*)::integer as n
        from public.vocabulary
        where status in ('verified', 'published')
        group by 1
      ) t
    ), '[]'::jsonb),
    'entry_types', coalesce((
      select jsonb_agg(
        jsonb_build_object('value', entry_type, 'count', n)
        order by n desc, entry_type
      )
      from (
        select entry_type, count(*)::integer as n
        from public.vocabulary
        where status in ('verified', 'published')
        group by 1
      ) t
    ), '[]'::jsonb)
  );
$$;

create or replace function public.vocabulary_suggestions(
  p_query text,
  p_limit integer default 8
)
returns jsonb
language sql
security invoker
stable
set search_path = public
as $$
  with q as (
    select trim(coalesce(p_query, '')) as term
  ),
  candidates as (
    select v.russian_word as value, 1 as priority
    from public.vocabulary v, q
    where v.status in ('verified', 'published')
      and v.russian_word ilike q.term || '%'
    union all
    select v.uzbek_translation, 2
    from public.vocabulary v, q
    where v.status in ('verified', 'published')
      and v.uzbek_translation ilike q.term || '%'
    union all
    select v.russian_word, 3
    from public.vocabulary v, q
    where v.status in ('verified', 'published')
      and v.russian_word ilike '%' || q.term || '%'
  )
  select jsonb_build_object(
    'suggestions',
    coalesce((
      select jsonb_agg(value order by priority, length(value), value)
      from (
        select distinct on (lower(value)) value, priority
        from candidates
        where value is not null and value <> ''
        order by lower(value), priority
        limit least(greatest(coalesce(p_limit, 8), 1), 20)
      ) t
    ), '[]'::jsonb)
  );
$$;

create or replace function public.export_vocabulary(
  p_query text default '',
  p_level text default null,
  p_category text default null,
  p_pos text default null,
  p_limit integer default 5000
)
returns jsonb
language sql
security invoker
stable
set search_path = public
as $$
  with filtered as (
    select v.*
    from public.vocabulary v
    where v.status in ('verified', 'published')
      and (p_level is null or v.level = p_level)
      and (p_category is null or p_category = any (v.categories))
      and (p_pos is null or v.part_of_speech = p_pos)
      and (
        nullif(trim(p_query), '') is null
        or v.russian_word ilike '%' || p_query || '%'
        or v.uzbek_translation ilike '%' || p_query || '%'
        or v.transliteration ilike '%' || p_query || '%'
      )
    order by v.frequency_rank asc nulls last, v.russian_word
    limit least(greatest(coalesce(p_limit, 5000), 1), 50000)
  )
  select jsonb_build_object(
    'items',
    coalesce((select jsonb_agg(to_jsonb(f)) from filtered f), '[]'::jsonb)
  );
$$;

-- ---------------------------------------------------------------------------
-- 10. SM-2 takrorlash (0001 dagi review_word o'rnini bosadi)
-- ---------------------------------------------------------------------------
create or replace function public.review_word(p_vocab_id text, p_correct boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_cur public.user_vocabulary%rowtype;
  v_ease numeric := 2.5;
  v_interval integer := 0;
  v_reps integer := 0;
  v_mastery integer;
  v_next timestamptz;
  v_xp integer := 0;
  v_today date := (now() at time zone 'utc')::date;
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
    v_reps := coalesce(v_cur.repetitions, 0) + 1;
    v_ease := greatest(1.3, coalesce(v_cur.ease_factor, 2.5) + 0.10);
    v_interval := case
      when v_reps <= 1 then 1
      when v_reps = 2 then 3
      else ceil(greatest(v_cur.interval_days, 1) * v_ease)::integer
    end;
    v_mastery := least(5, greatest(1, ceil(v_interval / 3.0)::integer));
  else
    v_reps := 0;
    v_ease := greatest(1.3, coalesce(v_cur.ease_factor, 2.5) - 0.20);
    v_interval := 0;
    v_mastery := greatest(0, coalesce(v_cur.mastery_level, 0) - 1);
  end if;

  v_next := case
    when v_interval = 0 then now() + interval '10 minutes'
    else now() + make_interval(days => v_interval)
  end;

  update public.user_vocabulary
     set review_count = review_count + 1,
         ease_factor = v_ease,
         interval_days = v_interval,
         repetitions = v_reps,
         streak = case when p_correct then coalesce(streak, 0) + 1 else 0 end,
         mastery_level = v_mastery,
         next_review_at = v_next,
         wrong_count = wrong_count + case when p_correct then 0 else 1 end,
         last_reviewed_at = now(),
         is_learned = case
           when p_correct and v_mastery >= 1 then true
           else is_learned
         end
   where user_id = v_user and vocabulary_id = p_vocab_id
   returning * into v_cur;

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

-- ---------------------------------------------------------------------------
-- 11. Huquqlar
-- ---------------------------------------------------------------------------
grant execute on function public.search_vocabulary(
  text, text, text, text, text, boolean, boolean, text, integer, integer
) to anon, authenticated;
grant execute on function public.vocabulary_facets() to anon, authenticated;
grant execute on function public.vocabulary_suggestions(text, integer) to anon, authenticated;
grant execute on function public.export_vocabulary(text, text, text, text, integer)
  to authenticated;

comment on function public.search_vocabulary is
  'RusGo lug''at qidiruvi: FTS + trigram, filtrlar, sahifalash, daraja kesimi.';
comment on view public.user_vocabulary_progress is
  'SM-2 progressining barqaror API ko''rinishi (RLS security_invoker bilan).';
