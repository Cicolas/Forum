package com.forum.views;

import com.forum.entities.Category;

public class CompactCategoryView {
  public String name;
  public String description;
  public String color;

  public CompactCategoryView(Category category) {
    this.name = category.getName();
    this.description = category.getDescription();
    this.color = category.getColor();
  }
}
