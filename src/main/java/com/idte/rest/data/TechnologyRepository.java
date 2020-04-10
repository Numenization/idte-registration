package com.idte.rest.data;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;
import com.idte.rest.data.Technology;

@RepositoryRestResource(exported = false)
public interface TechnologyRepository extends JpaRepository<Technology, String> {
  Technology findByTitle(String title);

  List<Technology> findAll(Specification<Technology> spec);

  public static Specification<Technology> containsTextInAttributes(String text, List<String> attributes) {
    if (!text.contains("%")) {
        text = "%" + text + "%";
    }
    String finalText = text;
    return (root, query, builder) -> builder.or(
            builder.like(root.get("type"), finalText),
            builder.like(root.get("category"), finalText),
            builder.like(root.get("description"), finalText),
            builder.like(root.get("director"), finalText),
            builder.like(root.get("fordContact"), finalText),
            builder.like(root.get("fordPresenter"), finalText),
            builder.like(root.get("shippingCity"), finalText),
            builder.like(root.get("shippingCountry"), finalText),
            builder.like(root.get("source"), finalText),
            builder.like(root.get("supplierCompany"), finalText),
            builder.like(root.get("title"), finalText)
          
    );
  }



  
}