package com.forum.features.deleteUser;

import java.util.*;
import com.forum.http.*;

class DeleteUserController implements HttpEndpointHandler {
  private DeleteUserService deleteUserService;

  public DeleteUserController(DeleteUserService deleteUserService) {
    this.deleteUserService = deleteUserService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    @SuppressWarnings("unchecked")
    Set<String> authenticatedUserRoles = (Set<String>) request.getSessionAttribute("userRoles");
    String authenticatedUserId = (String) request.getSessionAttribute("userId");

    String deletedUserId = request.getPathParam("userId");

    UserDeletionRequest deletionRequest = new UserDeletionRequest();

    deletionRequest.authenticatedUserId = authenticatedUserId;
    deletionRequest.deletedUserId = deletedUserId;
    deletionRequest.isModerator = authenticatedUserRoles.contains("admin");

    this.deleteUserService.execute(deletionRequest);

    response.status(204);
  }
}
