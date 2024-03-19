package com.forum.features.currentUser;

import com.forum.http.*;
import com.forum.entities.Permission;
import com.forum.entities.User;
import com.forum.exceptions.domain.AuthenticationException;
import com.forum.views.CompactUserView;
import com.forum.views.CompletePermissionView;
import com.google.gson.Gson;

class CurrentUserController implements HttpEndpointHandler {
  private CurrentUserService currentUserService;
  private Gson jsonConverter = new Gson();

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
