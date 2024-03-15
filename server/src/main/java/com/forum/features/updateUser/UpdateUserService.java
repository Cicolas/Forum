package com.forum.features.updateUser;

import java.util.Objects;

import com.forum.entities.User;
import com.forum.repositories.UsersRepository;
import com.forum.exceptions.domain.RequestException;
import com.forum.exceptions.domain.RestrictedAccessException;

class UpdateUserService {
  private UsersRepository usersRepository;

  public UpdateUserService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  public User execute(UserUpdateRequest updateRequest) {
    User user = this.usersRepository.listOne(updateRequest.updatedUserId);

    if (user == null) {
      throw new RequestException("user does not exist");
    }

    if (!Objects.equals(user.getId(), updateRequest.authenticatedUserId)) {
      throw new RestrictedAccessException("cannot update third-party accounts");
    }

    if (updateRequest.name != null) {
      user.setName(updateRequest.name);
    }

    if (updateRequest.email != null) {
      User registeredUser = this.usersRepository.listOneByEmail(updateRequest.email);

      if (registeredUser != null) {
        throw new RequestException("email already registered");
      }

      user.setEmail(updateRequest.email);
    }

    if (updateRequest.password != null) {
      user.setPassword(updateRequest.password);
    }

    if (updateRequest.avatarUrl != null) {
      user.setAvatarUrl(updateRequest.avatarUrl);
    }

    this.usersRepository.update(user);

    return user;
  }
}
