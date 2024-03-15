package com.forum.features.updateCategory;

import com.forum.entities.Category;
import com.forum.repositories.CategoriesRepository;
import com.forum.exceptions.domain.RequestException;

class UpdateCategoryService {
  private CategoriesRepository categoriesRepository;

  public UpdateCategoryService(CategoriesRepository categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  public Category execute(CategoryUpdateRequest updateRequest) {
    Category category = categoriesRepository.listOne(updateRequest.name);

    if (category == null) {
      throw new RequestException("category does not exist");
    }

    if (updateRequest.description != null) {
      category.setDescription(updateRequest.description);
    }

    if (updateRequest.color != null) {
      category.setColor(updateRequest.color);
    }

    categoriesRepository.update(category);

    return category;
  }
}
