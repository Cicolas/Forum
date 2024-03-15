create table posts (
  id varchar(255) primary key,
  title varchar(255) not null,
  foreign key (id) references contributions (id)
);
