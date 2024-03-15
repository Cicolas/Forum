package com.forum.http;

public interface HttpExceptionHandler {
  public void handle(HttpRequest request, HttpResponse response, Exception exception);
}
