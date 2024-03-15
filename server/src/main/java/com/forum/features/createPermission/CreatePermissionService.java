package com.forum.features.createPermission;

import com.forum.entities.Permission;
import com.forum.repositories.PermissionsRepository;
import com.forum.exceptions.domain.RequestException;

class CreatePermissionService {
  private PermissionsRepository permissionsRepository;

  public CreatePermissionService(PermissionsRepository permissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  public Permission execute(PermissionCreationRequest creationRequest) {
    Permission permission = this.permissionsRepository.listOne(creationRequest.name);

    if (permission != null) {
      throw new RequestException("permission already exists");
    }

    permission = new Permission();
    permission.setName(creationRequest.name);
    permission.setDescription(creationRequest.description);

    this.permissionsRepository.save(permission);

    return permission;
  }
}
