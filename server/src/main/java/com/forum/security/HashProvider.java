package com.forum.security;

public interface HashProvider {
  public String hash(String input);
  public boolean equals(String input, String hash);
}
