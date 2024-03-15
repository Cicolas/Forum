package com.forum.features.createUser;

import java.util.*;
import com.forum.entities.*;
import com.forum.repositories.*;
import com.forum.exceptions.domain.RequestException;
import com.forum.security.HashProvider;

public class CreateUserService {
  private HashProvider hashProvider;
  private UsersRepository usersRepository;
  private RolesRepository rolesRepository;
  private PermissionsRepository permissionsRepository;

  public CreateUserService(
    HashProvider hashProvider,
    UsersRepository usersRepository,
    RolesRepository rolesRepository,
    PermissionsRepository permissionsRepository
  ) {
    this.hashProvider = hashProvider;
    this.usersRepository = usersRepository;
    this.rolesRepository = rolesRepository;
    this.permissionsRepository = permissionsRepository;
  }

  public User execute(UserCreationRequest creationRequest) {
    User registeredUser = this.usersRepository.listOneByEmail(creationRequest.email);

    if (registeredUser != null) {
      throw new RequestException("email already registered");
    }

    String passwordHash = this.hashProvider.hash(creationRequest.password);

    Set<Role> roles = this.rolesRepository.listMany(creationRequest.roleNames);
    Set<Permission> addedPermissions = this.permissionsRepository.listMany(creationRequest.addedPermissionNames);

    User user = new User();
    user.setName(creationRequest.name);
    user.setEmail(creationRequest.email);
    user.setPassword(passwordHash);
    user.setAvatarUrl(creationRequest.avatarUrl);
    user.setRoles(roles);
    user.addPermissions(addedPermissions);

    this.usersRepository.save(user);

    return user;
  }
}
