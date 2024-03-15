package com.forum.views;

import com.forum.entities.Category;

public class CompleteCategoryView {
  public String name;
  public String description;
  public String color;
  public int createdAt;

  public CompleteCategoryView(Category category) {
    CompactCategoryView compactView = new CompactCategoryView(category);

    this.name = compactView.name;
    this.description = compactView.description;
    this.color = compactView.color;

    this.createdAt = category.getCreationTimestamp();
  }
}
