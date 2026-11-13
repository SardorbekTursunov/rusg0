-- RusGo seed 14-bo'lak (avtomatik bo'lingan)
begin;

insert into public.vocabulary_meanings (vocabulary_id, meaning_index, uz, note_uz) values ('v-380', 0, 'konnotatsiya', null) on conflict (vocabulary_id, meaning_index) do update set uz = excluded.uz, note_uz = excluded.note_uz;

insert into public.vocabulary_examples (vocabulary_id, example_index, ru, uz) values ('v-380', 0, 'У слова есть скрытая коннотация.', 'So''zning yashirin konnotatsiyasi bor.') on conflict (vocabulary_id, example_index) do update set ru = excluded.ru, uz = excluded.uz;

insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values ('v-381', 'science') on conflict do nothing;

insert into public.vocabulary_meanings (vocabulary_id, meaning_index, uz, note_uz) values ('v-381', 0, 'implikatsiya', null) on conflict (vocabulary_id, meaning_index) do update set uz = excluded.uz, note_uz = excluded.note_uz;

insert into public.vocabulary_examples (vocabulary_id, example_index, ru, uz) values ('v-381', 0, 'Импликация требует логического вывода.', 'Implikatsiya mantiqiy xulosa talab qiladi.') on conflict (vocabulary_id, example_index) do update set ru = excluded.ru, uz = excluded.uz;

insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values ('v-382', 'art') on conflict do nothing;

insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values ('v-382', 'emotions') on conflict do nothing;

insert into public.vocabulary_meanings (vocabulary_id, meaning_index, uz, note_uz) values ('v-382', 0, 'ekspressiya', null) on conflict (vocabulary_id, meaning_index) do update set uz = excluded.uz, note_uz = excluded.note_uz;

insert into public.vocabulary_examples (vocabulary_id, example_index, ru, uz) values ('v-382', 0, 'Его речь полна экспрессии.', 'Uning nutqi ekspressiyaga to''la.') on conflict (vocabulary_id, example_index) do update set ru = excluded.ru, uz = excluded.uz;

insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values ('v-383', 'communication') on conflict do nothing;

insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values ('v-383', 'literature') on conflict do nothing;

insert into public.vocabulary_meanings (vocabulary_id, meaning_index, uz, note_uz) values ('v-383', 0, 'qisqa va lo''nda', null) on conflict (vocabulary_id, meaning_index) do update set uz = excluded.uz, note_uz = excluded.note_uz;

insert into public.vocabulary_examples (vocabulary_id, example_index, ru, uz) values ('v-383', 0, 'Лаконичный ответ звучал уверенно.', 'Qisqa va lo''nda javob ishonchli yangradi.') on conflict (vocabulary_id, example_index) do update set ru = excluded.ru, uz = excluded.uz;

insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values ('v-384', 'literature') on conflict do nothing;

insert into public.vocabulary_entry_categories (vocabulary_id, category_slug) values ('v-384', 'communication') on conflict do nothing;

insert into public.vocabulary_meanings (vocabulary_id, meaning_index, uz, note_uz) values ('v-384', 0, 'burma-burma', null) on conflict (vocabulary_id, meaning_index) do update set uz = excluded.uz, note_uz = excluded.note_uz;

insert into public.vocabulary_examples (vocabulary_id, example_index, ru, uz) values ('v-384', 0, 'Витиеватый слог трудно читать.', 'Burma-burma uslubni o''qish qiyin.') on conflict (vocabulary_id, example_index) do update set ru = excluded.ru, uz = excluded.uz;

