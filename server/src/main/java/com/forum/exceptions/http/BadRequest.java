package com.forum.exceptions.http;

public class BadRequest extends HttpException {
  public BadRequest(String message) {
    super(message);
    super.status = 400;
    super.type = "bad request";
  }
}
