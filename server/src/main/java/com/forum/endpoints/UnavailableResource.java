package com.forum.endpoints;

import com.forum.http.*;
import com.forum.exceptions.domain.ResourceException;

public class UnavailableResource implements HttpEndpointHandler {
  public void handle(HttpRequest request, HttpResponse response) {
    throw new ResourceException("requested resource is not available");
  }
}
