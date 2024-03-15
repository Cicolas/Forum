package com.forum.features.createCategory;

import com.forum.entities.Category;
import com.forum.repositories.CategoriesRepository;
import com.forum.exceptions.domain.RequestException;

class CreateCategoryService {
  private CategoriesRepository categoriesRepository;

  public CreateCategoryService(CategoriesRepository categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  public Category execute(CategoryCreationRequest creationRequest) {
    Category category = this.categoriesRepository.listOne(creationRequest.name);

    if (category != null) {
      throw new RequestException("category already exists");
    }

    category = new Category();
    category.setName(creationRequest.name);
    category.setDescription(creationRequest.description);
    category.setColor(creationRequest.color);

    this.categoriesRepository.save(category);

    return category;
  }
}
