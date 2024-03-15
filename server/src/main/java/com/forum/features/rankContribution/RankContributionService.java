package com.forum.features.rankContribution;

import com.forum.entities.*;
import com.forum.repositories.*;
import com.forum.exceptions.domain.RequestException;

class RankContributionService {
  private UsersRepository usersRepository;
  private ContributionsRepository contributionsRepository;
  private RankingsRepository rankingsRepository;

  public RankContributionService(
    UsersRepository usersRepository,
    ContributionsRepository contributionsRepository,
    RankingsRepository rankingsRepository
  ) {
    this.usersRepository = usersRepository;
    this.contributionsRepository = contributionsRepository;
    this.rankingsRepository = rankingsRepository;
  }

  public Ranking execute(ContributionRankingRequest rankingRequest) {
    User user = this.usersRepository.listOne(rankingRequest.userId);

    if (user == null) {
      throw new RequestException("user does not exist");
    }

    Contribution contribution = this.contributionsRepository.listOne(rankingRequest.contributionId);

    if (contribution == null) {
      throw new RequestException("contribution does not exist");
    }

    Ranking ranking = new Ranking();
    ranking.setId(user, contribution);
    ranking.setVote(rankingRequest.action);

    this.rankingsRepository.update(ranking);

    return ranking;
  }
}
