package com.forum.features.listUsers;

import java.util.List;
import com.forum.entities.User;
import com.forum.repositories.UsersRepository;

class ListUsersService {
  private UsersRepository usersRepository;

  public ListUsersService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  public  List<User> execute() {
    return this.usersRepository.list();
  }
}
