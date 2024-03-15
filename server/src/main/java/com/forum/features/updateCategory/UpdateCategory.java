package com.forum.features.updateCategory;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.CategoriesRepository;

public class UpdateCategory {
  public UpdateCategory(CategoriesRepository categoriesRepository) {
    UpdateCategoryService service = new UpdateCategoryService(categoriesRepository);
    UpdateCategoryController controller = new UpdateCategoryController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
