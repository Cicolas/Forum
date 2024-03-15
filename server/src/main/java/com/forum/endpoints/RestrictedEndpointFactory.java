package com.forum.endpoints;

import com.forum.http.*;

public class RestrictedEndpointFactory {
  public HttpEndpointHandler create(
    HttpEndpointHandler endpoint,
    String ...requiredPermissionNames
  ) {
    return new AuthenticatedEndpoint(
      new RestrictedEndpoint(
        endpoint,
        requiredPermissionNames
      )
    );
  }
}
