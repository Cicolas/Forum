package com.forum.features.authenticateUser;

import com.forum.http.*;
import com.google.gson.Gson;

class AuthenticateUserController implements HttpEndpointHandler {
  private AuthenticateUserService service;
  private Gson jsonConverter = new Gson();

  public AuthenticateUserController(AuthenticateUserService service) {
    this.service = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    UserAuthenticationRequest authRequest = this.jsonConverter.fromJson(request.getBody(), UserAuthenticationRequest.class);

    String token = this.service.execute(authRequest);
    TokenView tokenView = new TokenView(token);

    response.json(tokenView);
  }
}
