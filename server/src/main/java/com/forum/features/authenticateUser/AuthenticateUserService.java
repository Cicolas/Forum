package com.forum.features.authenticateUser;

import com.forum.entities.User;
import com.forum.repositories.UsersRepository;
import com.forum.exceptions.domain.RequestException;
import com.forum.security.HashProvider;
import com.forum.security.JWTProvider;

class AuthenticateUserService {
  private UsersRepository usersRepository;
  private HashProvider hashProvider;
  private JWTProvider jwtProvider;

  public AuthenticateUserService(
    UsersRepository usersRepository,
    HashProvider hashProvider,
    JWTProvider jwtProvider
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.jwtProvider = jwtProvider;
  }

  public String execute(UserAuthenticationRequest authRequest) {
    User user = this.usersRepository.listOneByEmail(authRequest.email);

    if (user == null) {
      this.throwUserOrPasswordInvalid();
    }

    boolean passwordMatches = this.hashProvider.equals(authRequest.password, user.getPassword());

    if (!passwordMatches) {
      this.throwUserOrPasswordInvalid();
    }

    String token = this.jwtProvider.generate(user);

    return token;
  }

  private void throwUserOrPasswordInvalid() {
    throw new RequestException("user or password invalid");
  }
}
