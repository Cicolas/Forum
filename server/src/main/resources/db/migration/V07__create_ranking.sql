create table ranking (
  user_id varchar(255) not null,
  contribution_id varchar(255) not null,
  vote varchar(255),
  primary key (user_id, contribution_id),
  foreign key (user_id) references users (id) on delete cascade,
  foreign key (contribution_id) references contributions (id)
);
