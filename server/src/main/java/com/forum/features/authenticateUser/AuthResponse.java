package com.forum.features.authenticateUser;

import com.forum.entities.User;
import com.forum.views.CompactUserView;

class AuthResponse {
  public String token;
  public CompactUserView user;

  public AuthResponse(String token, User user) {
    this.token = token;
    this.user = new CompactUserView(user);
  }
}
