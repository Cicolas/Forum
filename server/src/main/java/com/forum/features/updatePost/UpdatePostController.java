package com.forum.features.updatePost;

import com.forum.http.*;
import com.forum.entities.Post;
import com.forum.views.CompactPostView;
import com.google.gson.Gson;

class UpdatePostController implements HttpEndpointHandler {
  private UpdatePostService updatePostService;
  private Gson jsonConverter = new Gson();

  public UpdatePostController(UpdatePostService updatePostService) {
    this.updatePostService = updatePostService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    String authenticatedUserId = (String) request.getSessionAttribute("userId");
    String postId = request.getPathParam("postId");

    RequestBody requestBody = this.jsonConverter.fromJson(request.getBody(), RequestBody.class);

    PostUpdateRequest updateRequest = new PostUpdateRequest();

    updateRequest.authenticatedUserId = authenticatedUserId;
    updateRequest.postId = postId;
    updateRequest.title = requestBody.title;
    updateRequest.content = requestBody.content;
    updateRequest.categoryNames = requestBody.categoryNames;

    Post updatedPost = this.updatePostService.execute(updateRequest);
    CompactPostView updatedPostView = new CompactPostView(updatedPost);

    response.json(updatedPostView);
  }

  private class RequestBody {
    public String title;
    public String content;
    public String[] categoryNames;
  }
}
