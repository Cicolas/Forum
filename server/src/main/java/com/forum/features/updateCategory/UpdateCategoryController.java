package com.forum.features.updateCategory;

import com.forum.http.*;
import com.forum.entities.Category;
import com.forum.views.CompleteCategoryView;
import com.google.gson.Gson;

class UpdateCategoryController implements HttpEndpointHandler {
  private UpdateCategoryService updateCategoryService;
  private Gson jsonConverter = new Gson();

  public UpdateCategoryController(UpdateCategoryService updateCategoryService) {
    this.updateCategoryService = updateCategoryService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    String categoryName = request.getPathParam("categoryName");
    RequestBody requestBody = this.jsonConverter.fromJson(request.getBody(), RequestBody.class);

    CategoryUpdateRequest updateRequest = new CategoryUpdateRequest();

    updateRequest.name = categoryName;
    updateRequest.description = requestBody.description;
    updateRequest.color = requestBody.color;

    Category updatedCategory = this.updateCategoryService.execute(updateRequest);
    CompleteCategoryView updatedCategoryView = new CompleteCategoryView(updatedCategory);

    response.json(updatedCategoryView);
  }

  private class RequestBody {
    public String description;
    public String color;
  }
}
