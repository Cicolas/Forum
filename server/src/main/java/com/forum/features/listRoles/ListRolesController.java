package com.forum.features.listRoles;

import java.util.List;
import com.forum.http.*;
import com.forum.entities.Role;
import com.forum.views.CompleteRoleView;

class ListRolesController implements HttpEndpointHandler {
  private ListRolesService listRolesService;

  public ListRolesController(ListRolesService listRolesService) {
    this.listRolesService = listRolesService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    List<Role> roles = this.listRolesService.execute();
    List<CompleteRoleView> roleViews = roles.stream().map(CompleteRoleView::new).toList();

    response.json(roleViews);
  };
}
