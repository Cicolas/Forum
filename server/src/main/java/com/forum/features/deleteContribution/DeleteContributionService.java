package com.forum.features.deleteContribution;

import java.util.Objects;
import com.forum.entities.Contribution;
import com.forum.repositories.ContributionsRepository;
import com.forum.exceptions.domain.RequestException;
import com.forum.exceptions.domain.RestrictedAccessException;

class DeleteContributionService {
  private ContributionsRepository contributionsRepository;

  public DeleteContributionService(ContributionsRepository contributionsRepository) {
    this.contributionsRepository = contributionsRepository;
  }

  public void execute(ContributionDeletionRequest deletionRequest) {
    Contribution contribution = this.contributionsRepository.listOne(deletionRequest.contributionId);

    if (contribution == null) {
      throw new RequestException("contribution does not exist");
    }

    if (
      !Objects.equals(
        contribution.getAuthorId(),
        deletionRequest.authenticatedUserId
      ) && !deletionRequest.isModerator
    ) {
      throw new RestrictedAccessException("cannot delete third-party contributions");
    }

    contribution.setAuthor(null);
    contribution.setContent(null);

    this.contributionsRepository.update(contribution);
  }
}
