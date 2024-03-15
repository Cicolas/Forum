package com.forum.features.createComment;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.*;

public class CreateComment {
  public CreateComment(
    ContributionsRepository contributionsRepository,
    CommentsRepository commentsRepository,
    UsersRepository usersRepository
  ) {
    CreateCommentService service = new CreateCommentService(
      contributionsRepository,
      commentsRepository,
      usersRepository
    );

    CreateCommentController controller = new CreateCommentController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
