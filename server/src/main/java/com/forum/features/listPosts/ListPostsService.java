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
      boolean titleMatches = listingRequest.title == null ? true
        : this.matches(post.getTitle(), listingRequest.title);

      boolean authorMatches = listingRequest.authorName == null ? true
        : this.matches(post.getAuthorName(), listingRequest.authorName);

      boolean anyCategoriesMatch = listingRequest.categoryNames.size() == 0 ? true
        : this.matchesAny(post.getCategoryNames(), listingRequest.categoryNames);

      return titleMatches && authorMatches && anyCategoriesMatch;
    }).toList();
  }

  private boolean matches(String sequence, String subsequence) {
    Pattern pattern = Pattern.compile(subsequence, Pattern.CASE_INSENSITIVE);
    Matcher matcher = pattern.matcher(sequence);
    return matcher.find();
  }

  private boolean matchesAny(Set<String> sequences, Set<String> subsequences) {
    for (String sequence : sequences)
      for (String subsequence : subsequences)
        if (this.matches(sequence, subsequence))
          return true;
    return false;
  }
}
