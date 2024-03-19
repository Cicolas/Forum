package com.forum.features.currentUser;

import com.forum.entities.Permission;
import com.forum.entities.Role;
import com.forum.entities.User;
import com.forum.views.CompactPermissionView;
import com.forum.views.CompactRoleView;
import com.forum.views.CompactUserView;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CurrentUserView {
  public String id;
  public String name;
  public String email;
  public String avatarUrl;
  public int createdAt;
  
  public List<String> roles;
  public List<String> pemissions;

  public CurrentUserView(User user) {
      
    CompactUserView compactView = new CompactUserView(user);

    this.id = compactView.id;
    this.name = compactView.name;
    this.email = compactView.email;
    this.avatarUrl = compactView.avatarUrl;
    
    this.roles = user.getRoles()
      .stream()
      .map((role) -> role.getName())
      .toList();
    
    this.pemissions = user.getRoles()
      .stream()
      .flatMap((role) -> 
        role.getPermissions()
          .stream()
          .map((permission) -> permission.getName())
      ).collect(Collectors.toList());

    this.createdAt = user.getCreationTimestamp();
  }
}