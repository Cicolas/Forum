package com.forum.features.deleteCategory;

import com.forum.entities.Category;
import com.forum.repositories.CategoriesRepository;
import com.forum.exceptions.domain.RequestException;

class DeleteCategoryService {
  private CategoriesRepository categoriesRepository;

  public DeleteCategoryService(CategoriesRepository categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  public void execute(String categoryName) {
    Category category = this.categoriesRepository.listOne(categoryName);

    if (category == null) {
      throw new RequestException("category does not exist");
    }

    this.categoriesRepository.delete(categoryName);
  }
}
