package com.idte.rest.data;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  protected Long id;

  protected String name;
  @ManyToMany(mappedBy = "roles")
  protected Collection<Admin> users;

  @JsonIgnore
  @ManyToMany
  @JoinTable(
    name = "roles_privileges",
    joinColumns = @JoinColumn(
      name = "role_id", referencedColumnName = "id"
    ),
    inverseJoinColumns = @JoinColumn(
      name = "privilege_id", referencedColumnName = "id"
    )
  )
  protected Collection<Privilege> privileges;

  public Role() {
    super();
  }

  public Role(String name) {
    super();
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Collection<Admin> getUsers() {
    return users;
  }

  public void setUsers(final Collection<Admin> users) {
    this.users = users;
  }

  public Collection<Privilege> getPrivileges() {
    return privileges;
  }

  public void setPrivileges(final Collection<Privilege> privileges) {
    this.privileges = privileges;
  }
  
  @Override
  public int hashCode() {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((name == null) ? 0 : name.hashCode());
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
      final Role role = (Role) obj;
      if (!name.equals(role.name)) {
          return false;
      }
      return true;
  }

  @Override
  public String toString() {
      final StringBuilder builder = new StringBuilder();
      builder.append("Role [name=").append(name).append("]").append("[id=").append(id).append("]");
      return builder.toString();
  }
}