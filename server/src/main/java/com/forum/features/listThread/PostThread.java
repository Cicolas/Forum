package com.forum.features.listThread;

import java.util.*;
import com.forum.entities.*;
import com.forum.views.*;

class Thread {
  public String id;
  public String title;
  public String content;
  public CompactUserView author;
  public List<CompactCategoryView> categories;
  public List<String> upVotes;
  public List<String> downVotes;
  public int createdAt;
  public int lastUpdate;
  public List<CommentNode> comments;

  public Thread(Post post, List<CommentNode> comments) {
    CompletePostView postView = new CompletePostView(post);

    this.id = postView.id;
    this.title = postView.title;
    this.content = postView.content;
    this.author = postView.author;
    this.categories = postView.categories;
    this.upVotes = postView.upVotes;
    this.downVotes = postView.downVotes;
    this.createdAt = postView.createdAt;
    this.lastUpdate = postView.lastUpdate;

    this.comments = comments;
  }
}
