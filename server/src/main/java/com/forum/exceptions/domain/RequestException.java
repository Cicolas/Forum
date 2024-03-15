package com.forum.exceptions.domain;

public class RequestException extends RuntimeException {
  public RequestException(String message) {
    super(message);
  }
}
