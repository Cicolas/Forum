package com.forum.features.createPermission;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.PermissionsRepository;

public class CreatePermission {
  public CreatePermission(PermissionsRepository permissionsRepository) {
    CreatePermissionService service = new CreatePermissionService(permissionsRepository);
    CreatePermissionController controller = new CreatePermissionController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
