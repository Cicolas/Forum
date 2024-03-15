package com.forum.features.listPermissions;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.PermissionsRepository;

public class ListPermissions {
  public ListPermissions(PermissionsRepository permissionsRepository) {
    ListPermissionsService service = new ListPermissionsService(permissionsRepository);
    ListPermissionsController controller = new ListPermissionsController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
