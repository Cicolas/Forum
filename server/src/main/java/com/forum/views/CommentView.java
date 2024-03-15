package com.forum.views;

import com.forum.entities.*;

public class CommentView {
  public String id;
  public String parentId;
  public String content;
  public CompactUserView author;
  public int createdAt;
  public int lastUpdate;

  public CommentView(Comment comment) {
    this.id = comment.getId();
    this.content = comment.getContent();
    this.parentId = comment.getParentId();
    this.author = comment.getAuthor() != null
      ? new CompactUserView(comment.getAuthor())
      : null;
    this.createdAt = comment.getCreationTimestamp();
    this.lastUpdate = comment.getUpdateTimestamp();
  }
}
