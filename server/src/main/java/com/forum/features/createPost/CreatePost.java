package com.forum.features.createPost;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.*;

public class CreatePost {
  public CreatePost(
    PostsRepository postsRepository,
    UsersRepository usersRepository,
    CategoriesRepository categoriesRepository
  ) {
    CreatePostService service = new CreatePostService(
      postsRepository,
      usersRepository,
      categoriesRepository
    );

    CreatePostController controller = new CreatePostController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
