package com.forum.http.impl.Javalin;

import com.forum.http.HttpResponse;
import io.javalin.http.Context;

class JavalinResponse implements HttpResponse {
  private Context httpContext;

  public JavalinResponse(Context httpContext) {
    this.httpContext = httpContext;
  }

  public void status(int code) {
    this.httpContext.status(code);
  }

  public void json(Object content) {
    this.httpContext.json(content);
  }
}
