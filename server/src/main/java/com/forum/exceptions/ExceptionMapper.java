package com.forum.exceptions;

import java.util.*;
import com.forum.exceptions.domain.*;
import com.forum.exceptions.http.*;

class ExceptionMapper {
  private Map<String, String> exceptionMapper = new HashMap<>();

  public ExceptionMapper() {
    this.exceptionMapper.put(RequestException.class.getName(), BadRequest.class.getName());
    this.exceptionMapper.put(ResourceException.class.getName(), NotFound.class.getName());
    this.exceptionMapper.put(AuthenticationException.class.getName(), Unauthorized.class.getName());
    this.exceptionMapper.put(RestrictedAccessException.class.getName(), Forbidden.class.getName());
  }

  public HttpException map(Exception domainException) {
    String errorMessage = domainException.getMessage();

    String domainExceptionClassName = domainException.getClass().getName();
    String httpExceptionClassName = this.exceptionMapper.get(domainExceptionClassName);

    try {
      var httpExceptionClass = Class.forName(httpExceptionClassName);
      var httpExceptionConstructor = httpExceptionClass.getDeclaredConstructor(String.class);
      return (HttpException) httpExceptionConstructor.newInstance(errorMessage);
    } catch (Exception exception) {
      domainException.printStackTrace();
      return new InternalServerError(errorMessage);
    }
  }
}
