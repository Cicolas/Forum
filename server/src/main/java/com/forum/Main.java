package com.forum;

import com.forum.http.*;
import com.forum.http.impl.Javalin.*;
import com.forum.exceptions.HttpExceptionHandlerImpl;
import com.forum.endpoints.*;

import com.forum.features.listPermissions.ListPermissions;
import com.forum.features.createPermission.CreatePermission;
import com.forum.features.deletePermission.DeletePermission;

import com.forum.features.listRoles.ListRoles;
import com.forum.features.createRole.CreateRole;
import com.forum.features.deleteRole.DeleteRole;

import com.forum.features.listUsers.ListUsers;
import com.forum.features.createMember.CreateMember;

import com.forum.features.createAdmin.CreateAdmin;
import com.forum.features.authenticateUser.AuthenticateUser;
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

    app.addExceptionHandler(new HttpExceptionHandlerImpl());

    UsersRepository usersRepository = new HibernateUsersRepository(transaction);
    PostsRepository postsRepository = new HibernatePostsRepository(transaction);
    CommentsRepository commentsRepository = new HibernateCommentsRepository(transaction);
    ContributionsRepository contributionsRepository = new HibernateContributionsRepository(transaction);
    RankingsRepository rankingsRepository = new HibernateRankingsRepository(transaction);
    CategoriesRepository categoriesRepository = new HibernateCategoriesRepository(transaction);
    RolesRepository rolesRepository = new HibernateRolesRepository(transaction);
    PermissionsRepository permissionsRepository = new HibernatePermissionsRepository(transaction);

    var restrictedEndpoint = new RestrictedEndpointFactory();

    app.get("/permissions", restrictedEndpoint.create(
      new ListPermissions(permissionsRepository).handler,
      "list-permissions"
    ));

    app.post("/permissions", restrictedEndpoint.create(
      new CreatePermission(permissionsRepository).handler,
      "create-permission"
    ));

    app.delete("/permissions/{permissionName}", restrictedEndpoint.create(
      new DeletePermission(permissionsRepository).handler,
      "delete-permission"
    ));

    app.get("/roles", restrictedEndpoint.create(
      new ListRoles(rolesRepository).handler,
      "list-roles"
    ));

    app.post("/roles", restrictedEndpoint.create(
      new CreateRole(rolesRepository, permissionsRepository).handler,
      "create-role"
    ));

    app.delete("/roles/{roleName}", restrictedEndpoint.create(
      new DeleteRole(rolesRepository).handler,
      "delete-role"
    ));

    app.get("/users", new ListUsers(usersRepository).handler);

    app.post("/members", new CreateMember(usersRepository, rolesRepository, permissionsRepository).handler);
    app.post("/admins",  restrictedEndpoint.create(
      new CreateAdmin(usersRepository, rolesRepository, permissionsRepository).handler,
      "create-admin"
    ));

    app.post("/login", new AuthenticateUser(usersRepository).handler);

    app.put("/users/{userId}", restrictedEndpoint.create(
      new UpdateUser(usersRepository).handler,
      "update-user"
    ));

    app.delete("/users/{userId}", restrictedEndpoint.create(
      new DeleteUser(usersRepository).handler,
      "delete-user"
    ));

    app.get("/posts", new ListPosts(postsRepository).handler);
    app.get("/posts/{postId}", new ListThread(postsRepository, commentsRepository).handler);

    app.post("/posts", restrictedEndpoint.create(
      new CreatePost(postsRepository, usersRepository, categoriesRepository).handler,
      "create-contribution"
    ));

    app.put("/posts/{postId}", restrictedEndpoint.create(
      new UpdatePost(postsRepository, categoriesRepository).handler,
      "update-contribution"
    ));

    app.delete("/posts/{contributionId}", restrictedEndpoint.create(
      new DeleteContribution(contributionsRepository).handler,
      "delete-contribution"
    ));

    app.post("/comments", restrictedEndpoint.create(
      new CreateComment(contributionsRepository, commentsRepository, usersRepository).handler,
      "create-contribution"
    ));

    app.put("/comments/{commentId}", restrictedEndpoint.create(
      new UpdateComment(commentsRepository).handler,
      "update-contribution"
    ));

    app.delete("/comments/{contributionId}", restrictedEndpoint.create(
      new DeleteContribution(contributionsRepository).handler,
      "delete-contribution"
    ));

    app.put("/ranking/{contributionId}/{action}", restrictedEndpoint.create(
      new RankContribution(usersRepository, contributionsRepository, rankingsRepository).handler,
      "rank-contribution"
    ));

    app.get("/categories", new ListCategories(categoriesRepository).handler);

    app.post("/categories", restrictedEndpoint.create(
      new CreateCategory(categoriesRepository).handler,
      "create-category"
    ));

    app.put("/categories/{categoryName}", restrictedEndpoint.create(
      new UpdateCategory(categoriesRepository).handler,
      "update-category"
    ));

    app.delete("/categories/{categoryName}", restrictedEndpoint.create(
      new DeleteCategory(categoriesRepository).handler,
      "delete-category"
    ));

    app.use("*", new UnavailableResource());
  }
}
