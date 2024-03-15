package com.forum.repositories;

import java.util.*;

public interface Repository<T> {
  public List<T> list();
  public T listOne(String id);
  public Set<T> listMany(String[] ids);
  public void save(T instance);
  public void update(T newInstance);
  public void delete(String id);
}
