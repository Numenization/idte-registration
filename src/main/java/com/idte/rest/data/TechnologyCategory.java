package com.idte.rest.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TechnologyCategory {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  protected int id;
  protected String category;

  public TechnologyCategory(String category) {
    this.category = category;
  }

  public TechnologyCategory() {
  }

  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getCategory() {
    return this.category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  @Override
  public String toString() {
    return "{" +
      " id='" + getId() + "'" +
      ", category='" + getCategory() + "'" +
      "}";
  }

}