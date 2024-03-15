package com.forum.repositories.impl.hibernate;

import com.forum.Transaction;
import com.forum.entities.Contribution;
import com.forum.repositories.ContributionsRepository;

public class HibernateContributionsRepository
  extends HibernateRepository<Contribution>
  implements ContributionsRepository
{
  public HibernateContributionsRepository(Transaction transaction) {
    super(Contribution.class, transaction);
  }
}
