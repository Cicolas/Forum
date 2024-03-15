package com.forum.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment extends Contribution {
  @ManyToOne
  @JoinColumn(name = "parent_id")
  private Contribution parent;

  public Comment() {}

  public Contribution getParent() { return this.parent; }
  public String getParentId() { return this.parent.getId(); }

  public void setParent(Contribution parent) { this.parent = parent; }
}
