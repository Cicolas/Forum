package com.forum.features.updatePost;

class PostUpdateRequest {
  public String authenticatedUserId;
  public String postId;
  public String title;
  public String content;
  public String[] categoryNames;
}
