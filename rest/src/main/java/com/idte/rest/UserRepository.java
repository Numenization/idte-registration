package com.idte.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.idte.rest.data.TestUser;

@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<TestUser, String> {

}