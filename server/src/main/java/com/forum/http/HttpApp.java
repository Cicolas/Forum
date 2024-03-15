package com.forum.http;

public abstract class HttpApp {
  public abstract void addExceptionHandler(HttpExceptionHandler handler);
  public abstract void addEndpointHandler(String method, String path, HttpEndpointHandler handler);

  public void get(String path, HttpEndpointHandler handler) {
    this.addEndpointHandler("GET", path, handler);
  }

  public void post(String path, HttpEndpointHandler handler) {
    this.addEndpointHandler("POST", path, handler);
  }

  public void put(String path, HttpEndpointHandler handler) {
    this.addEndpointHandler("PUT", path, handler);
  }

  public void delete(String path, HttpEndpointHandler handler) {
    this.addEndpointHandler("DELETE", path, handler);
  }

  public void use(String path, HttpEndpointHandler handler) {
    this.get(path, handler);
    this.post(path, handler);
    this.put(path, handler);
    this.delete(path, handler);
  }
}
