package com.idte.rest;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.idte.rest.data.Error;
import com.idte.rest.data.Technology;
import com.idte.rest.data.TechnologyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/idte")
public class TechnologyController {
  @Autowired
  private TechnologyRepository technologies;

  @GetMapping(path="/technologies/all", produces = "application/json")
  public Iterable<Technology> findAllTechnologies() {
    return technologies.findAll();
  }

  @GetMapping(path="/technologies", consumes = "application/json", produces = "application/json")
  public Object findTechnology(@RequestBody Map<String, String> json) {
    Technology find = new Technology();
    if(json.get("id") != null) {
      find.setId(json.get("id"));
    }
    if(json.get("title") != null) {
      find.setTitle(json.get("title"));
    }
    Example<Technology> example = Example.of(find);
    Technology technology = technologies.findOne(example).orElse(null);
    if(technology != null) {
      return new ResponseEntity<>(technology, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping(path = "/technologies", consumes = "application/json", produces = "application/json")
  public Object createTechnology(@RequestBody Technology technology) {
    Technology newTechnology = Technology.from(technology);

    Technology uniqueTest = new Technology();
    uniqueTest.setTitle(newTechnology.getTitle());
    Example<Technology> example = Example.of(uniqueTest);
    if(technologies.findOne(example).orElse(null) != null) {
      return new ResponseEntity<>(new Error("Entity with title " + uniqueTest.getTitle() + " already exists!"), HttpStatus.CONFLICT);
    }

    DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    Date date = new Date();
    String currentDateTime = dateFormat.format(date);
    newTechnology.setDateCreated(currentDateTime);
    newTechnology.setLastModified(currentDateTime);

    try {
      newTechnology.createId();
      return new ResponseEntity<>(technologies.save(newTechnology), HttpStatus.OK);
    }
    catch(Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // TODO: Implement update for technologies

  // TODO: Implement delete for technologies
}