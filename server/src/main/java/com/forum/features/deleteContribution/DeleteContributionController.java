package com.forum.features.deleteContribution;

import java.util.*;
import com.forum.http.*;

class DeleteContributionController implements HttpEndpointHandler {
  private DeleteContributionService deleteContributionService;

  public DeleteContributionController(DeleteContributionService deleteContributionService) {
    this.deleteContributionService = deleteContributionService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    @SuppressWarnings("unchecked")
    Set<String> authenticatedUserRoles = (Set<String>) request.getSessionAttribute("userRoles");
    String authenticatedUserId = (String) request.getSessionAttribute("userId");

    String contributionId = request.getPathParam("contributionId");

    ContributionDeletionRequest deletionRequest = new ContributionDeletionRequest();

    deletionRequest.authenticatedUserId = authenticatedUserId;
    deletionRequest.contributionId = contributionId;
    deletionRequest.isModerator = authenticatedUserRoles.contains("admin");

    this.deleteContributionService.execute(deletionRequest);

    response.status(204);
  }
}
