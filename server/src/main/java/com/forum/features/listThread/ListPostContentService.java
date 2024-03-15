package com.forum.features.listThread;

import com.forum.entities.Post;
import com.forum.exceptions.domain.RequestException;
import com.forum.repositories.PostsRepository;

class ListPostContentService {
  private PostsRepository postsRepository;

  public ListPostContentService(PostsRepository postsRepository) {
    this.postsRepository = postsRepository;
  }

  public Post execute(String postId) {
    Post post = this.postsRepository.listOne(postId);

    if (post == null) {
      throw new RequestException("post does not exist");
    }

    return post;
  }
}
