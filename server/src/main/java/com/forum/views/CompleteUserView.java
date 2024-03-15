package com.forum.views;

import com.forum.entities.User;

public class CompleteUserView {
  public String id;
  public String name;
  public String email;
  public String avatarUrl;
  public int createdAt;

  public CompleteUserView(User user) {
    CompactUserView compactView = new CompactUserView(user);

    this.id = compactView.id;
    this.name = compactView.name;
    this.email = compactView.email;
    this.avatarUrl = compactView.avatarUrl;

    this.createdAt = user.getCreationTimestamp();
  }
}
