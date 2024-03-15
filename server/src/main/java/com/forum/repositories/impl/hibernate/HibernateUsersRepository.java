package com.forum.repositories.impl.hibernate;

import com.forum.Transaction;
import com.forum.repositories.UsersRepository;

import jakarta.persistence.NoResultException;

import com.forum.entities.User;

public class HibernateUsersRepository
  extends HibernateRepository<User>
  implements UsersRepository
{
  public HibernateUsersRepository(Transaction transaction) {
    super(User.class, transaction);
  }

  public User listOneByEmail(String email) {
    SingleResult result = new SingleResult();

    this.transaction.execute((entityManager) -> {
      try {
        result.instance = entityManager
          .createQuery("from User where email = :email", User.class)
          .setParameter("email", email)
          .getSingleResult();

      } catch(NoResultException e) {}
    });

    return result.instance;
  }
}
