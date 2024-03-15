package com.forum.features.updatePost;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.CategoriesRepository;
import com.forum.repositories.PostsRepository;

public class UpdatePost {
  public UpdatePost(
    PostsRepository postsRepository,
    CategoriesRepository categoriesRepository
  ) {
    UpdatePostService service = new UpdatePostService(postsRepository, categoriesRepository);
    UpdatePostController controller = new UpdatePostController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
