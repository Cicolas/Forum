package com.forum.http.impl.Javalin;

import com.forum.http.HttpResponse;
import io.javalin.http.Context;
import io.javalin.http.Header;

class JavalinResponse implements HttpResponse {
  private final String anyOrigin = "*";
  private Context httpContext;

  public JavalinResponse(Context httpContext) {
    this.httpContext = httpContext;
    this.httpContext.header(Header.ACCESS_CONTROL_ALLOW_ORIGIN, anyOrigin);
  }

  public void status(int code) {
    this.httpContext.status(code);
  }

  public void json(Object content) {
    this.httpContext.json(content);
  }
}
