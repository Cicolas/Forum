package com.forum.http.impl.Javalin;

import com.forum.http.*;
import io.javalin.http.*;

class EndpointHandlerWrapper {
  public static Handler wrap(HttpEndpointHandler handler) {
    return (Context context) -> {
      handler.handle(
        new JavalinRequest(context),
        new JavalinResponse(context)
      );
    };
  }
}
