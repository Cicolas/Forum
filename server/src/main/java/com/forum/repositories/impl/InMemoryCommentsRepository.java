package com.forum.repositories.impl;

import com.forum.entities.Comment;

public class InMemoryCommentsRepository extends InMemoryRepository<Comment> {
  protected String getInstanceId(Comment instance) {
    return instance.getId();
  }
}
