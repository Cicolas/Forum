package com.forum.features.deleteCategory;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.CategoriesRepository;

public class DeleteCategory {
  public DeleteCategory(CategoriesRepository categoriesRepository) {
    DeleteCategoryService service = new DeleteCategoryService(categoriesRepository);
    DeleteCategoryController controller = new DeleteCategoryController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
