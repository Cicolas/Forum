package com.forum;

import com.forum.http.*;
import com.forum.http.impl.Javalin.*;
import com.forum.exceptions.HttpExceptionHandlerImpl;
import com.forum.endpoints.*;

import com.forum.features.listUsers.ListUsers;
import com.forum.features.createUser.CreateUser;
import com.forum.features.updateUser.UpdateUser;
import com.forum.features.deleteUser.DeleteUser;

import com.forum.features.listPosts.ListPosts;
import com.forum.features.listThread.ListThread;
import com.forum.features.createPost.CreatePost;
import com.forum.features.updatePost.UpdatePost;
import com.forum.features.createComment.CreateComment;
import com.forum.features.updateComment.UpdateComment;
import com.forum.features.deleteContribution.DeleteContribution;
import com.forum.features.rankContribution.RankContribution;

import com.forum.features.listCategories.ListCategories;
import com.forum.features.createCategory.CreateCategory;
import com.forum.features.updateCategory.UpdateCategory;
import com.forum.features.deleteCategory.DeleteCategory;

import com.forum.repositories.impl.hibernate.*;
import com.forum.repositories.*;

public class Main {
  public static void main(String[] args) {
    var transaction = new Transaction("com.forum");

    HttpServer server = new JavalinServer();
    HttpApp app = server.start(4000);

    app.exception(new HttpExceptionHandlerImpl());

    UsersRepository usersRepository = new HibernateUsersRepository(transaction);
    PostsRepository postsRepository = new HibernatePostsRepository(transaction);
    CommentsRepository commentsRepository = new HibernateCommentsRepository(transaction);
    ContributionsRepository contributionsRepository = new HibernateContributionsRepository(transaction);
    RankingsRepository rankingsRepository = new HibernateRankingsRepository(transaction);
    CategoriesRepository categoriesRepository = new HibernateCategoriesRepository(transaction);

    app.get("/users", new ListUsers(usersRepository).handler);
    app.post("/users", new CreateUser(usersRepository).handler);
    app.put("/users/{userId}", new UpdateUser(usersRepository).handler);
    app.delete("/users/{userId}", new DeleteUser(usersRepository).handler);

    app.get("/posts", new ListPosts(postsRepository).handler);
    app.get("/posts/{postId}", new ListThread(postsRepository, commentsRepository).handler);

    app.post("/posts", new CreatePost(postsRepository, usersRepository, categoriesRepository).handler);
    app.put("/posts/{postId}", new UpdatePost(postsRepository, categoriesRepository).handler);
    app.delete("/posts/{contributionId}", new DeleteContribution(contributionsRepository).handler);

    app.post("/comments", new CreateComment(contributionsRepository, commentsRepository, usersRepository).handler);
    app.put("/comments/{commentId}", new UpdateComment(commentsRepository).handler);
    app.delete("/comments/{contributionId}", new DeleteContribution(contributionsRepository).handler);

    app.put(
      "/ranking/{contributionId}/{action}",
      new RankContribution(usersRepository, contributionsRepository, rankingsRepository).handler
    );

    app.get("/categories", new ListCategories(categoriesRepository).handler);
    app.post("/categories", new CreateCategory(categoriesRepository).handler);
    app.put("/categories/{categoryName}", new UpdateCategory(categoriesRepository).handler);
    app.delete("/categories/{categoryName}", new DeleteCategory(categoriesRepository).handler);

    app.use("*", new UnavailableResource());
  }
}
