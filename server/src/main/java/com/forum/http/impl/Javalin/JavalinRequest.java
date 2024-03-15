package com.forum.http.impl.Javalin;

import java.util.List;
import com.forum.http.HttpRequest;
import io.javalin.http.Context;

class JavalinRequest implements HttpRequest {
  private Context httpContext;

  public JavalinRequest(Context httpContext) {
    this.httpContext = httpContext;
  }

  public String getHeader(String name) {
    return this.httpContext.header(name);
  }

  public String getBody() {
    return this.httpContext.body();
  }

  public String getPathParam(String name) {
    return this.httpContext.pathParam(name);
  }

  public String getQueryParam(String name) {
    return this.httpContext.queryParam(name);
  }

  public List<String> getQueryParams(String name) {
    return this.httpContext.queryParams(name);
  }

  public Object getSessionAttribute(String name) {
    return this.httpContext.sessionAttribute(name);
  }

  public void setSessionAttribute(String name, Object value) {
    this.httpContext.sessionAttribute(name, value);
  }
}
