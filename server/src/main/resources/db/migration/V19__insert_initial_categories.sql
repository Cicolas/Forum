insert into
  categories (name, description, color)
values
  ('machine learning', 'Machine Learning is about...', '#871F03'),
  ('software', 'Software was...', '#876b03'),
  ('engineering', 'Engineering is...', '#27A08A'),
  ('languages', 'Languages are...', '#1E3D6F');

insert into
  post_categories (post_id, category_name)
values
  ('contribution-id1', 'machine learning'),
  ('contribution-id2', 'software'),
  ('contribution-id2', 'engineering'),
  ('contribution-id3', 'languages');
