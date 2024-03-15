package com.forum.features.deleteRole;

import com.forum.entities.Role;
import com.forum.repositories.RolesRepository;
import com.forum.exceptions.domain.RequestException;

class DeleteRoleService {
  private RolesRepository rolesRepository;

  public DeleteRoleService(RolesRepository rolesRepository) {
    this.rolesRepository = rolesRepository;
  }

  public void execute(String roleName) {
    Role role = this.rolesRepository.listOne(roleName);

    if (role == null) {
      throw new RequestException("role does not exist");
    }

    this.rolesRepository.delete(roleName);
  }
}
