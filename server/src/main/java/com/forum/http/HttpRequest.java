package com.forum.http;

import java.util.List;

public interface HttpRequest {
  public String getHeader(String name);
  public String getBody();
  public String getPathParam(String name);
  public String getQueryParam(String name);
  public List<String> getQueryParams(String name);
  public Object getSessionAttribute(String name);
  public void setSessionAttribute(String name, Object value);
}
