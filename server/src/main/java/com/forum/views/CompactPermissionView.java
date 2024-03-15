package com.forum.views;

import com.forum.entities.Permission;

public class CompactPermissionView {
  public String name;
  public String description;

  public CompactPermissionView(Permission permission) {
    this.name = permission.getName();
    this.description = permission.getDescription();
  }
}
