package com.forum.features.listRoles;

import java.util.List;
import com.forum.entities.Role;
import com.forum.repositories.RolesRepository;

class ListRolesService {
  private RolesRepository rolesRepository;

  public ListRolesService(RolesRepository rolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  public  List<Role> execute() {
    return this.rolesRepository.list();
  }
}
