package com.forum.features.currentUser;

import com.forum.entities.User;
import com.forum.exceptions.domain.RequestException;
import com.forum.repositories.PermissionsRepository;
import com.forum.repositories.RolesRepository;
import com.forum.repositories.UsersRepository;

class CurrentUserService {
  private UsersRepository usersRepository;
  
  public CurrentUserService(
    UsersRepository usersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public User execute(String id) {
    User user = this.usersRepository.listOne(id);
      
    if (user == null) {
      throw new RequestException("user do not exists");
    }
    
    return user;
  }
}
