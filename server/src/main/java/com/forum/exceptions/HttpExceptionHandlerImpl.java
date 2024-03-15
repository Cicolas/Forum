package com.forum.exceptions;

import com.forum.http.*;
import com.forum.exceptions.http.*;

public class HttpExceptionHandlerImpl implements HttpExceptionHandler {
  ExceptionMapper exceptionMapper = new ExceptionMapper();

  public void handle(
    HttpRequest request,
    HttpResponse response,
    Exception domainException
  ) {
    HttpException httpException = this.exceptionMapper.map(domainException);
    response.status(httpException.status);
    response.json(httpException);
  }
}
