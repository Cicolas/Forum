package com.forum.features.updateUser;

import com.forum.http.*;
import com.forum.entities.User;
import com.forum.views.CompleteUserView;
import com.google.gson.Gson;

class UpdateUserController implements HttpEndpointHandler {
  private UpdateUserService updateUserService;
  private Gson jsonConverter = new Gson();

  public UpdateUserController(UpdateUserService updateUserService) {
    this.updateUserService = updateUserService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    String authenticatedUserId = request.getPathParam("userId");
    String updatedUserId = request.getPathParam("userId");

    RequestBody requestBody = this.jsonConverter.fromJson(request.getBody(), RequestBody.class);

    UserUpdateRequest updateRequest =  new UserUpdateRequest();

    updateRequest.authenticatedUserId = authenticatedUserId;
    updateRequest.updatedUserId = updatedUserId;
    updateRequest.name = requestBody.name;
    updateRequest.email = requestBody.email;
    updateRequest.password = requestBody.password;
    updateRequest.avatarUrl = requestBody.avatarUrl;

    User updatedUser = this.updateUserService.execute(updateRequest);
    CompleteUserView updatedUserView = new CompleteUserView(updatedUser);

    response.json(updatedUserView);
  }

  private class RequestBody {
    public String name;
    public String email;
    public String password;
    public String avatarUrl;
  }
}
