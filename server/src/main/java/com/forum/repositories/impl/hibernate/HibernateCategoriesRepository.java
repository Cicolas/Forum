package com.forum.repositories.impl.hibernate;

import com.forum.Transaction;
import com.forum.entities.Category;
import com.forum.repositories.CategoriesRepository;

public class HibernateCategoriesRepository
  extends HibernateRepository<Category>
  implements CategoriesRepository
{
  public HibernateCategoriesRepository(Transaction transaction) {
    super(Category.class, transaction);
  }
}
