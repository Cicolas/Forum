create table users (
  id varchar(255) primary key,
  name varchar(255) not null,
  email varchar(255) unique not null,
  password varchar(255) not null,
  avatar_url varchar(255) not null,
  created_at int default (unix_timestamp()) not null
);
