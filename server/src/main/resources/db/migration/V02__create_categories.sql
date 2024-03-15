create table categories (
  name varchar(255) primary key,
  description varchar(255) not null,
  color varchar(255) not null,
  created_at int default (unix_timestamp()) not null
);
