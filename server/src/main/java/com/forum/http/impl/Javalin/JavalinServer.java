package com.forum.http.impl.Javalin;

import com.forum.http.HttpServer;
import com.forum.http.HttpApp;
import io.javalin.Javalin;

public class JavalinServer implements HttpServer {
  private GsonMapper gsonMapper = new GsonMapper();

  public HttpApp start(int port) {
    Javalin app = Javalin.create(config -> {
      config.jsonMapper(gsonMapper);
      config.plugins.enableCors(cors -> {
        cors.add(it -> {
            it.allowCredentials = true;
            it.allowHost("http://localhost:5173");
        });
      });
    }).start(port);
    return new JavalinApp(app);
  }
}
