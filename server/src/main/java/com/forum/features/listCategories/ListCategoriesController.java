package com.forum.features.listCategories;

import java.util.List;
import com.forum.entities.Category;
import com.forum.views.CompleteCategoryView;
import com.forum.http.*;

class ListCategoriesController implements HttpEndpointHandler {
  private ListCategoriesService listCategoriesService;

  public ListCategoriesController(ListCategoriesService listCategoriesService) {
    this.listCategoriesService = listCategoriesService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    List<Category> categories = this.listCategoriesService.execute();
    List<CompleteCategoryView> categoryViews = categories.stream().map(CompleteCategoryView::new).toList();

    response.json(categoryViews);
  }
}
