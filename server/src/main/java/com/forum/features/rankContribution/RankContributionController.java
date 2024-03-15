package com.forum.features.rankContribution;

import com.forum.http.*;
import com.forum.entities.Ranking;

class RankContributionController implements HttpEndpointHandler {
  private RankContributionService rankContributionService;

  public RankContributionController(RankContributionService service) {
    this.rankContributionService = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    String userId = (String) request.getSessionAttribute("userId");
    String contributionId = request.getPathParam("contributionId");
    String action = request.getPathParam("action");

    ContributionRankingRequest rankingRequest = new ContributionRankingRequest();

    rankingRequest.userId = userId;
    rankingRequest.contributionId = contributionId;
    rankingRequest.action = action;

    Ranking ranking = this.rankContributionService.execute(rankingRequest);
    RankingView rankingView = new RankingView(ranking);

    response.json(rankingView);
  }
}
