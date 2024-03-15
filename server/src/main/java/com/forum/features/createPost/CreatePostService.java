package com.forum.features.createPost;

import java.util.*;
import com.forum.repositories.*;
import com.forum.entities.*;
import com.forum.exceptions.domain.RequestException;

class CreatePostService {
  private PostsRepository postsRepository;
  private UsersRepository usersRepository;
  private CategoriesRepository categoriesRepository;

  public CreatePostService(
    PostsRepository postsRepository,
    UsersRepository usersRepository,
    CategoriesRepository categoriesRepository
  ) {
    this.postsRepository = postsRepository;
    this.usersRepository = usersRepository;
    this.categoriesRepository = categoriesRepository;
  }

  public Post execute(PostCreationRequest creationRequest) {
    User author = this.usersRepository.listOne(creationRequest.authorId);

    if (author == null) {
      throw new RequestException("author does not exist");
    }

    Set<Category> categories = this.categoriesRepository.listMany(creationRequest.categoryNames);

    Post post = new Post();
    post.setAuthor(author);
    post.setTitle(creationRequest.title);
    post.setContent(creationRequest.content);
    post.setCategories(categories);

    this.postsRepository.save(post);

    return post;
  }
}
