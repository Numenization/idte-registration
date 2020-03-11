
package com.idte.rest.data;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

import com.idte.rest.data.Event;

@RepositoryRestResource(exported = false)
public interface EventRepository extends JpaRepository<Event, String> {
   
}