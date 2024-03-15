package com.forum.features.createComment;

import com.forum.http.*;
import com.forum.entities.Comment;
import com.forum.views.CommentView;
import com.google.gson.Gson;

class CreateCommentController implements HttpEndpointHandler {
  private CreateCommentService createCommentService;
  private Gson jsonConverter = new Gson();

  public CreateCommentController(CreateCommentService service) {
    this.createCommentService = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    String userId = (String) request.getSessionAttribute("userId");
    RequestBody requestBody = this.jsonConverter.fromJson(request.getBody(), RequestBody.class);

    CommentCreationRequest creationRequest = new CommentCreationRequest();

    creationRequest.parentId = requestBody.parentId;
    creationRequest.authorId = userId;
    creationRequest.content = requestBody.content;

    Comment createdComment = this.createCommentService.execute(creationRequest);
    CommentView createdCommentView = new CommentView(createdComment);

    response.status(201);
    response.json(createdCommentView);
  }

  private class RequestBody {
    public String parentId;
    public String content;
  }
}
