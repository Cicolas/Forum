package com.forum.features.updatePost;

import java.util.*;

import com.forum.entities.*;
import com.forum.repositories.*;
import com.forum.exceptions.domain.RequestException;
import com.forum.exceptions.domain.RestrictedAccessException;

class UpdatePostService {
  private PostsRepository postsRepository;
  private CategoriesRepository categoriesRepository;

  public UpdatePostService(
    PostsRepository postsRepository,
    CategoriesRepository categoriesRepository
  ) {
    this.postsRepository = postsRepository;
    this.categoriesRepository = categoriesRepository;
  }


  public Post execute(PostUpdateRequest updateRequest) {
    Post post = this.postsRepository.listOne(updateRequest.postId);

    if (post == null) {
      throw new RequestException("post does not exist");
    }

    if (!Objects.equals(post.getAuthorId(), updateRequest.authenticatedUserId)) {
      throw new RestrictedAccessException("cannot update third-party posts");
    }

    if (updateRequest.title != null) {
      post.setTitle(updateRequest.title);
    }

    if (updateRequest.content != null) {
      post.setContent(updateRequest.content);
    }

    if (updateRequest.categoryNames != null) {
      Set<Category> categories = this.categoriesRepository.listMany(updateRequest.categoryNames);
      post.setCategories(categories);
    }

    this.postsRepository.update(post);

    return post;
  }
}
