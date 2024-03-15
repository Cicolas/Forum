package com.forum.http.impl.Javalin;

import java.lang.reflect.Type;
import io.javalin.json.JsonMapper;
import com.google.gson.GsonBuilder;
import com.google.gson.Gson;

class GsonMapper implements JsonMapper {
  private Gson gson = new GsonBuilder().serializeNulls().create();

  public String toJsonString(Object obj, Type type) {
    return gson.toJson(obj, type);
  }

  public <T> T fromJsonString(String json, Type targetType) {
    return gson.fromJson(json, targetType);
  }
}
