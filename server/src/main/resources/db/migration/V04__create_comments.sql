create table comments (
  id varchar(255) primary key,
  parent_id varchar(255) not null,
  foreign key (id) references contributions (id),
  foreign key (parent_id) references contributions (id)
);
