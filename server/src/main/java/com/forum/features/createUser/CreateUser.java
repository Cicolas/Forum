package com.forum.features.createUser;

import com.forum.security.HashGenerator;
import com.forum.security.BcryptHashGenerator;
import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.UsersRepository;

public class CreateUser {
  private HashGenerator hashGenerator = new BcryptHashGenerator();

  public CreateUser(UsersRepository usersRepository) {
    CreateUserService service = new CreateUserService(this.hashGenerator, usersRepository);
    CreateUserController controller = new CreateUserController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
