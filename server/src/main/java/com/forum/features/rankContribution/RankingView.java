package com.forum.features.rankContribution;

import com.forum.entities.Ranking;

class RankingView {
  public String userId;
  public String contributionId;
  public String vote;

  public RankingView(Ranking ranking) {
    this.userId = ranking.getUserId();
    this.contributionId = ranking.getContributionId();

    String vote = ranking.getVote();
    this.vote = vote == null ? "canceled" : vote;
  }
}
