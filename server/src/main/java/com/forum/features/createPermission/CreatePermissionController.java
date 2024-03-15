package com.forum.features.createPermission;

import com.forum.http.*;
import com.forum.entities.Permission;
import com.forum.views.CompletePermissionView;
import com.google.gson.Gson;

class CreatePermissionController implements HttpEndpointHandler {
  private CreatePermissionService createPermissionService;
  private Gson jsonConverter = new Gson();

  public CreatePermissionController(CreatePermissionService service) {
    this.createPermissionService = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    PermissionCreationRequest creationRequest = this.jsonConverter.fromJson(request.getBody(), PermissionCreationRequest.class);

    Permission createdPermission = this.createPermissionService.execute(creationRequest);
    CompletePermissionView createdPermissionView = new CompletePermissionView(createdPermission);

    response.status(201);
    response.json(createdPermissionView);
  }
}
