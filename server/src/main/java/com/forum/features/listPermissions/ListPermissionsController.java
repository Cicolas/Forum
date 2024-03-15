package com.forum.features.listPermissions;

import java.util.List;
import com.forum.http.*;
import com.forum.entities.Permission;
import com.forum.views.CompletePermissionView;

class ListPermissionsController implements HttpEndpointHandler {
  private ListPermissionsService listPermissionsService;

  public ListPermissionsController(ListPermissionsService listPermissionsService) {
    this.listPermissionsService = listPermissionsService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    List<Permission> permissions = this.listPermissionsService.execute();
    List<CompletePermissionView> permissionViews = permissions.stream().map(CompletePermissionView::new).toList();

    response.json(permissionViews);
  };
}
