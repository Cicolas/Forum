package com.forum.entities;

import java.util.*;
import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post extends Contribution {
  private String title;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "post_categories",
    joinColumns = @JoinColumn(name = "post_id"),
    inverseJoinColumns = @JoinColumn(name = "category_name")
  )
  private Set<Category> categories;

  public Post() {}

  public String getTitle() { return this.title; }
  public Set<Category> getCategories() { return this.categories; }
  public Set<String> getCategoryNames() {
    Set<String> categoryNames = new HashSet<>();
    this.getCategories().forEach((category) -> categoryNames.add(category.getName()));
    return categoryNames;
  }

  public void setTitle(String title) {
    this.setLastUpdate();
    this.title = title;
  }

  public void setCategories(Set<Category> categories) {
    this.setLastUpdate();
    this.categories = categories;
  }
}
