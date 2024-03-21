package com.forum.features.currentUser;

import com.forum.repositories.UsersRepository;
import com.forum.http.HttpEndpointHandler;

public class CurrentUser {
  public CurrentUser(UsersRepository usersRepository) {
    CurrentUserService service = new CurrentUserService(usersRepository);
    CurrentUserController controller = new CurrentUserController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
