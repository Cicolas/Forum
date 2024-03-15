package com.forum.features.updateUser;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.UsersRepository;

public class UpdateUser {
  public UpdateUser(UsersRepository usersRepository) {
    UpdateUserService service = new UpdateUserService(usersRepository);
    UpdateUserController controller = new UpdateUserController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
