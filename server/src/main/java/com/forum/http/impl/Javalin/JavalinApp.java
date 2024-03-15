package com.forum.http.impl.Javalin;

import com.forum.http.*;
import io.javalin.http.*;
import io.javalin.Javalin;

public class JavalinApp extends HttpApp {
  private Javalin app;

  public JavalinApp(Javalin app) {
    this.app = app;
  }

  public void addEndpointHandler(String method, String path, HttpEndpointHandler handler) {
    HandlerType type = HandlerType.Companion.findByName(method);
    this.app.addHandler(type, path, EndpointHandlerWrapper.wrap(handler));
  }

  public void addExceptionHandler(HttpExceptionHandler handler) {
    this.app.exception(Exception.class, ExceptionHandlerWrapper.wrap(handler));
  }
}
