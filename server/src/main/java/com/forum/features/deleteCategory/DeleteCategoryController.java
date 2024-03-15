package com.forum.features.deleteCategory;

import com.forum.http.*;

class DeleteCategoryController implements HttpEndpointHandler {
  private DeleteCategoryService deleteCategoryService;

  public DeleteCategoryController(DeleteCategoryService deleteCategoryService) {
    this.deleteCategoryService = deleteCategoryService;
  }

  @Override
  public void handle(HttpRequest request, HttpResponse response) {
    String categoryName = request.getPathParam("categoryName");

    this.deleteCategoryService.execute(categoryName);

    response.status(204);
  }
}
