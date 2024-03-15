package com.forum.features.listPosts;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.PostsRepository;

public class ListPosts {
  public ListPosts(PostsRepository postsRepository) {
    ListPostsService service = new ListPostsService(postsRepository);
    ListPostsController controller = new ListPostsController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
