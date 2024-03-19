package com.forum.endpoints;

import com.forum.http.*;

public class AuthenticatedEndpointFactory {
  public HttpEndpointHandler create(
    HttpEndpointHandler endpoint
  ) {
    return new AuthenticatedEndpoint(
        endpoint
    );
  }
}
