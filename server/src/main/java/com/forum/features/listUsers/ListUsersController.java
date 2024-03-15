package com.forum.features.listUsers;

import java.util.List;
import com.forum.http.*;
import com.forum.entities.User;
import com.forum.views.CompleteUserView;

class ListUsersController implements HttpEndpointHandler {
  private ListUsersService listUsersService;

  public ListUsersController(ListUsersService listUsersService) {
    this.listUsersService = listUsersService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    List<User> users = this.listUsersService.execute();
    List<CompleteUserView> userViews = users.stream().map(CompleteUserView::new).toList();

    response.json(userViews);
  };
}
