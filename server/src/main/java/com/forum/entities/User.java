package com.forum.entities;

import java.util.*;
import com.forum.utils.*;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
  @Id
  private String id;
  private String name;
  private String email;
  private String password;
  private String avatarUrl;
  private int createdAt;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "user_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_name")
  )
  private Set<Role> roles;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "user_permissions",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "permission_name")
  )
  private Set<Permission> addedPermissions;

  public User() {
    UUID uuid = UUID.randomUUID();
    this.id = uuid.toString();

    this.createdAt = Time.now();
  }

  public String getId() { return this.id; }
  public String getName() { return this.name; }
  public String getEmail() { return this.email; }
  public String getPassword() { return this.password; }
  public String getAvatarUrl() { return this.avatarUrl; }
  public int getCreationTimestamp() { return this.createdAt; }
  public Set<Role> getRoles() { return this.roles; }

  public Set<String> getRoleNames() {
    Set<String> roleNames = new HashSet<>();
    this.getRoles().forEach((role) -> roleNames.add(role.getName()));
    return roleNames;
  }

  public Set<Permission> getPermissions() {
    Set<Permission> permissions = new HashSet<>(this.addedPermissions);

    for (Role role : this.roles)
      for (Permission rolePermission : role.getPermissions())
        permissions.add(rolePermission);

    return permissions;
  }

  public Set<String> getPermissionNames() {
    Set<String> permissionNames = new HashSet<>();
    this.getPermissions().forEach((permission) -> permissionNames.add(permission.getName()));
    return permissionNames;
  }

  public void setName(String name) { this.name = name; }
  public void setEmail(String email) { this.email = email; }
  public void setPassword(String password) { this.password = password; }
  public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
  public void setRoles(Set<Role> roles) { this.roles = roles; }
  public void addPermissions(Set<Permission> addedPermissions) {
    this.addedPermissions = addedPermissions;
  }
}