-- Dars ↔ lug'at bog'lanishlari
insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l1', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l1', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l1', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l2', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l2', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l2', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l3', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l3', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l3', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l3', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l3', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l3', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l4', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l4', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l4', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l4', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l5', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l5', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l5', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l5', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m1-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l1', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l1', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l1', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l1', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l2', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l2', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l2', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l2', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l3', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l3', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l3', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l3', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l3', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l3', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l4', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l4', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l4', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l4', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l4', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l4', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l5', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l5', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l5', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l5', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l5', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m2-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l1', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l1', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l1', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l1', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l1', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l1', 'v-019') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l2', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l2', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l2', 'v-023') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l2', 'v-017') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l2', 'v-016') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l2', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l3', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l3', 'v-022') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l3', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l3', 'v-024') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l3', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l3', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l4', 'v-016') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l4', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l4', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l4', 'v-019') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l4', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l4', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l5', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l5', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l5', 'v-020') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l5', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l5', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m3-l5', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l1', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l1', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l1', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l1', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l1', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l1', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l2', 'v-011') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l2', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l2', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l2', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l2', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l2', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l3', 'v-011') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l3', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l3', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l3', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l3', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l3', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l4', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l4', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l4', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l4', 'v-011') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l4', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l4', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l5', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l5', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l5', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l5', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l5', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m4-l5', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l1', 'v-150') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l1', 'v-153') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l1', 'v-151') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l1', 'v-133') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l1', 'v-142') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l1', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l2', 'v-151') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l2', 'v-133') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l2', 'v-146') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l2', 'v-154') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l2', 'v-137') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l2', 'v-139') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l3', 'v-140') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l3', 'v-144') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l3', 'v-139') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l3', 'v-142') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l3', 'v-143') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l3', 'v-150') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l4', 'v-134') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l4', 'v-140') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l4', 'v-149') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l4', 'v-147') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l4', 'v-138') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l4', 'v-153') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l5', 'v-133') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l5', 'v-139') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l5', 'v-151') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l5', 'v-149') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l5', 'v-134') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m5-l5', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l1', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l1', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l1', 'v-016') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l1', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l1', 'v-020') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l1', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l1', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l1', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l2', 'v-020') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l2', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l2', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l2', 'v-015') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l2', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l2', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l2', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l2', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l3', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l3', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l3', 'v-015') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l3', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l3', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l3', 'v-218') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l3', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l3', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l4', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l4', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l4', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l4', 'v-014') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l4', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l4', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l4', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l4', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l5', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l5', 'v-020') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l5', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l5', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l5', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l5', 'v-011') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l5', 'v-017') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m6-l5', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l1', 'v-014') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l1', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l1', 'v-017') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l1', 'v-160') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l1', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l1', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l1', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l1', 'v-020') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l2', 'v-217') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l2', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l2', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l2', 'v-019') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l2', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l2', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l2', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l2', 'v-160') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l3', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l3', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l3', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l3', 'v-014') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l3', 'v-217') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l3', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l3', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l3', 'v-218') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l4', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l4', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l4', 'v-160') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l4', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l4', 'v-015') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l4', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l4', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l4', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l5', 'v-016') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l5', 'v-216') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l5', 'v-014') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l5', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l5', 'v-019') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l5', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l5', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m7-l5', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l1', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l1', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l1', 'v-122') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l1', 'v-130') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l1', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l1', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l1', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l1', 'v-124') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l2', 'v-130') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l2', 'v-121') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l2', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l2', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l2', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l2', 'v-015') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l2', 'v-122') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l2', 'v-129') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l3', 'v-126') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l3', 'v-130') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l3', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l3', 'v-015') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l3', 'v-129') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l3', 'v-017') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l3', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l3', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l4', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l4', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l4', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l4', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l4', 'v-130') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l4', 'v-121') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l4', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l4', 'v-128') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l5', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l5', 'v-016') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l5', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l5', 'v-122') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l5', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l5', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l5', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m8-l5', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l1', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l1', 'v-133') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l1', 'v-135') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l1', 'v-137') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l1', 'v-139') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l1', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l1', 'v-149') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l1', 'v-138') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l2', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l2', 'v-145') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l2', 'v-137') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l2', 'v-154') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l2', 'v-141') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l2', 'v-140') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l2', 'v-152') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l2', 'v-136') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l3', 'v-145') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l3', 'v-141') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l3', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l3', 'v-134') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l3', 'v-139') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l3', 'v-153') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l3', 'v-143') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l3', 'v-142') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l4', 'v-143') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l4', 'v-154') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l4', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l4', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l4', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l4', 'v-145') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l4', 'v-141') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l4', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l5', 'v-153') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l5', 'v-139') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l5', 'v-138') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l5', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l5', 'v-136') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l5', 'v-144') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l5', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m9-l5', 'v-132') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l1', 'v-143') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l1', 'v-140') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l1', 'v-152') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l1', 'v-148') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l1', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l1', 'v-134') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l1', 'v-135') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l1', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l2', 'v-139') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l2', 'v-148') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l2', 'v-145') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l2', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l2', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l2', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l2', 'v-154') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l2', 'v-146') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l3', 'v-153') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l3', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l3', 'v-146') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l3', 'v-135') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l3', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l3', 'v-138') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l3', 'v-148') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l3', 'v-147') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l4', 'v-154') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l4', 'v-153') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l4', 'v-151') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l4', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l4', 'v-143') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l4', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l4', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l4', 'v-133') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l5', 'v-135') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l5', 'v-150') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l5', 'v-143') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l5', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l5', 'v-142') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l5', 'v-138') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l5', 'v-153') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m10-l5', 'v-151') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l1', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l1', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l1', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l1', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l1', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l1', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l1', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l2', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l2', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l2', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l2', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l2', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l2', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l2', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l3', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l3', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l3', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l3', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l3', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l3', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l3', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l4', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l4', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l4', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l4', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l4', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l4', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l4', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l4', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l5', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l5', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l5', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l5', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l5', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l5', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m11-l5', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l1', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l1', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l1', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l1', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l1', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l2', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l2', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l2', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l2', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l2', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l2', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l2', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l3', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l3', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l3', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l3', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l3', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l3', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l3', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l4', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l4', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l4', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l4', 'v-011') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l4', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l4', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l4', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l4', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l5', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l5', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l5', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l5', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l5', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l5', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m12-l5', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l1', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l1', 'v-028') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l1', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l1', 'v-015') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l1', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l1', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l1', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l1', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l2', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l2', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l2', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l2', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l2', 'v-021') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l2', 'v-020') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l2', 'v-022') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l2', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l3', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l3', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l3', 'v-023') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l3', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l3', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l3', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l3', 'v-019') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l3', 'v-027') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l4', 'v-019') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l4', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l4', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l4', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l4', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l4', 'v-017') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l4', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l4', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l5', 'v-026') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l5', 'v-027') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l5', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l5', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l5', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l5', 'v-025') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l5', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m13-l5', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l1', 'v-125') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l1', 'v-284') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l1', 'v-014') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l1', 'v-016') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l1', 'v-122') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l1', 'v-124') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l1', 'v-126') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l1', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l2', 'v-128') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l2', 'v-017') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l2', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l2', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l2', 'v-122') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l2', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l2', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l2', 'v-014') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l3', 'v-011') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l3', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l3', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l3', 'v-019') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l3', 'v-014') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l3', 'v-009') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l3', 'v-020') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l3', 'v-121') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l4', 'v-018') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l4', 'v-123') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l4', 'v-130') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l4', 'v-126') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l4', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l4', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l4', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l4', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l5', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l5', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l5', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l5', 'v-121') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l5', 'v-123') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l5', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l5', 'v-017') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m14-l5', 'v-127') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l1', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l1', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l1', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l1', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l1', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l1', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l2', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l2', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l2', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l2', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l2', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l2', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l2', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l3', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l3', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l3', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l3', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l3', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l3', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l3', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l4', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l4', 'v-011') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l4', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l4', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l4', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l4', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l4', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l5', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l5', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l5', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l5', 'v-004') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l5', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m15-l5', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l1', 'v-012') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l1', 'v-014') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l1', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l1', 'v-013') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l1', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l1', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l2', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l2', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l2', 'v-006') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l2', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l2', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l2', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l2', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l3', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l3', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l3', 'v-001') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l3', 'v-010') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l3', 'v-007') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l3', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l3', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l3', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l4', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l4', 'v-008') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l4', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l4', 'v-015') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l4', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l4', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l5', 'v-002') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l5', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l5', 'v-003') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l5', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l5', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l5', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a1-m16-l5', 'v-005') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l1', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l1', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l1', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l1', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l1', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l1', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l1', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l1', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l2', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l2', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l2', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l2', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l2', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l2', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l2', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l2', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l3', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l3', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l3', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l3', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l3', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l3', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l3', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l4', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l4', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l4', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l4', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l4', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l4', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l4', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l4', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l5', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l5', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l5', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l5', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l5', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l5', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m1-l5', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l1', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l1', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l1', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l1', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l1', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l1', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l1', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l2', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l2', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l2', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l2', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l2', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l2', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l2', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l2', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l3', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l3', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l3', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l3', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l3', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l3', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l3', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l3', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l4', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l4', 'v-265') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l4', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l4', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l4', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l4', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l4', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l5', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l5', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l5', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l5', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l5', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l5', 'v-265') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l5', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m2-l5', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l1', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l1', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l1', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l1', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l1', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l1', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l1', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l2', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l2', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l2', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l2', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l2', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l2', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l2', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l2', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l3', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l3', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l3', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l3', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l3', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l3', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l3', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l3', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l4', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l4', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l4', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l4', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l4', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l4', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l4', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l5', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l5', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l5', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l5', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l5', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l5', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l5', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m3-l5', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l1', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l1', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l1', 'v-198') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l1', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l1', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l1', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l1', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l1', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l2', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l2', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l2', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l2', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l2', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l2', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l2', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l2', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l3', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l3', 'v-218') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l3', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l3', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l3', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l3', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l3', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l3', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l4', 'v-199') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l4', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l4', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l4', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l4', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l4', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l4', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l4', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l5', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l5', 'v-196') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l5', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l5', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l5', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l5', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l5', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m4-l5', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l1', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l1', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l1', 'v-265') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l1', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l1', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l1', 'v-194') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l1', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l1', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l2', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l2', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l2', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l2', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l2', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l2', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l2', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l2', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l3', 'v-265') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l3', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l3', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l3', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l3', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l3', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l3', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l3', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l4', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l4', 'v-265') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l4', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l4', 'v-266') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l4', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l4', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l4', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l4', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l5', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l5', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l5', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l5', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l5', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l5', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l5', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m5-l5', 'v-194') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l1', 'v-196') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l1', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l1', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l1', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l1', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l1', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l1', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l1', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l2', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l2', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l2', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l2', 'v-321') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l2', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l2', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l2', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l2', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l3', 'v-194') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l3', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l3', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l3', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l3', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l3', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l3', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l3', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l4', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l4', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l4', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l4', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l4', 'v-194') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l4', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l4', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l5', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l5', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l5', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l5', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l5', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l5', 'v-196') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l5', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m6-l5', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l1', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l1', 'v-199') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l1', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l1', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l1', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l1', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l1', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l2', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l2', 'v-205') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l2', 'v-204') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l2', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l2', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l2', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l2', 'v-196') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l2', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l3', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l3', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l3', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l3', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l3', 'v-199') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l3', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l3', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l3', 'v-200') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l4', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l4', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l4', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l4', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l4', 'v-203') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l4', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l4', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l4', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l5', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l5', 'v-198') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l5', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l5', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l5', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l5', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l5', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m7-l5', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l1', 'v-207') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l1', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l1', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l1', 'v-212') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l1', 'v-215') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l1', 'v-214') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l1', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l1', 'v-159') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l2', 'v-208') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l2', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l2', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l2', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l2', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l2', 'v-154') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l2', 'v-159') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l2', 'v-200') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l3', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l3', 'v-154') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l3', 'v-209') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l3', 'v-207') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l3', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l3', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l3', 'v-211') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l3', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l4', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l4', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l4', 'v-151') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l4', 'v-154') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l4', 'v-266') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l4', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l4', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l5', 'v-208') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l5', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l5', 'v-212') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l5', 'v-215') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l5', 'v-211') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l5', 'v-213') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l5', 'v-200') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m8-l5', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l1', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l1', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l1', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l1', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l1', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l1', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l1', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l2', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l2', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l2', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l2', 'v-268') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l2', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l2', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l2', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l3', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l3', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l3', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l3', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l3', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l3', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l3', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l3', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l4', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l4', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l4', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l4', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l4', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l4', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l4', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l5', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l5', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l5', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l5', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l5', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l5', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m9-l5', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l1', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l1', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l1', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l1', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l1', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l1', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l1', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l2', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l2', 'v-217') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l2', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l2', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l2', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l2', 'v-224') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l2', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l2', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l3', 'v-224') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l3', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l3', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l3', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l3', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l3', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l3', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l3', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l4', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l4', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l4', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l4', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l4', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l4', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l4', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l4', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l5', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l5', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l5', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l5', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l5', 'v-218') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l5', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l5', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m10-l5', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l1', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l1', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l1', 'v-231') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l1', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l1', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l1', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l2', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l2', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l2', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l2', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l2', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l2', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l3', 'v-226') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l3', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l3', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l3', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l3', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l3', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l3', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l3', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l4', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l4', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l4', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l4', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l5', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l5', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l5', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l5', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l5', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l5', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m11-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l1', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l1', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l1', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l1', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l1', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l1', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l2', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l2', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l2', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l2', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l2', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l2', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l2', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l2', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l3', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l3', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l3', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l3', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l3', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l3', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l3', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l4', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l4', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l4', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l4', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l4', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l4', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l4', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l4', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l5', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l5', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l5', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l5', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l5', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l5', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m12-l5', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l1', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l1', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l1', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l1', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l1', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l1', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l1', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l2', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l2', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l2', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l2', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l2', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l2', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l2', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l2', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l3', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l3', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l3', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l3', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l3', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l3', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l3', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l3', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l4', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l4', 'v-236') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l4', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l4', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l4', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l4', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l4', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l5', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l5', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l5', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l5', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l5', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l5', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l5', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m13-l5', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l1', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l1', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l1', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l1', 'v-194') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l1', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l1', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l1', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l2', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l2', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l2', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l2', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l2', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l2', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l2', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l2', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l3', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l3', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l3', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l3', 'v-184') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l3', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l3', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l3', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l3', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l4', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l4', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l4', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l4', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l4', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l4', 'v-194') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l4', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l5', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l5', 'v-187') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l5', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l5', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l5', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l5', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l5', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m14-l5', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l1', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l1', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l1', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l1', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l1', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l2', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l2', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l2', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l2', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l2', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l2', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l3', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l3', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l3', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l3', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l3', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l3', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l3', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l4', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l4', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l4', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l4', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l4', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l4', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l5', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l5', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l5', 'v-164') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l5', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l5', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l5', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m15-l5', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l1', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l1', 'v-173') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l1', 'v-266') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l1', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l1', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l1', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l1', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l1', 'v-321') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l2', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l2', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l2', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l2', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l2', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l2', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l2', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l2', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l3', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l3', 'v-174') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l3', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l3', 'v-170') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l3', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l3', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l3', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l3', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l4', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l4', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l4', 'v-171') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l4', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l4', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l4', 'v-168') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l4', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l4', 'v-167') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l5', 'v-266') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l5', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l5', 'v-178') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l5', 'v-177') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l5', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l5', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l5', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('a2-m16-l5', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l1', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l1', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l1', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l1', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l1', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l1', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l2', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l2', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l2', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l2', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l2', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l2', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l2', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l2', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l3', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l3', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l3', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l3', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l3', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l4', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l4', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l4', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l4', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l4', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l4', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l4', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l4', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l5', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l5', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l5', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l5', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l5', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l5', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m1-l5', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l1', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l1', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l1', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l1', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l1', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l1', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l2', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l2', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l2', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l2', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l2', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l2', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l2', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l2', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l3', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l3', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l3', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l3', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l3', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l3', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l3', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l4', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l4', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l4', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l4', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l4', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l4', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l4', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l4', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l5', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l5', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l5', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l5', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l5', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l5', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l5', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m2-l5', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l1', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l1', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l1', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l1', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l1', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l1', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l2', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l2', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l2', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l2', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l2', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l2', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l3', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l3', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l3', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l3', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l4', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l4', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l4', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l5', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l5', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l5', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l5', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m3-l5', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l1', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l1', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l1', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l1', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l1', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l1', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l1', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l2', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l2', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l2', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l2', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l2', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l2', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l2', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l3', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l3', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l3', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l3', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l3', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l3', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l3', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l3', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l4', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l4', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l4', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l4', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l4', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l4', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l4', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l5', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l5', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l5', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l5', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l5', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l5', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l5', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m4-l5', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l1', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l1', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l1', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l1', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l1', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l1', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l1', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l1', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l2', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l2', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l2', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l2', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l2', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l2', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l2', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l2', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l3', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l3', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l3', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l3', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l3', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l3', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l3', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l4', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l4', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l4', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l4', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l4', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l4', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l4', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l4', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l5', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l5', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l5', 'v-266') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l5', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l5', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l5', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l5', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m5-l5', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l1', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l1', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l1', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l1', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l1', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l1', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l1', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l2', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l2', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l2', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l2', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l2', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l2', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l2', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l3', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l3', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l3', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l3', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l3', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l3', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l4', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l4', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l4', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l4', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l4', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l4', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l5', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l5', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l5', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l5', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l5', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l5', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m6-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l1', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l1', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l1', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l1', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l1', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l1', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l1', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l1', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l2', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l2', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l2', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l2', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l2', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l2', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l2', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l2', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l3', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l3', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l3', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l3', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l3', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l3', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l4', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l4', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l4', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l4', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l4', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l4', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l4', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l5', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l5', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l5', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l5', 'v-261') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l5', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l5', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l5', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m7-l5', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l1', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l1', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l1', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l1', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l1', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l1', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l1', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l2', 'v-191') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l2', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l2', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l2', 'v-265') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l2', 'v-185') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l2', 'v-188') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l2', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l2', 'v-180') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l3', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l3', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l3', 'v-190') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l3', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l3', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l3', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l3', 'v-266') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l3', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l4', 'v-262') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l4', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l4', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l4', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l4', 'v-266') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l4', 'v-189') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l4', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l4', 'v-265') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l5', 'v-194') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l5', 'v-175') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l5', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l5', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l5', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l5', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l5', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m8-l5', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l1', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l1', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l1', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l2', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l2', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l2', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l2', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l2', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l2', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l2', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l3', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l3', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l3', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l3', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l3', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l4', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l4', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l4', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l4', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l4', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l4', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l4', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l5', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l5', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l5', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l5', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m9-l5', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l1', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l1', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l1', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l1', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l1', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l1', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l1', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l2', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l2', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l2', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l2', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l2', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l2', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l2', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l2', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l3', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l3', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l3', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l3', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l3', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l3', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l3', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l4', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l4', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l4', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l4', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l4', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l4', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l4', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l5', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l5', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l5', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l5', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l5', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l5', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l5', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m10-l5', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l1', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l1', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l1', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l1', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l1', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l1', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l1', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l2', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l2', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l2', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l2', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l2', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l2', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l3', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l3', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l3', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l3', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l3', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l4', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l4', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l4', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l4', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l4', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l4', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l4', 'v-317') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l5', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l5', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l5', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l5', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l5', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l5', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l5', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m11-l5', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l1', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l1', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l1', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l1', 'v-195') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l1', 'v-263') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l1', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l1', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l1', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l2', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l2', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l2', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l2', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l2', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l2', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l2', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l2', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l3', 'v-259') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l3', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l3', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l3', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l3', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l3', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l4', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l4', 'v-179') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l4', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l4', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l4', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l4', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l4', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l4', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l5', 'v-258') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l5', 'v-183') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l5', 'v-267') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l5', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l5', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l5', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l5', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m12-l5', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l1', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l1', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l1', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l1', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l1', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l2', 'v-268') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l2', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l2', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l2', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l2', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l2', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l3', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l3', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l3', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l3', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l3', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l3', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l4', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l4', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l4', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l4', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l4', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l5', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l5', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l5', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l5', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l5', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l5', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m13-l5', 'v-268') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l1', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l1', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l1', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l1', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l1', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l1', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l2', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l2', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l2', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l2', 'v-284') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l3', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l3', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l3', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l3', 'v-284') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l3', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l3', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l3', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l3', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l4', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l4', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l4', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l4', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l4', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l4', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l4', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l5', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l5', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l5', 'v-284') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l5', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l5', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l5', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l5', 'v-354') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m14-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l1', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l1', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l1', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l1', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l1', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l1', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l2', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l2', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l2', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l2', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l2', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l2', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l3', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l3', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l3', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l3', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l3', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l4', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l4', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l4', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l4', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l4', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l4', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l4', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l5', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l5', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l5', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l5', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l5', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l5', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m15-l5', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l1', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l1', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l1', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l1', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l1', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l1', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l2', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l2', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l2', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l2', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l2', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l2', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l3', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l3', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l3', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l3', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l3', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l3', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l3', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l3', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l4', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l4', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l4', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l4', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l4', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l4', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l5', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l5', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l5', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l5', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l5', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l5', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m16-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l1', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l1', 'v-203') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l1', 'v-260') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l1', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l1', 'v-205') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l1', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l1', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l2', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l2', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l2', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l2', 'v-198') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l2', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l2', 'v-202') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l2', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l2', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l3', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l3', 'v-203') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l3', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l3', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l3', 'v-196') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l3', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l3', 'v-198') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l4', 'v-198') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l4', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l4', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l4', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l4', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l4', 'v-205') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l4', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l4', 'v-203') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l5', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l5', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l5', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l5', 'v-196') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l5', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l5', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l5', 'v-203') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m17-l5', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l1', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l1', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l1', 'v-288') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l1', 'v-289') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l1', 'v-284') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l1', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l1', 'v-280') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l1', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l2', 'v-286') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l2', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l2', 'v-289') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l2', 'v-283') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l2', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l2', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l2', 'v-288') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l2', 'v-232') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l3', 'v-288') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l3', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l3', 'v-282') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l3', 'v-287') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l3', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l3', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l3', 'v-285') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l4', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l4', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l4', 'v-288') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l4', 'v-284') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l4', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l4', 'v-281') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l4', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l4', 'v-286') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l5', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l5', 'v-285') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l5', 'v-282') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l5', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l5', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l5', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l5', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b1-m18-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l1', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l1', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l1', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l1', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l1', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l1', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l1', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l2', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l2', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l2', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l2', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l2', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l2', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l2', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l2', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l3', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l3', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l3', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l3', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l3', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l3', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l3', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l4', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l4', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l4', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l4', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l4', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l4', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l4', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l5', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l5', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l5', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l5', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l5', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l5', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l5', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m1-l5', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l1', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l1', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l1', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l1', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l1', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l1', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l1', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l2', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l2', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l2', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l2', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l2', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l2', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l2', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l3', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l3', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l3', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l3', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l3', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l4', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l4', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l4', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l4', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l4', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l4', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l4', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l4', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l5', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l5', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l5', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l5', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l5', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l5', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l5', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m2-l5', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l1', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l1', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l1', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l1', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l1', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l1', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l1', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l1', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l2', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l2', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l2', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l2', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l2', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l2', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l2', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l2', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l3', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l3', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l3', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l3', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l3', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l3', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l4', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l4', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l4', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l4', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l4', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l4', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l4', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l4', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l5', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l5', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l5', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l5', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l5', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l5', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l5', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m3-l5', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l1', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l1', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l1', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l1', 'v-317') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l1', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l1', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l2', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l2', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l2', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l2', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l2', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l2', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l2', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l3', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l3', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l3', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l3', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l3', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l3', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l3', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l4', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l4', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l4', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l4', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l4', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l4', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l5', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l5', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l5', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l5', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l5', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l5', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l5', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m4-l5', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l1', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l1', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l1', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l1', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l1', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l2', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l2', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l2', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l2', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l2', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l2', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l3', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l3', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l3', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l3', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l3', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l3', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l4', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l4', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l4', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l4', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l4', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l5', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l5', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l5', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l5', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l5', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m5-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l1', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l1', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l1', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l1', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l1', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l1', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l1', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l1', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l2', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l2', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l2', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l2', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l2', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l2', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l2', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l3', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l3', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l3', 'v-270') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l3', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l3', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l3', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l4', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l4', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l4', 'v-270') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l4', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l4', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l4', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l5', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l5', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l5', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l5', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l5', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l5', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l5', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m6-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l1', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l1', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l1', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l1', 'v-327') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l1', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l1', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l2', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l2', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l2', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l2', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l2', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l2', 'v-325') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l3', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l3', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l3', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l3', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l3', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l3', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l3', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l4', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l4', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l4', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l4', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l4', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l4', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l4', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l4', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l5', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l5', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l5', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l5', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l5', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m7-l5', 'v-327') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l1', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l1', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l1', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l1', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l1', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l1', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l1', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l2', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l2', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l2', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l2', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l2', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l2', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l2', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l2', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l3', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l3', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l3', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l3', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l3', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l3', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l4', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l4', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l4', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l4', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l4', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l4', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l4', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l5', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l5', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l5', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l5', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l5', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l5', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m8-l5', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l1', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l1', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l1', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l1', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l1', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l2', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l2', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l2', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l2', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l2', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l2', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l3', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l3', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l3', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l3', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l3', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l3', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l3', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l4', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l4', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l4', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l4', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l4', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l4', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l5', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l5', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l5', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l5', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l5', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l5', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m9-l5', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l1', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l1', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l1', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l1', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l1', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l1', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l1', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l2', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l2', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l2', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l2', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l2', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l2', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l2', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l2', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l3', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l3', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l3', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l3', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l3', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l3', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l3', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l4', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l4', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l4', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l4', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l4', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l4', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l4', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l5', 'v-244') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l5', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l5', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l5', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l5', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l5', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m10-l5', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l1', 'v-220') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l1', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l1', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l1', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l1', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l1', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l1', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l2', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l2', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l2', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l2', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l2', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l2', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l3', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l3', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l3', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l3', 'v-220') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l3', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l3', 'v-165') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l3', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l3', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l4', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l4', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l4', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l4', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l4', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l4', 'v-308') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l4', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l4', 'v-166') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l5', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l5', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l5', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l5', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l5', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l5', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m11-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l1', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l1', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l1', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l1', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l1', 'v-308') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l1', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l1', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l2', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l2', 'v-307') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l2', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l2', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l2', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l2', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l2', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l2', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l3', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l3', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l3', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l3', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l3', 'v-308') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l3', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l4', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l4', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l4', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l4', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l4', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l4', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l5', 'v-307') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l5', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l5', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l5', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l5', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m12-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l1', 'v-319') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l1', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l1', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l1', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l1', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l1', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l1', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l1', 'v-308') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l2', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l2', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l2', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l2', 'v-320') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l2', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l2', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l3', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l3', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l3', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l3', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l3', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l3', 'v-320') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l3', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l3', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l4', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l4', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l4', 'v-307') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l4', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l4', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l4', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l4', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l5', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l5', 'v-319') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l5', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l5', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l5', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l5', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m13-l5', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l1', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l1', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l1', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l1', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l1', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l1', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l1', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l2', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l2', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l2', 'v-327') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l2', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l2', 'v-270') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l2', 'v-324') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l2', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l3', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l3', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l3', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l3', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l3', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l3', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l3', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l3', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l4', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l4', 'v-268') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l4', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l4', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l4', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l4', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l4', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l4', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l5', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l5', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l5', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l5', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l5', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l5', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l5', 'v-172') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m14-l5', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l1', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l1', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l1', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l1', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l1', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l1', 'v-283') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l1', 'v-287') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l1', 'v-282') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l2', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l2', 'v-286') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l2', 'v-283') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l2', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l2', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l2', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l2', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l2', 'v-282') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l3', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l3', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l3', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l3', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l3', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l3', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l3', 'v-288') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l3', 'v-285') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l4', 'v-287') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l4', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l4', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l4', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l4', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l4', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l4', 'v-282') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l4', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l5', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l5', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l5', 'v-289') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l5', 'v-287') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l5', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l5', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l5', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m15-l5', 'v-288') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l1', 'v-265') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l1', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l1', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l1', 'v-307') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l1', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l1', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l2', 'v-308') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l2', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l2', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l2', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l2', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l2', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l2', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l2', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l3', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l3', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l3', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l3', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l3', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l3', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l3', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l3', 'v-355') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l4', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l4', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l4', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l4', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l4', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l4', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l4', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l4', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l5', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l5', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l5', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l5', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l5', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l5', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l5', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m16-l5', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l1', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l1', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l1', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l1', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l1', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l1', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l1', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l1', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l2', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l2', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l2', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l2', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l2', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l2', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l3', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l3', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l3', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l3', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l3', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l3', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l3', 'v-296') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l4', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l4', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l4', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l4', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l4', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l4', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l4', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l5', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l5', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l5', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l5', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l5', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l5', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m17-l5', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l1', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l1', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l1', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l1', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l1', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l1', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l1', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l2', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l2', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l2', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l2', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l2', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l3', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l3', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l3', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l3', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l4', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l4', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l4', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l4', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l4', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l4', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l5', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l5', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l5', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l5', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l5', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('b2-m18-l5', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l1', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l1', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l1', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l1', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l1', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l1', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l1', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l2', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l2', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l2', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l2', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l2', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l2', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l3', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l3', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l3', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l3', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l3', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l3', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l4', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l4', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l4', 'v-317') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l4', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l4', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l4', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l4', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l5', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l5', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l5', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l5', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l5', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l5', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l5', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m1-l5', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l1', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l1', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l1', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l1', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l1', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l1', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l1', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l2', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l2', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l2', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l2', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l2', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l2', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l2', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l3', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l3', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l3', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l3', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l3', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l3', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l3', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l4', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l4', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l4', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l4', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l4', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l4', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l4', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l5', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l5', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l5', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l5', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l5', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l5', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l5', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m2-l5', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l1', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l1', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l1', 'v-356') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l1', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l1', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l2', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l2', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l2', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l2', 'v-352') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l2', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l2', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l2', 'v-354') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l3', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l3', 'v-356') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l3', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l3', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l3', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l4', 'v-352') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l4', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l4', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l4', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l4', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l4', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l5', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l5', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l5', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l5', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l5', 'v-355') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l5', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l5', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m3-l5', 'v-354') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l1', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l1', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l1', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l1', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l1', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l1', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l1', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l1', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l2', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l2', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l2', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l2', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l2', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l3', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l3', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l3', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l3', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l3', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l3', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l3', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l4', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l4', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l4', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l4', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l4', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l4', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l4', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l4', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l5', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l5', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l5', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l5', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l5', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m4-l5', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l1', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l1', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l1', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l1', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l1', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l1', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l1', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l2', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l2', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l2', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l2', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l2', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l2', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l3', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l3', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l3', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l3', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l3', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l3', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l3', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l4', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l4', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l4', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l4', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l4', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l4', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l4', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l5', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l5', 'v-317') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l5', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l5', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l5', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l5', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m5-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l1', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l1', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l1', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l1', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l1', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l1', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l2', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l2', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l2', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l2', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l2', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l3', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l3', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l3', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l3', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l4', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l4', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l4', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l4', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l4', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l4', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l4', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l5', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l5', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l5', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l5', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l5', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l5', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m6-l5', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l1', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l1', 'v-240') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l1', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l1', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l2', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l2', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l2', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l2', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l2', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l2', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l2', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l3', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l3', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l3', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l3', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l3', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l3', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l3', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l4', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l4', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l4', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l4', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l4', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l4', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l5', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l5', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l5', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l5', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l5', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l5', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m7-l5', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l1', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l1', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l1', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l1', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l1', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l1', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l2', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l2', 'v-254') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l2', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l2', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l2', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l2', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l2', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l2', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l3', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l3', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l3', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l3', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l3', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l3', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l3', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l4', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l4', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l4', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l4', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l4', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l4', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l4', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l4', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l5', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l5', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l5', 'v-256') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l5', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l5', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l5', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l5', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m8-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l1', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l1', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l1', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l1', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l1', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l1', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l2', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l2', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l2', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l2', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l2', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l2', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l2', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l3', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l3', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l3', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l3', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l3', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l3', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l3', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l4', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l4', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l4', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l4', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l4', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l4', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l4', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l5', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l5', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l5', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l5', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l5', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l5', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m9-l5', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l1', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l1', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l1', 'v-291') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l1', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l1', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l1', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l1', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l1', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l2', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l2', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l2', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l2', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l2', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l2', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l2', 'v-245') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l2', 'v-299') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l3', 'v-257') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l3', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l3', 'v-279') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l3', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l3', 'v-241') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l3', 'v-169') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l3', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l4', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l4', 'v-237') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l4', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l4', 'v-219') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l4', 'v-186') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l4', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l4', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l4', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l5', 'v-290') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l5', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l5', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l5', 'v-238') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l5', 'v-248') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l5', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m10-l5', 'v-242') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l1', 'v-202') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l1', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l1', 'v-352') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l1', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l1', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l1', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l1', 'v-205') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l2', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l2', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l2', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l2', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l2', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l2', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l2', 'v-203') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l2', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l3', 'v-199') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l3', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l3', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l3', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l3', 'v-196') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l4', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l4', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l4', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l4', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l4', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l4', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l4', 'v-202') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l4', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l5', 'v-199') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l5', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l5', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l5', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l5', 'v-200') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m11-l5', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l1', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l1', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l1', 'v-308') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l1', 'v-307') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l1', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l1', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l1', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l2', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l2', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l2', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l2', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l2', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l2', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l2', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l3', 'v-308') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l3', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l3', 'v-307') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l3', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l3', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l4', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l4', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l4', 'v-356') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l4', 'v-302') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l4', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l5', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l5', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l5', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l5', 'v-356') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l5', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l5', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l5', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m12-l5', 'v-303') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l1', 'v-317') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l1', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l1', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l1', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l1', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l1', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l2', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l2', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l2', 'v-323') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l2', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l2', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l2', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l2', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l3', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l3', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l3', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l3', 'v-304') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l3', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l4', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l4', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l4', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l4', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l4', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l4', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l5', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l5', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l5', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l5', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l5', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m13-l5', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l1', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l1', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l1', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l1', 'v-352') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l1', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l1', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l2', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l2', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l2', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l2', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l2', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l2', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l2', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l3', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l3', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l3', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l3', 'v-355') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l3', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l3', 'v-356') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l4', 'v-352') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l4', 'v-354') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l4', 'v-356') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l4', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l4', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l4', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l4', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l5', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l5', 'v-352') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l5', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l5', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l5', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l5', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m14-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l1', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l1', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l1', 'v-325') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l1', 'v-270') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l1', 'v-327') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l1', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l1', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l2', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l2', 'v-327') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l2', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l2', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l2', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l2', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l2', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l2', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l3', 'v-325') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l3', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l3', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l3', 'v-324') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l3', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l3', 'v-346') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l3', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l4', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l4', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l4', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l4', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l4', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l4', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l4', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l5', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l5', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l5', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l5', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l5', 'v-324') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l5', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m15-l5', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l1', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l1', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l1', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l1', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l1', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l1', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l1', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l1', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l2', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l2', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l2', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l2', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l2', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l2', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l2', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l2', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l3', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l3', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l3', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l3', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l3', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l3', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l3', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l4', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l4', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l4', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l4', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l4', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l5', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l5', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l5', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l5', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l5', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c1-m16-l5', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l1', 'v-273') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l1', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l1', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l1', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l1', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l1', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l1', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l2', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l2', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l2', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l2', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l2', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l3', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l3', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l3', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l3', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l3', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l4', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l4', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l4', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l4', 'v-272') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l4', 'v-278') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l4', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l5', 'v-277') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l5', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l5', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l5', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l5', 'v-275') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m1-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l1', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l1', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l1', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l1', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l1', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l1', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l2', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l2', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l2', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l2', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l2', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l2', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l3', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l3', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l3', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l3', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l3', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l4', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l4', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l4', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l4', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l4', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l4', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l4', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l4', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l5', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l5', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l5', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l5', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l5', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l5', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m2-l5', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l1', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l1', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l1', 'v-350') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l1', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l1', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l1', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l1', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l1', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l2', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l2', 'v-354') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l2', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l2', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l2', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l2', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l2', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l2', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l3', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l3', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l3', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l3', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l3', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l3', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l3', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l4', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l4', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l4', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l4', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l4', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l4', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l4', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l4', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l5', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l5', 'v-354') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l5', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l5', 'v-352') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l5', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l5', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l5', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m3-l5', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l1', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l1', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l1', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l1', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l1', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l2', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l2', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l2', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l2', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l2', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l2', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l3', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l3', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l3', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l3', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l3', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l3', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l3', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l4', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l4', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l4', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l4', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l4', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l4', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l4', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l5', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l5', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l5', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l5', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l5', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l5', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m4-l5', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l1', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l1', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l1', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l1', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l1', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l1', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l2', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l2', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l2', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l2', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l2', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l2', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l2', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l2', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l3', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l3', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l3', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l3', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l3', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l3', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l3', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l3', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l4', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l4', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l4', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l4', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l4', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l4', 'v-317') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l5', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l5', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l5', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l5', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l5', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m5-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l1', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l1', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l1', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l1', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l1', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l1', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l1', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l2', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l2', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l2', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l2', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l2', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l2', 'v-255') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l3', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l3', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l3', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l3', 'v-249') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l3', 'v-253') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l3', 'v-252') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l4', 'v-250') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l4', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l4', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l4', 'v-251') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l4', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l4', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l4', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l4', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l5', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l5', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l5', 'v-243') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l5', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l5', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l5', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m6-l5', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l1', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l1', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l1', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l1', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l1', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l1', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l2', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l2', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l2', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l2', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l2', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l2', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l2', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l3', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l3', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l3', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l3', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l3', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l4', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l4', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l4', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l4', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l4', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l4', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l4', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l5', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l5', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l5', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l5', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l5', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m7-l5', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l1', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l1', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l1', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l1', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l2', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l2', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l2', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l2', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l2', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l2', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l2', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l2', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l3', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l3', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l3', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l3', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l3', 'v-327') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l3', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l3', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l3', 'v-324') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l4', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l4', 'v-270') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l4', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l4', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l4', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l4', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l4', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l4', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l5', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l5', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l5', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l5', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l5', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l5', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m8-l5', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l1', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l1', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l1', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l1', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l1', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l2', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l2', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l2', 'v-334') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l2', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l2', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l2', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l3', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l3', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l3', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l3', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l4', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l4', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l4', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l4', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l4', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l4', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l4', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l5', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l5', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l5', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l5', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l5', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l5', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l5', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m9-l5', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l1', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l1', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l1', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l1', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l1', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l1', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l1', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l1', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l2', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l2', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l2', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l2', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l2', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l2', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l2', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l2', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l3', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l3', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l3', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l3', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l3', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l3', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l3', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l3', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l4', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l4', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l4', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l4', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l4', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l4', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l4', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l4', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l5', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l5', 'v-331') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l5', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l5', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l5', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l5', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m10-l5', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l1', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l1', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l1', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l1', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l1', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l1', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l1', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l2', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l2', 'v-311') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l2', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l2', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l2', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l2', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l2', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l2', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l3', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l3', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l3', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l3', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l3', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l3', 'v-312') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l3', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l4', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l4', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l4', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l4', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l4', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l4', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l4', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l4', 'v-359') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l5', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l5', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l5', 'v-357') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l5', 'v-379') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l5', 'v-310') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l5', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l5', 'v-274') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m11-l5', 'v-247') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l1', 'v-270') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l1', 'v-305') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l1', 'v-324') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l1', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l1', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l1', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l1', 'v-269') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l1', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l2', 'v-324') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l2', 'v-268') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l2', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l2', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l2', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l2', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l2', 'v-326') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l2', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l3', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l3', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l3', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l3', 'v-327') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l3', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l3', 'v-268') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l3', 'v-325') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l3', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l4', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l4', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l4', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l4', 'v-268') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l4', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l4', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l4', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l4', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l5', 'v-268') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l5', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l5', 'v-314') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l5', 'v-315') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l5', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l5', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l5', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m12-l5', 'v-271') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l1', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l1', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l1', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l1', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l1', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l1', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l1', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l1', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l2', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l2', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l2', 'v-246') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l2', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l2', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l2', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l2', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l2', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l3', 'v-328') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l3', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l3', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l3', 'v-330') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l3', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l3', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l3', 'v-298') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l3', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l4', 'v-300') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l4', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l4', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l4', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l4', 'v-294') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l4', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l4', 'v-292') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l4', 'v-293') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l5', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l5', 'v-329') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l5', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l5', 'v-239') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l5', 'v-297') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l5', 'v-276') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l5', 'v-295') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m13-l5', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l1', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l1', 'v-341') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l1', 'v-339') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l1', 'v-344') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l1', 'v-347') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l1', 'v-343') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l1', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l1', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l2', 'v-317') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l2', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l2', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l2', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l2', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l2', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l2', 'v-306') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l2', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l3', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l3', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l3', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l3', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l3', 'v-337') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l3', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l3', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l3', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l4', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l4', 'v-335') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l4', 'v-322') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l4', 'v-338') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l4', 'v-345') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l4', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l4', 'v-348') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l4', 'v-342') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l5', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l5', 'v-301') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l5', 'v-336') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l5', 'v-316') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l5', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l5', 'v-313') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m14-l5', 'v-318') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l1', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l1', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l1', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l1', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l1', 'v-340') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l1', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l1', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l1', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l2', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l2', 'v-332') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l2', 'v-375') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l2', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l2', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l2', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l2', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l2', 'v-360') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l3', 'v-381') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l3', 'v-366') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l3', 'v-382') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l3', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l3', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l3', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l3', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l3', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l4', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l4', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l4', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l4', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l4', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l4', 'v-333') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l4', 'v-370') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l4', 'v-362') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l5', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l5', 'v-264') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l5', 'v-377') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l5', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l5', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l5', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m15-l5', 'v-376') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l1', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l1', 'v-371') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l1', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l1', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l1', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l1', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l1', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l1', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l2', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l2', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l2', 'v-368') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l2', 'v-354') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l2', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l2', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l2', 'v-355') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l2', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l3', 'v-373') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l3', 'v-363') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l3', 'v-309') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l3', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l3', 'v-383') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l3', 'v-358') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l3', 'v-367') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l3', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l4', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l4', 'v-361') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l4', 'v-372') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l4', 'v-380') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l4', 'v-353') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l4', 'v-356') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l4', 'v-369') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l4', 'v-364') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l5', 'v-374') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l5', 'v-365') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l5', 'v-384') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l5', 'v-378') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l5', 'v-352') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l5', 'v-349') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l5', 'v-351') on conflict do nothing;

