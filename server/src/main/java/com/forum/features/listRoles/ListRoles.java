package com.forum.features.listRoles;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.RolesRepository;

public class ListRoles {
  public ListRoles(RolesRepository rolesRepository) {
    ListRolesService service = new ListRolesService(rolesRepository);
    ListRolesController controller = new ListRolesController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
