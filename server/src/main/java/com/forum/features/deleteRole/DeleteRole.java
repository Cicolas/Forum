package com.forum.features.deleteRole;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.RolesRepository;

public class DeleteRole {
  public DeleteRole(RolesRepository rolesRepository) {
    DeleteRoleService service = new DeleteRoleService(rolesRepository);
    DeleteRoleController controller = new DeleteRoleController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
