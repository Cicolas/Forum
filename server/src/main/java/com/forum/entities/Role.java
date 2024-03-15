package com.forum.entities;

import java.util.*;
import com.forum.utils.*;
import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
  @Id
  private String name;
  private String description;
  private int createdAt;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "role_permissions",
    joinColumns = @JoinColumn(name = "role_name"),
    inverseJoinColumns = @JoinColumn(name = "permission_name")
  )
  private Set<Permission> permissions;

  public Role() {
    this.createdAt = Time.now();
  }

  public String getName() { return this.name; }
  public String getDescription() { return this.description; }
  public int getCreationTimestamp() { return this.createdAt; }
  public Set<Permission> getPermissions() { return this.permissions; }

  public void setName(String name) { this.name = name; }
  public void setDescription(String description) { this.description = description; }
  public void setPermissions(Set<Permission> permissions) { this.permissions = permissions; }
}
