package com.forum.features.listThread;

import java.util.*;
import com.forum.repositories.CommentsRepository;
import com.forum.entities.Comment;

class ListPostCommentsService {
  private CommentsRepository commentsRepository;

  public ListPostCommentsService(CommentsRepository commentsRepository) {
    this.commentsRepository = commentsRepository;
  }

  public List<CommentNode> execute(String postId) {
    List<Comment> rootComments = this.commentsRepository.listRepliesFrom(postId);
    List<CommentNode> listOfComments = rootComments.stream().map(CommentNode::new).toList();
    this.populateCommentReplies(listOfComments);

    return listOfComments;
  }

  private void populateCommentReplies(List<CommentNode> listOfComments) {
    Queue<CommentNode> commentQueue = new LinkedList<>(listOfComments);

    while (commentQueue.size() > 0) {
      CommentNode commentNode = commentQueue.poll();

      List<Comment> replies = this.commentsRepository.listRepliesFrom(commentNode.id);

      replies.forEach((Comment reply) -> {
        CommentNode replyNode = new CommentNode(reply);

        commentNode.replies.add(replyNode);
        commentQueue.offer(replyNode);
      });
    }
  }
}
