package com.forum.features.deletePermission;

import com.forum.entities.Permission;
import com.forum.repositories.PermissionsRepository;
import com.forum.exceptions.domain.RequestException;

class DeletePermissionService {
  private PermissionsRepository permissionsRepository;

  public DeletePermissionService(PermissionsRepository permissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  public void execute(String permissionName) {
    Permission permission = this.permissionsRepository.listOne(permissionName);

    if (permission == null) {
      throw new RequestException("permission does not exist");
    }

    this.permissionsRepository.delete(permissionName);
  }
}
