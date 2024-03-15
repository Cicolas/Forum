package com.forum.entities;

import java.util.*;
import com.forum.exceptions.domain.RequestException;
import jakarta.persistence.*;

@Entity
public class Ranking {
  @EmbeddedId
  private RankingId id;

  @ManyToOne
  @MapsId("userId")
  private User user;

  @ManyToOne
  @MapsId("contributionId")
  private Contribution contribution;

  private String vote;

  public RankingId getId() { return this.id; }
  public String getUserId() { return this.id.getUserId(); }
  public String getContributionId() { return this.id.getContributionId(); }
  public String getVote() { return this.vote; }

  public void setId(User user, Contribution contribution) {
    this.id = new RankingId(user, contribution);
    this.contribution = contribution;
    this.user = user;
  }

  public void setVote(String action) {
    if (!isValidAction(action)) {
      throw new RequestException("invalid action");
    }

    if (action.equals("cancel")) {
      this.vote = null;
    } else this.vote = action;
  }

  private boolean isValidAction(String action) {
    String[] validActions = { "upvote", "downvote", "cancel" };
    return Arrays.asList(validActions).contains(action);
  }
}
