package com.forum.exceptions.http;

public class Forbidden extends HttpException {
  public Forbidden(String message) {
    super(message);
    super.status = 403;
    super.type = "forbidden";
  }
}

