package com.forum.exceptions.http;

public class HttpException {
  public int status;
  public String type;
  public String message;

  public HttpException(String message) {
    this.message = message;
  }
}
