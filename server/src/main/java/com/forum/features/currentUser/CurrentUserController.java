package com.forum.features.currentUser;

import com.forum.entities.User;
import com.forum.exceptions.domain.*;
import com.forum.http.*;

class CurrentUserController implements HttpEndpointHandler {
  private CurrentUserService currentUserService;

  public CurrentUserController(CurrentUserService service) {
    this.currentUserService = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    String id = (String) request.getSessionAttribute("userId");

    if (id == null) {
      throw new AuthenticationException("token missing");
    }

    User user = this.currentUserService.execute(id);

    CurrentUserView currentUserView = new CurrentUserView(user);

    response.status(200);
    response.json(currentUserView);
  }
}
