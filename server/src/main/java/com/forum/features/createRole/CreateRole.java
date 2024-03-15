package com.forum.features.createRole;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.RolesRepository;
import com.forum.repositories.PermissionsRepository;

public class CreateRole {
  public CreateRole(
    RolesRepository rolesRepository,
    PermissionsRepository permissionsRepository
  ) {
    CreateRoleService service = new CreateRoleService(rolesRepository, permissionsRepository);
    CreateRoleController controller = new CreateRoleController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
