package com.forum.http;

public interface HttpEndpointHandler {
  public void handle(HttpRequest request, HttpResponse response);
}
