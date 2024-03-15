package com.forum.views;

import java.util.List;
import com.forum.entities.Role;

public class CompleteRoleView {
  public String name;
  public String description;
  public List<CompactPermissionView> permissions;
  public int createdAt;

  public CompleteRoleView(Role role) {
    CompactRoleView compactView = new CompactRoleView(role);

    this.name = compactView.name;
    this.description = compactView.description;
    this.permissions = compactView.permissions;

    this.createdAt = role.getCreationTimestamp();
  }
}
