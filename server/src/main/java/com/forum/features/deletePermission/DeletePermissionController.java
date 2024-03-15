package com.forum.features.deletePermission;

import com.forum.http.*;

class DeletePermissionController implements HttpEndpointHandler {
  private DeletePermissionService deletePermissionService;

  public DeletePermissionController(DeletePermissionService deletePermissionService) {
    this.deletePermissionService = deletePermissionService;
  }

  @Override
  public void handle(HttpRequest request, HttpResponse response) {
    String permissionName = request.getPathParam("permissionName");

    this.deletePermissionService.execute(permissionName);

    response.status(204);
  }
}
