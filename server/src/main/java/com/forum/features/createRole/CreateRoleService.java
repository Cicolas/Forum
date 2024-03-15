package com.forum.features.createRole;

import java.util.*;
import com.forum.entities.*;
import com.forum.repositories.*;
import com.forum.exceptions.domain.RequestException;

class CreateRoleService {
  private RolesRepository rolesRepository;
  private PermissionsRepository permissionsRepository;

  public CreateRoleService(
    RolesRepository rolesRepository,
    PermissionsRepository permissionsRepository
  ) {
    this.rolesRepository = rolesRepository;
    this.permissionsRepository = permissionsRepository;
  }

  public Role execute(RoleCreationRequest creationRequest) {
    Role role = this.rolesRepository.listOne(creationRequest.name);

    if (role != null) {
      throw new RequestException("role already exists");
    }

    Set<Permission> permissions = this.permissionsRepository.listMany(creationRequest.permissionNames);

    role = new Role();
    role.setName(creationRequest.name);
    role.setDescription(creationRequest.description);
    role.setPermissions(permissions);

    this.rolesRepository.save(role);

    return role;
  }
}
