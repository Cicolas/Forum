create table user_roles (
  user_id varchar(255) not null,
  role_name varchar(255) not null,
  primary key (user_id, role_name),
  foreign key (user_id) references users (id) on delete cascade,
  foreign key (role_name) references roles (name) on delete cascade
);
