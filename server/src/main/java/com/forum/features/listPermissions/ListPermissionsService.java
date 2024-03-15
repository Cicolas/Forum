package com.forum.features.listPermissions;

import java.util.List;
import com.forum.entities.Permission;
import com.forum.repositories.PermissionsRepository;

class ListPermissionsService {
  private PermissionsRepository permissionsRepository;

  public ListPermissionsService(PermissionsRepository permissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  public  List<Permission> execute() {
    return this.permissionsRepository.list();
  }
}
