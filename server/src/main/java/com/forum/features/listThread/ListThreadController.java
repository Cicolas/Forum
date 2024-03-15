package com.forum.features.listThread;

import java.util.List;
import com.forum.http.*;
import com.forum.entities.Post;

class ListThreadController implements HttpEndpointHandler {
  private ListPostContentService listPostContentService;
  private ListPostCommentsService listPostCommentsService;

  public ListThreadController(
    ListPostContentService listPostContentService,
    ListPostCommentsService listPostCommentsService
  ) {
    this.listPostContentService = listPostContentService;
    this.listPostCommentsService = listPostCommentsService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    String postId = request.getPathParam("postId");

    Post post = this.listPostContentService.execute(postId);
    List<CommentNode> comments = this.listPostCommentsService.execute(postId);

    Thread thread = new Thread(post, comments);

    response.json(thread);
  };
}
