package com.forum.entities;

import com.forum.utils.*;
import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {
  @Id
  private String name;
  private String description;
  private String color;
  private int createdAt;

  public Category() {
    this.createdAt = Time.now();
  }

  public String getName() { return this.name; }
  public String getDescription() { return this.description; }
  public String getColor() { return this.color; }
  public int getCreationTimestamp() { return this.createdAt; }

  public void setName(String name) { this.name = name; }
  public void setDescription(String description) { this.description = description; }
  public void setColor(String color) { this.color = color; }
}
