package com.forum.features.deleteContribution;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.ContributionsRepository;

public class DeleteContribution {
  public DeleteContribution(ContributionsRepository contributionsRepository) {
    DeleteContributionService service = new DeleteContributionService(contributionsRepository);
    DeleteContributionController controller = new DeleteContributionController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
