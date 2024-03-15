package com.forum.repositories.impl.hibernate;

import com.forum.Transaction;
import com.forum.entities.Permission;
import com.forum.repositories.PermissionsRepository;

public class HibernatePermissionsRepository
  extends HibernateRepository<Permission>
  implements PermissionsRepository
{
  public HibernatePermissionsRepository(Transaction transaction) {
    super(Permission.class, transaction);
  }
}
