package com.forum.repositories.impl.hibernate;

import java.util.*;
import com.forum.Transaction;
import com.forum.repositories.Repository;
import com.forum.exceptions.domain.*;

public class HibernateRepository<T> implements Repository<T> {
  private Class<T> persistedClass;
  protected Transaction transaction;

  public HibernateRepository(
    Class<T> persistedClass,
    Transaction transaction
  ) {
    this.persistedClass = persistedClass;
    this.transaction = transaction;
  }

  public List<T> list() {
    ResultList result = new ResultList();

    this.transaction.execute((entityManager) -> {
      result.instances = entityManager
        .createQuery(
          String.format("from %s", this.persistedClass.getName()),
          this.persistedClass
        )
        .getResultList();
    });

    return result.instances;
  }

  public T listOne(String id) {
    SingleResult result = new SingleResult();

    this.transaction.execute((entityManager) -> {
      result.instance = entityManager.find(this.persistedClass, id);
    });

    return result.instance;
  }

  public Set<T> listMany(String[] ids) throws RequestException {
    Set<T> instances = new HashSet<>();

    for (String id : ids) {
      T instance = this.listOne(id);

      if (instance == null) {
        throw new RequestException(String.format("id named '%s' does not exist", id));
      }

      instances.add(instance);
    }

    return instances;
  }

  public void save(T instance) {
    this.transaction.execute((entityManager) -> entityManager.persist(instance));
  }

  public void update(T newInstance) {
    this.transaction.execute((entityManager) -> entityManager.merge(newInstance));
  }

  public void delete(String id) {
    this.transaction.execute((entityManager) -> {
      T instance = entityManager.find(this.persistedClass, id);
      entityManager.remove(instance);
    });
  }

  protected class SingleResult { T instance; }
  protected class ResultList { List<T> instances; }
}