insert into public.lesson_vocabulary (lesson_id, vocabulary_id) values ('c2-m16-l5', 'v-368') on conflict do nothing;

-- Yutuqlar (unlock_achievements funksiyasi shu jadvaldan foydalanadi)
insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('first_lesson', 'Birinchi dars', 'Birinchi darsingni muvaffaqiyatli tugat.', 'Flag', 10, 'lessons_completed', 1) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('ten_lessons', '10 ta dars', '10 ta darsni yakunla.', 'BookOpen', 20, 'lessons_completed', 10) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('twenty_five_lessons', 'A1 ustasi', '25 ta darsni yakunla — A1 kursini to''liq o''zlashtir.', 'GraduationCap', 50, 'lessons_completed', 25) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('xp_100', '100 XP', 'Jami 100 XP to''plash.', 'Zap', 15, 'total_xp', 100) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('xp_500', '500 XP', 'Jami 500 XP to''plash.', 'Sparkles', 30, 'total_xp', 500) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('xp_1000', '1000 XP', 'Jami 1000 XP to''plash — haqiqiy yulduz!', 'Trophy', 60, 'total_xp', 1000) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('streak_7', '7 kunlik streak', '7 kun ketma-ket o''rgan.', 'Flame', 30, 'streak', 7) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('streak_30', '30 kunlik streak', '30 kun ketma-ket o''rgan — ajoyib intizom!', 'Flame', 100, 'streak', 30) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('words_25', '25 ta so''z', '25 ta so''zni o''rgangan qilib belgilang.', 'Languages', 15, 'words_learned', 25) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('words_100', '100 ta so''z', '100 ta so''zni o''rgangan qilib belgilang.', 'BookMarked', 40, 'words_learned', 100) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('perfect_lesson', 'Mukammal dars', 'Barcha javoblar to''g''ri bo''lgan darsni tugat.', 'Target', 15, 'perfect_lessons', 1) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

