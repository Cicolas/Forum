insert into
  contributions (id, author_id, content)
values
  ('contribution-id4', 'user-id2', 'Great overview!'),
  ('contribution-id5', 'user-id3', 'Needs improvement.'),
  ('contribution-id6', 'user-id1', 'Exactly what I needed!'),
  ('contribution-id7', 'user-id3', 'Very informative.'),
  ('contribution-id8', 'user-id1', 'Not very helpful.'),
  ('contribution-id9', 'user-id2', 'I like it.');

insert into
  comments (id, parent_id)
values
  ('contribution-id4', 'contribution-id1'),
  ('contribution-id5', 'contribution-id1'),
  ('contribution-id6', 'contribution-id2'),
  ('contribution-id7', 'contribution-id2'),
  ('contribution-id8', 'contribution-id3'),
  ('contribution-id9', 'contribution-id3');
