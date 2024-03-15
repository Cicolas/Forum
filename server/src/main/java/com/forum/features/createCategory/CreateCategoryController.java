package com.forum.features.createCategory;

import com.forum.http.*;
import com.forum.entities.Category;
import com.forum.views.CompleteCategoryView;
import com.google.gson.Gson;

class CreateCategoryController implements HttpEndpointHandler {
  private CreateCategoryService createCategoryService;
  private Gson jsonConverter = new Gson();

  public CreateCategoryController(CreateCategoryService service) {
    this.createCategoryService = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    CategoryCreationRequest creationRequest = this.jsonConverter.fromJson(request.getBody(), CategoryCreationRequest.class);

    Category createdCategory = this.createCategoryService.execute(creationRequest);
    CompleteCategoryView createdCategoryView = new CompleteCategoryView(createdCategory);

    response.status(201);
    response.json(createdCategoryView);
  }
}
