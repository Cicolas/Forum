package com.forum.features.listPosts;

import java.util.*;
import java.util.regex.*;
import com.forum.entities.Post;
import com.forum.repositories.PostsRepository;

class ListPostsService {
  private PostsRepository postsRepository;

  public ListPostsService(PostsRepository postsRepository) {
    this.postsRepository = postsRepository;
  }

  public List<Post> execute(PostListingRequest listingRequest) {
    return this.postsRepository.list().stream().filter((post) -> {
      boolean authorMatches = listingRequest.authorName == null ? true
        : this.checkIfAuthorMatches(post.getAuthorName(), listingRequest.authorName);

      boolean someCategoriesMatch = listingRequest.categoryNames.size() == 0 ? true
        : this.checkIfSomeCategoriesMatch(post.getCategoryNames(), listingRequest.categoryNames);

      return authorMatches && someCategoriesMatch;
    }).toList();
  }

  private boolean checkIfAuthorMatches(String baseAuthor, String inputAuthor) {
    Pattern pattern = Pattern.compile(inputAuthor, Pattern.CASE_INSENSITIVE);
    Matcher matcher = pattern.matcher(baseAuthor);
    return matcher.find();
  }

  private boolean checkIfSomeCategoriesMatch(Set<String> baseCategories, Set<String> inputCategories) {
    return inputCategories.stream().anyMatch(baseCategories::contains);
  }
}