insert into public.achievements (id, title, description, icon, xp_reward, condition_type, condition_value) values ('perfect_10', '10 ta mukammal dars', '10 ta darsni 100% aniqlik bilan tugat.', 'Star', 50, 'perfect_lessons', 10) on conflict (id) do update set title = excluded.title, description = excluded.description, icon = excluded.icon, xp_reward = excluded.xp_reward, condition_type = excluded.condition_type, condition_value = excluded.condition_value;

-- Kunlik vazifalar (bump_quest funksiyasi shu jadvaldan foydalanadi)
insert into public.daily_quests (id, title, description, quest_type, target_value, xp_reward) values ('quest_lessons', '2 ta darsni tugat', 'Bugun 2 ta darsni yakunlang.', 'lessons', 2, 20) on conflict (id) do update set title = excluded.title, description = excluded.description, quest_type = excluded.quest_type, target_value = excluded.target_value, xp_reward = excluded.xp_reward;

insert into public.daily_quests (id, title, description, quest_type, target_value, xp_reward) values ('quest_words', '5 ta so''z o''rgan', 'Lug''atdan 5 ta so''zni o''rgangan qilib belgilang.', 'words', 5, 20) on conflict (id) do update set title = excluded.title, description = excluded.description, quest_type = excluded.quest_type, target_value = excluded.target_value, xp_reward = excluded.xp_reward;

insert into public.daily_quests (id, title, description, quest_type, target_value, xp_reward) values ('quest_reviews', '10 ta so''zni takrorla', 'Takrorlash bo''limida 10 ta so''zni ko''ring.', 'reviews', 10, 20) on conflict (id) do update set title = excluded.title, description = excluded.description, quest_type = excluded.quest_type, target_value = excluded.target_value, xp_reward = excluded.xp_reward;

commit;
