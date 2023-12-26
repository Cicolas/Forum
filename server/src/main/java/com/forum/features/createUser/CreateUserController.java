package com.forum.features.createUser;

import com.forum.http.*;
import com.google.gson.Gson;

class CreateUserController implements HttpHandler {
  private CreateUserService createUserService;
  private Gson jsonConverter = new Gson();

  public CreateUserController(CreateUserService service) {
    this.createUserService = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    UserCreationRequest creationRequest = this.jsonConverter.fromJson(request.body(), UserCreationRequest.class);

    UserView createdUser = this.createUserService.execute(creationRequest);

    response.status(201);
    response.json(createdUser);
  };
}