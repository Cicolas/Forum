package com.forum.repositories.impl.hibernate;

import com.forum.Transaction;
import com.forum.entities.Ranking;
import com.forum.repositories.RankingsRepository;

public class HibernateRankingsRepository
  extends HibernateRepository<Ranking>
  implements RankingsRepository
{
  public HibernateRankingsRepository(Transaction transaction) {
    super(Ranking.class, transaction);
  }
}
