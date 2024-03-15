package com.forum.exceptions.http;

public class Unauthorized extends HttpException {
  public Unauthorized(String message) {
    super(message);
    super.status = 401;
    super.type = "unauthorized";
  }
}
