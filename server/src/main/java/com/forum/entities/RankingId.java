package com.forum.entities;

import jakarta.persistence.*;

@Embeddable
public class RankingId {
  private String userId;
  private String contributionId;

  public RankingId() {}

  public RankingId(User user, Contribution contribution) {
    this(user.getId(), contribution.getId());
  }

  public RankingId(String userId, String contributionId) {
    this.userId = userId;
    this.contributionId = contributionId;
  }

  public String getUserId() { return this.userId; }
  public String getContributionId() { return this.contributionId; }

  public void setUserId(String userId) { this.userId = userId; }
  public void setContributionId(String contributionId) { this.contributionId = contributionId; }

  public boolean equals(Object object) {
    if (object == this) return true;
    if (!(object instanceof RankingId)) return false;

    RankingId other = (RankingId) object;

    return (
      this.getUserId().equals(other.getUserId()) &&
      this.getContributionId().equals(other.getContributionId())
    );
  }

  public int hashCode() {
    int hash = 17;
    hash += 37 * hash + (this.getUserId() == null ? 0 : this.getUserId().hashCode());
    hash += 37 * hash + (this.getContributionId() == null ? 0 : this.getContributionId().hashCode());
    return hash;
  }
}
