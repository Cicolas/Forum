package com.forum.features.createPost;

import com.forum.http.*;
import com.forum.entities.Post;
import com.forum.views.CompactPostView;
import com.google.gson.Gson;

class CreatePostController implements HttpEndpointHandler {
  private CreatePostService createPostService;
  private Gson jsonConverter = new Gson();

  public CreatePostController(CreatePostService service) {
    this.createPostService = service;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    String userId = (String) request.getSessionAttribute("userId");
    RequestBody requestBody = this.jsonConverter.fromJson(request.getBody(), RequestBody.class);

    PostCreationRequest creationRequest = new PostCreationRequest();

    creationRequest.authorId = userId;
    creationRequest.title = requestBody.title;
    creationRequest.content = requestBody.content;
    creationRequest.categoryNames = requestBody.categoryNames;

    Post createdPost = this.createPostService.execute(creationRequest);
    CompactPostView createdPostView = new CompactPostView(createdPost);

    response.status(201);
    response.json(createdPostView);
  }

  private class RequestBody {
    public String title;
    public String content;
    public String[] categoryNames;
  }
}
