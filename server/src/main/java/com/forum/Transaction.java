package com.forum;

import java.util.function.Consumer;
import jakarta.persistence.*;

public class Transaction {
  private EntityManagerFactory entityManagerFactory;

  public Transaction(String persistenceUnit) {
    this.entityManagerFactory = Persistence.createEntityManagerFactory(persistenceUnit);
  }

  public void execute(Consumer<EntityManager> consumer) {
    EntityManager entityManager = this.entityManagerFactory.createEntityManager();
    EntityTransaction transaction = entityManager.getTransaction();

    try {
      transaction.begin();
      consumer.accept(entityManager);
      transaction.commit();
    }
    catch (Exception error) {
      if (transaction.isActive()) transaction.rollback();
      throw error;
    }
    finally {
      entityManager.close();
    }
  }
}
