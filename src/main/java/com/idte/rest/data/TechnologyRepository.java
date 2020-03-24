package com.idte.rest.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.idte.rest.data.Technology;

@RepositoryRestResource(exported = false)
public interface TechnologyRepository extends JpaRepository<Technology, String> {
  Technology findByTitle(String title);
}