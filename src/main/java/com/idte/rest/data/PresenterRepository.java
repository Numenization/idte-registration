package com.idte.rest.data;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

import com.idte.rest.data.Presenter;

@RepositoryRestResource(exported = false)
public interface PresenterRepository extends JpaRepository<Presenter, String> {
  List<Presenter> findAll(Specification<Evaluator> spec);

  public static Specification<Presenter> containsTextInAttributes(String text, List<String> attributes) {
    if (!text.contains("%")) {
        text = "%" + text + "%";
    }
    String finalText = text;
    return (root, query, builder) -> builder.or(
            builder.like(root.get("lastName"), finalText),
            builder.like(root.get("firstName"), finalText),
            builder.like(root.get("id"), finalText),
            builder.like(root.get("email"), finalText),
            builder.like(root.get("nickname"), finalText),
            builder.like(root.get("phoneNumber"), finalText),
            builder.like(root.get("cellNumber"), finalText),
            builder.like(root.get("city"), finalText),
            builder.like(root.get("country"), finalText)
    );
  }
}