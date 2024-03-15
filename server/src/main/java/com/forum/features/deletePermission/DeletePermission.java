package com.forum.features.deletePermission;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.PermissionsRepository;

public class DeletePermission {
  public DeletePermission(PermissionsRepository permissionsRepository) {
    DeletePermissionService service = new DeletePermissionService(permissionsRepository);
    DeletePermissionController controller = new DeletePermissionController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
