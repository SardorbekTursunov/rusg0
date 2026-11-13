-- 0004: O'yinlar — XP turi va natijani qayd etish
-- 1) xp_events.source ga 'game' turi qo'shiladi
-- 2) record_game_result RPC — o'yin yakunida XP beradi:
--    * 1 to'g'ri javob = 1 XP, mukammal o'yin (5+ savol, hamma to'g'ri) = +2 bonus
--    * kunlik cheklov: o'yinlardan kuniga ko'pi bilan 30 XP (bot/farm'dan himoya)
--    * streak (kunlar zanjiri) va yutuqlar tekshiruvi ham ishga tushadi

alter table public.xp_events drop constraint if exists xp_events_source_check;
alter table public.xp_events add constraint xp_events_source_check
  check (source in ('lesson', 'perfect_bonus', 'quest', 'review', 'achievement', 'game'));

create or replace function public.record_game_result(
  p_game text,
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
  v_today_xp integer := 0;
  v_base integer := 0;
  v_bonus integer := 0;
  v_xp integer := 0;
  v_cap constant integer := 30;
  v_game_label text;
begin
  if v_user is null then
    raise exception 'Avval tizimga kiring.';
  end if;

  v_game_label := case p_game
    when 'quiz' then 'Quiz rush'
    when 'memory' then 'Juftlash'
    when 'truefalse' then 'To''g''ri/Xato'
    when 'listen' then 'Tingla va top'
    when 'letters' then 'Harflarni yig'''
    else null
  end;
  if v_game_label is null then
    raise exception 'Noma''lum o''yin.';
  end if;

  if p_total > 0 then
    v_base := greatest(least(p_correct, p_total), 0);
    if p_correct = p_total and p_total >= 5 then
      v_bonus := 2; -- mukammal o'yin bonusi
    end if;
  end if;

  select coalesce(sum(amount), 0) into v_today_xp
    from public.xp_events
   where user_id = v_user
     and source = 'game'
     and created_at >= date_trunc('day', now());

  if v_today_xp >= v_cap then
    v_xp := 0;
  else
    v_xp := least(v_base + v_bonus, v_cap - v_today_xp);
  end if;

  if v_xp > 0 then
    perform public.add_xp(v_user, v_xp, 'game', 'O''yin: ' || v_game_label);
  end if;

  perform public.apply_activity(v_user);
  perform public.unlock_achievements(v_user);

  return jsonb_build_object(
    'xp_awarded', v_xp,
    'cap_reached', (v_today_xp >= v_cap),
    'total_xp', (select total_xp from public.profiles where id = v_user),
    'current_streak', (select current_streak from public.profiles where id = v_user)
  );
end;
$$;

revoke all on function public.record_game_result(text, integer, integer) from public, anon;
grant execute on function public.record_game_result(text, integer, integer) to authenticated;
