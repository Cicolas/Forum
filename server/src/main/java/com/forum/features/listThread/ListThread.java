package com.forum.features.listThread;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.*;

public class ListThread {
  public ListThread(
    PostsRepository postsRepository,
    CommentsRepository commentsRepository
  ) {
    ListPostContentService listPostContentService = new ListPostContentService(postsRepository);
    ListPostCommentsService listPostCommentsService = new ListPostCommentsService(commentsRepository);

    ListThreadController controller = new ListThreadController(
      listPostContentService,
      listPostCommentsService
    );

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
