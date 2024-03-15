package com.forum.entities;

import java.util.*;
import jakarta.persistence.*;
import com.forum.utils.Time;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "contributions")
public class Contribution {
  @Id
  private String id;

  @ManyToOne
  @JoinColumn(name = "author_id")
  private User author;

  private String content;

  @OneToMany(mappedBy = "contribution", fetch = FetchType.EAGER)
  private Set<Ranking> rankings;

  private int createdAt;
  private int lastUpdate;

  public Contribution() {
    UUID uuid = UUID.randomUUID();
    this.id = uuid.toString();

    this.createdAt = Time.now();
    this.lastUpdate = this.createdAt;
  }

  public String getId() { return this.id; }
  public String getAuthorId() { return this.author != null ? this.author.getId() : ""; }
  public String getAuthorName() { return this.author != null ? this.author.getName() : ""; }
  public String getContent() { return this.content; }
  public User getAuthor() { return this.author; }
  public List<String> getUpVotes() { return this.getVotes("upvote"); }
  public List<String> getDownVotes() { return this.getVotes("downvote"); }
  public int getCreationTimestamp() { return this.createdAt; }
  public int getUpdateTimestamp() { return this.lastUpdate; }

  private List<String> getVotes(String type) {
    return this.rankings.stream()
      .filter((ranking) -> Objects.equals(ranking.getVote(), type))
      .map((ranking) -> ranking.getUserId()).toList();
  }

  public void setAuthor(User author) {
    this.setLastUpdate();
    this.author = author;
  }

  public void setContent(String content) {
    this.setLastUpdate();
    this.content = content;
  }

  protected void setLastUpdate() { this.lastUpdate = Time.now(); }
}
