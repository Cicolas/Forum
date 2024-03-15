package com.forum.views;

import java.util.List;
import com.forum.entities.Role;

public class CompactRoleView {
  public String name;
  public String description;
  public List<CompactPermissionView> permissions;

  public CompactRoleView(Role role) {
    this.name = role.getName();
    this.description = role.getDescription();
    this.permissions = role.getPermissions()
      .stream().map(CompactPermissionView::new).toList();
  }
}
