package com.forum.features.authenticateUser;

import com.forum.repositories.UsersRepository;
import com.forum.http.HttpEndpointHandler;
import com.forum.security.*;

public class AuthenticateUser {
  private HashProvider hashProvider = new HashProviderBCryptAdapter();
  private JWTProvider jwtProvider = new JWTProviderAuth0Adapter();

  public AuthenticateUser(UsersRepository usersRepository) {
    AuthenticateUserService service = new AuthenticateUserService(
      usersRepository,
      this.hashProvider,
      this.jwtProvider
    );

    AuthenticateUserController controller = new AuthenticateUserController(service);

    this.handler = controller;
  }

  public HttpEndpointHandler handler;
}
