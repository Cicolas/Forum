package com.forum.entities;

import com.forum.utils.*;
import jakarta.persistence.*;

@Entity
@Table(name = "permissions")
public class Permission {
  @Id
  private String name;
  private String description;
  private int createdAt;

  public Permission() {
    this.createdAt = Time.now();
  }

  public String getName() { return this.name; }
  public String getDescription() { return this.description; }
  public int getCreationTimestamp() { return this.createdAt; }

  public void setName(String name) { this.name = name; }
  public void setDescription(String description) { this.description = description; }
}
