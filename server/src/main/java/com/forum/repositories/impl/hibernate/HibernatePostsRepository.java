package com.forum.repositories.impl.hibernate;

import com.forum.Transaction;
import com.forum.entities.Post;
import com.forum.repositories.PostsRepository;

public class HibernatePostsRepository
  extends HibernateRepository<Post>
  implements PostsRepository
{
  public HibernatePostsRepository(Transaction transaction) {
    super(Post.class, transaction);
  }
}
