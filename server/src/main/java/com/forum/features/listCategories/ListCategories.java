package com.forum.features.listCategories;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.CategoriesRepository;

public class ListCategories {
  public ListCategories(CategoriesRepository categoriesRepository) {
    ListCategoriesService service = new ListCategoriesService(categoriesRepository);
    ListCategoriesController controller = new ListCategoriesController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
