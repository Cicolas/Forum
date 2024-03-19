package com.forum.features.listUsers;

import java.util.List;
import com.forum.entities.User;
import com.forum.repositories.UsersRepository;

class ListUsersService {
  private UsersRepository usersRepository;

  public ListUsersService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  public  List<User> execute(UserListingRequest listingRequest) {
    return this.usersRepository.list().stream().filter((user) -> {
      return listingRequest.name == null || 
             user.getName().equals(listingRequest.name);
    }).toList();
  }
}
