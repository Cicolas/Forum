package com.forum.features.deleteUser;

import java.util.Objects;
import com.forum.entities.User;
import com.forum.repositories.UsersRepository;
import com.forum.exceptions.domain.RequestException;
import com.forum.exceptions.domain.RestrictedAccessException;

class DeleteUserService {
  private UsersRepository usersRepository;

  public DeleteUserService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  public void execute(UserDeletionRequest deletionRequest) {
    User user = this.usersRepository.listOne(deletionRequest.deletedUserId);

    if (user == null) {
      throw new RequestException("user does not exist");
    }

    if (
      !Objects.equals(
        user.getId(),
        deletionRequest.authenticatedUserId
      ) && !deletionRequest.isModerator
    ) {
      throw new RestrictedAccessException("cannot delete third-party account");
    }

    this.usersRepository.delete(deletionRequest.deletedUserId);
  }
}
