package com.forum.endpoints;

import java.util.*;
import com.forum.http.*;
import com.forum.exceptions.domain.*;

class RestrictedEndpoint implements HttpEndpointHandler {
  private HttpEndpointHandler endpoint;
  private String[] requiredPermissionNames;

  public RestrictedEndpoint(
    HttpEndpointHandler endpoint,
    String ...requiredPermissionNames
  ) {
    this.endpoint = endpoint;
    this.requiredPermissionNames = requiredPermissionNames;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    @SuppressWarnings("unchecked")
    Set<String> userPermissionNames = (Set<String>) request.getSessionAttribute("userPermissions");

    for (String permissionName : this.requiredPermissionNames) {
      if (!userPermissionNames.contains(permissionName)) {
        throw new RestrictedAccessException(
          String.format("user must have '%s' permission", permissionName)
        );
      }
    }

    endpoint.handle(request, response);
  }
}
