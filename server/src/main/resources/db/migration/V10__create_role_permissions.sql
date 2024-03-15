create table role_permissions (
  role_name varchar(255) not null,
  permission_name varchar(255) not null,
  primary key (role_name, permission_name),
  foreign key (role_name) references roles (name) on delete cascade,
  foreign key (permission_name) references permissions (name) on delete cascade
);
