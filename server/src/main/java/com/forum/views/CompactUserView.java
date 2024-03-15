package com.forum.views;

import com.forum.entities.User;

public class CompactUserView {
  public String id;
  public String name;
  public String email;
  public String avatarUrl;

  public CompactUserView(User user) {
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.avatarUrl = user.getAvatarUrl();
  }
}
