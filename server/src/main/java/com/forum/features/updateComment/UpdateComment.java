package com.forum.features.updateComment;

import com.forum.http.HttpEndpointHandler;
import com.forum.repositories.CommentsRepository;

public class UpdateComment {
  public UpdateComment(CommentsRepository commentsRepository) {
    UpdateCommentService service = new UpdateCommentService(commentsRepository);
    UpdateCommentController controller = new UpdateCommentController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
