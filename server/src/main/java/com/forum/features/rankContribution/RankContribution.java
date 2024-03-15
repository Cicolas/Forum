package com.forum.features.rankContribution;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.*;

public class RankContribution {
  public RankContribution(
    UsersRepository usersRepository,
    ContributionsRepository contributionsRepository,
    RankingsRepository rankingsRepository
  ) {
    RankContributionService service = new RankContributionService(
      usersRepository,
      contributionsRepository,
      rankingsRepository
    );

    RankContributionController controller = new RankContributionController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
