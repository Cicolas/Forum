package com.forum.security;

import java.util.*;
import java.time.Instant;
import com.forum.entities.User;
import com.forum.exceptions.domain.AuthenticationException;
import com.forum.utils.Time;

import com.auth0.jwt.*;
import com.auth0.jwt.JWTCreator.Builder;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.github.cdimascio.dotenv.Dotenv;

public class JWTProviderAuth0Adapter implements JWTProvider {
  private final String issuer = "forum.com";
  private Algorithm algorithm;

  public JWTProviderAuth0Adapter() {
    Dotenv environment = Dotenv.load();
    String secret = environment.get("TOKEN_GENERATION_SECRET");

    this.algorithm = Algorithm.HMAC256(secret);
  }

  public String generate(User user) {
    Builder jwtBuilder = JWT.create();

    jwtBuilder.withIssuer(this.issuer);
    jwtBuilder.withSubject(user.getId());
    jwtBuilder.withExpiresAt(Instant.ofEpochSecond(Time.afterOneHour()));

    this.setTokenClaimAsSet(jwtBuilder, "roles", user.getRoleNames());
    this.setTokenClaimAsSet(jwtBuilder, "permissions", user.getPermissionNames());

    return jwtBuilder.sign(algorithm);
  }

  public ParsedToken parse(String token) throws AuthenticationException {
    JWTVerifier verifier = JWT.require(algorithm)
      .withIssuer(this.issuer)
      .build();

    try {
      ParsedToken forumToken = new ParsedToken();
      DecodedJWT auth0Token = verifier.verify(token);

      forumToken.subject = auth0Token.getSubject();
      forumToken.permissions = this.getTokenClaimAsSet(auth0Token, "permissions");
      forumToken.roles = this.getTokenClaimAsSet(auth0Token, "roles");

      return forumToken;
    } catch (JWTVerificationException exception) {
      throw new AuthenticationException("invalid token");
    }
  }

  private Set<String> getTokenClaimAsSet(DecodedJWT token, String name) {
    Set<String> set = new HashSet<>();

    token
      .getClaim(name)
      .asList(String.class)
      .forEach((item) -> set.add(item));

    return set;
  }

  private void setTokenClaimAsSet(Builder builder, String name, Set<String> set) {
    List<String> value = new ArrayList<>();
    value.addAll(set);

    builder.withClaim(name, value);
  }
}
