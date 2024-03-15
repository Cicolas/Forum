package com.forum.http.impl.Javalin;

import com.forum.http.*;
import io.javalin.http.*;

class ExceptionHandlerWrapper {
  public static ExceptionHandler<Exception> wrap(HttpExceptionHandler handler) {
    return (Exception exception, Context context) -> {
      handler.handle(
        new JavalinRequest(context),
        new JavalinResponse(context),
        exception
      );
    };
  }
}
