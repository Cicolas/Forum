package com.forum.security;

import java.util.Set;

public class ParsedToken {
  public String subject;
  public Set<String> permissions;
  public Set<String> roles;
}
