package com.forum.features.listThread;

import java.util.*;
import com.forum.entities.*;
import com.forum.views.CompactUserView;

class CommentNode {
  public String id;
  public String content;
  public CompactUserView author;
  public List<String> upVotes;
  public List<String> downVotes;
  public int createdAt;
  public int lastUpdate;
  public List<CommentNode> replies;

  public CommentNode(Comment comment) {
    this.id = comment.getId();
    this.content = comment.getContent();
    this.author = comment.getAuthor() != null
      ? new CompactUserView(comment.getAuthor())
      : null;
    this.upVotes = comment.getUpVotes();
    this.downVotes = comment.getDownVotes();
    this.createdAt = comment.getCreationTimestamp();
    this.lastUpdate = comment.getUpdateTimestamp();
    this.replies = new LinkedList<>();
  }
}
