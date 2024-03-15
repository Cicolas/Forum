package com.forum.exceptions.http;

public class InternalServerError extends HttpException {
  public InternalServerError(String message) {
    super(message);
    super.status = 500;
    super.type = "internal server error";
  }
}
