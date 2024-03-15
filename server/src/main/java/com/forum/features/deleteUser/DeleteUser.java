package com.forum.features.deleteUser;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.UsersRepository;

public class DeleteUser {
  public DeleteUser(UsersRepository usersRepository) {
    DeleteUserService service = new DeleteUserService(usersRepository);
    DeleteUserController controller = new DeleteUserController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
