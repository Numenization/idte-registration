package com.idte.rest.data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Technology {
  @Id
  protected String id;
  protected String title;
  protected String description;
  protected String category;
  protected String type;
  protected String shippingCity;
  protected String shippingCountry;
  protected String source;
  protected String fordContact;
  protected String fordPresenter;
  protected String director;
  protected String supplierCompany;
  protected String dateCreated;
  protected String lastModified;
  protected String modifiedBy;
  protected String comments;

  public void setId(String id) {
    this.id = id;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public void setType(String type) {
    this.type = type;
  }

  public void setShippingCity(String shippingCity) {
    this.shippingCity = shippingCity;
  }

  public void setShippingCountry(String shippingCountry) {
    this.shippingCountry = shippingCountry;
  }

  public void setSource(String source) {
    this.source = source;
  }

  public void setFordContact(String fordContact) {
    this.fordContact = fordContact;
  }

  public void setFordPresenter(String fordPresenter) {
    this.fordPresenter = fordPresenter;
  }

  public void setDirector(String director) {
    this.director = director;
  }

  public void setSupplierCompany(String supplierCompany) {
    this.supplierCompany = supplierCompany;
  }

  public void setDateCreated(String dateCreated) {
    this.dateCreated = dateCreated;
  }

  public void setLastModified(String lastModified) {
    this.lastModified = lastModified;
  }

  public void setModifiedBy(String modifiedBy) {
    this.modifiedBy = modifiedBy;
  }

  public void setComments(String comments) {
    this.comments = comments;
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getCategory() {
    return category;
  }

  public String getType() {
    return type;
  }

  public String getShippingCity() {
    return shippingCity;
  }

  public String getShippingCountry() {
    return shippingCountry;
  }

  public String getSource() {
    return source;
  }

  public String getFordContact() {
    return fordContact;
  }

  public String getFordPresenter() {
    return fordPresenter;
  }

  public String getDirector() {
    return director;
  }

  public String getSupplierCompany() {
    return supplierCompany;
  }

  public String getDateCreated() {
    return dateCreated;
  }

  public String getLastModified() {
    return lastModified;
  }

  public String getModifiedBy() {
    return modifiedBy;
  }

  public String getComments() {
    return comments;
  }
}