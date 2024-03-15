create table user_permissions (
  user_id varchar(255) not null,
  permission_name varchar(255) not null,
  primary key (user_id, permission_name),
  foreign key (user_id) references users (id) on delete cascade,
  foreign key (permission_name) references permissions (name) on delete cascade
);
