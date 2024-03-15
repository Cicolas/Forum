package com.forum.views;

import java.util.List;
import com.forum.entities.Post;

public class CompletePostView {
  public String id;
  public String title;
  public String content;
  public CompactUserView author;
  public List<CompactCategoryView> categories;
  public List<String> upVotes;
  public List<String> downVotes;
  public int createdAt;
  public int lastUpdate;

  public CompletePostView(Post post) {
    CompactPostView compactView = new CompactPostView(post);

    this.id = compactView.id;
    this.title = compactView.title;
    this.content = compactView.content;
    this.author = compactView.author;
    this.categories = compactView.categories;
    this.createdAt = compactView.createdAt;
    this.lastUpdate = compactView.lastUpdate;

    this.upVotes = post.getUpVotes();
    this.downVotes = post.getDownVotes();
  }
}
