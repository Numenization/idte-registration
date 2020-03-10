
package com.idte.rest.data;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

import com.idte.rest.data.Event;

@RepositoryRestResource(exported = false)
public interface EventRepository extends JpaRepository<Event, String> {
    
    public static Specification<Event> containsTextInAttributes(String text, List<String> attributes) {
        if (!text.contains("%")) {
            text = "%" + text + "%";
        }
        String finalText = text;
        return (root, query, builder) -> builder.or(
                builder.like(root.get("registrationStartDate"), finalText),
                builder.like(root.get("registrationEndDate"), finalText),
                builder.like(root.get("technologyStartDate"), finalText),
                builder.like(root.get("technologyEndDate"), finalText),
                builder.like(root.get("registrationStatus"), finalText),
                builder.like(root.get("registrationStatus"), finalText),
                builder.like(root.get("technologyStatus"), finalText)
              
        );
    }
    
}