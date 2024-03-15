package com.forum.views;

import com.forum.entities.Permission;

public class CompletePermissionView {
  public String name;
  public String description;
  public int createdAt;

  public CompletePermissionView(Permission permission) {
    CompactPermissionView compactView = new CompactPermissionView(permission);

    this.name = compactView.name;
    this.description = compactView.description;

    this.createdAt = permission.getCreationTimestamp();
  }
}
