package com.forum.repositories.impl.hibernate;

import java.util.List;
import com.forum.Transaction;
import com.forum.repositories.CommentsRepository;
import com.forum.entities.Comment;

public class HibernateCommentsRepository
  extends HibernateRepository<Comment>
  implements CommentsRepository
{
  public HibernateCommentsRepository(Transaction transaction) {
    super(Comment.class, transaction);
  }

  public List<Comment> listRepliesFrom(String contributionId) {
    ResultList result = new ResultList();

    this.transaction.execute((entityManager) -> {
      result.instances = entityManager
        .createQuery("from Comment where parent.id = :contributionId", Comment.class)
        .setParameter("contributionId", contributionId)
        .getResultList();
    });

    return result.instances;
  }
}
