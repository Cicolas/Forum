package com.forum.repositories;

import java.util.List;
import com.forum.entities.Comment;

public interface CommentsRepository extends Repository<Comment> {
  public List<Comment> listRepliesFrom(String contributionId);
}
