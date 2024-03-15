package com.forum.security;

import com.forum.entities.User;
import com.forum.exceptions.domain.*;

public interface JWTProvider {
  public String generate(User user);
  public ParsedToken parse(String token) throws AuthenticationException;
}
