package com.forum.exceptions.domain;

public class RestrictedAccessException extends RuntimeException {
  public RestrictedAccessException(String message) {
    super(message);
  }
}
