package com.forum.repositories.impl.hibernate;

import com.forum.Transaction;
import com.forum.entities.Role;
import com.forum.repositories.RolesRepository;

public class HibernateRolesRepository
  extends HibernateRepository<Role>
  implements RolesRepository
{
  public HibernateRolesRepository(Transaction transaction) {
    super(Role.class, transaction);
  }
}
