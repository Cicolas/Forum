package com.forum.features.createMember;

import com.forum.http.*;
import com.forum.entities.User;
import com.forum.features.createUser.*;
import com.forum.views.CompleteUserView;
import com.google.gson.Gson;

class CreateMemberController implements HttpEndpointHandler {
  private final String[] roleNames = { "member" };
  private final String[] addedPermissionNames = {};

  private CreateUserService createUserService;
  private Gson jsonConverter = new Gson();

  public CreateMemberController(CreateUserService service) {
    this.createUserService = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    RequestBody requestBody = this.jsonConverter.fromJson(request.getBody(), RequestBody.class);

    UserCreationRequest creationRequest = new UserCreationRequest();

    creationRequest.name = requestBody.name;
    creationRequest.email = requestBody.email;
    creationRequest.password = requestBody.password;
    creationRequest.avatarUrl = requestBody.avatarUrl;
    creationRequest.roleNames = this.roleNames;
    creationRequest.addedPermissionNames = this.addedPermissionNames;

    User createdUser = this.createUserService.execute(creationRequest);
    CompleteUserView createdUserView = new CompleteUserView(createdUser);

    response.status(201);
    response.json(createdUserView);
  };

  private class RequestBody {
    public String name;
    public String email;
    public String password;
    public String avatarUrl;
  }
}
