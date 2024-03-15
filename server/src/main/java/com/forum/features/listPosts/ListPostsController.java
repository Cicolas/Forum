package com.forum.features.listPosts;

import java.util.*;
import com.forum.entities.Post;
import com.forum.views.CompletePostView;
import com.forum.http.*;

class ListPostsController implements HttpEndpointHandler {
  private ListPostsService listPostsService;

  public ListPostsController(ListPostsService listPostsService) {
    this.listPostsService = listPostsService;
  }

  public void handle(HttpRequest request, HttpResponse response) {
    PostListingRequest listingRequest = new PostListingRequest();

    listingRequest.title = request.getQueryParam("title");
    listingRequest.authorName = request.getQueryParam("author");
    List<String> categoryNames = request.getQueryParams("category");

    listingRequest.categoryNames = new HashSet<>();
    categoryNames.forEach(listingRequest.categoryNames::add);

    List<Post> posts = this.listPostsService.execute(listingRequest);
    List<CompletePostView> postViews = posts.stream().map(CompletePostView::new).toList();

    response.json(postViews);
  };
}
