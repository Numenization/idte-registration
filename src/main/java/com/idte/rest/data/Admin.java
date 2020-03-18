package com.idte.rest.data;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Admin {
  @Id
  @Column(unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO)
  protected Long id;

  @Column(unique = true)
  protected String username;
  protected String password;
  @Column(unique = true)
  protected String email;

  protected boolean enabled;
  protected boolean tokenExpired;

  @JsonIgnore
  @ManyToMany
  @JoinTable(
    name = "admins_roles",
    joinColumns = @JoinColumn(
      name = "admin_id", referencedColumnName = "id"
    ),
    inverseJoinColumns = @JoinColumn(
      name = "role_id", referencedColumnName = "id"
    )
  )
  protected Collection<Role> roles;

  public Admin() {
    super();
    this.enabled = false;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String name) {
    this.username = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String pass) {
    this.password = pass;
  }

  public Collection<Role> getRoles() {
    return roles;
  }

  public void setRoles(final Collection<Role> roles) {
    this.roles = roles;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  @Override
  public int hashCode() {
      final int prime = 31;
      int result = 1;
      result = (prime * result) + ((email == null) ? 0 : email.hashCode());
      return result;
  }

  @Override
  public boolean equals(final Object obj) {
      if (this == obj) {
          return true;
      }
      if (obj == null) {
          return false;
      }
      if (getClass() != obj.getClass()) {
          return false;
      }
      final Admin user = (Admin) obj;
      if (!email.equals(user.email)) {
          return false;
      }
      return true;
  }

  @Override
  public String toString() {
      final StringBuilder builder = new StringBuilder();
      builder.append("User [id=").append(id).append(", name=").append(username).append(", email=").append(email).append(", password=").append(password).append(", enabled=").append(enabled).append(", roles=").append(roles).append("]");
      return builder.toString();
  }
}