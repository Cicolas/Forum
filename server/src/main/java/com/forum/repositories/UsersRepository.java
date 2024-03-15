package com.forum.repositories;

import com.forum.entities.User;

public interface UsersRepository extends Repository<User> {
  public User listOneByEmail(String email);
}
