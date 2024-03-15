package com.forum.features.deleteRole;

import com.forum.http.*;

class DeleteRoleController implements HttpEndpointHandler {
  private DeleteRoleService deleteRoleService;

  public DeleteRoleController(DeleteRoleService deleteRoleService) {
    this.deleteRoleService = deleteRoleService;
  }

  @Override
  public void handle(HttpRequest request, HttpResponse response) {
    String roleName = request.getPathParam("roleName");

    this.deleteRoleService.execute(roleName);

    response.status(204);
  }
}
