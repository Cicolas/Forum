package com.forum.exceptions.http;

public class NotFound extends HttpException {
  public NotFound(String message) {
    super(message);
    super.status = 404;
    super.type = "not found";
  }
}
