package com.forum.features.createCategory;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.CategoriesRepository;

public class CreateCategory {
  public CreateCategory(CategoriesRepository categoriesRepository) {
    CreateCategoryService service = new CreateCategoryService(categoriesRepository);
    CreateCategoryController controller = new CreateCategoryController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
