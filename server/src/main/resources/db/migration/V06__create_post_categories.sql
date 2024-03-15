create table post_categories (
  post_id varchar(255) not null,
  category_name varchar(255) not null,
  primary key (post_id, category_name),
  foreign key (post_id) references posts (id),
  foreign key (category_name) references categories (name) on delete cascade
);
