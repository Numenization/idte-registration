package com.idte.rest;

import java.util.Map;
import com.idte.rest.data.Event;
import com.idte.rest.data.EventRepository;

import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping
public class EventController{

    @Autowired
    private EventRepository events;


    @PostMapping(path = "/events", consumes = "application/json", produces = "application/json")
    public Object postEvent(@RequestBody Map <String, String> json){
    String registrationStart = json.get("registrationStart");
    String registrationEnd = json.get("registrationEnd");
    String techSubStart = json.get("techSubStart");
    String techSubEnd = json.get("techSubEnd");
    
    Event event = new Event();
    event.setEventID(event.GenerateKey());
    event.setRegistrationDates(registrationStart, registrationEnd);
    event.setTechnologyDates(techSubStart, techSubEnd);
    event.setRegStatus(false);
    event.setTechStatus(false);    
    try {
        return new ResponseEntity<>(events.save(event), HttpStatus.CREATED);
    }
    catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}

// Creates a new event that has currentEvent as "true", and returns event from DB that has the same value
@GetMapping (path="/findCurrent")
public Object findCurrentEvent(){
    System.out.print("Success");
    Event find = new Event();
    
    Example <Event> example = Example.of(find);
    Event event = events.findOne(example).orElse(null);
    if(event != null && event.getCurrentEvent() == true){
        return new ResponseEntity<>(event, HttpStatus.OK);
    }
    else{
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }    
}

// Inverts an events regStatus value
@PutMapping(path = "/currentRegStatus")
public Object updateCurrentRegStatus(){
    
    Event testEvent = new Event();
    System.out.println(testEvent.getRegistrationStatus());
    System.out.println(testEvent.getTechnologyStatus());

   // ExampleMatcher ignoringExampleMatcher = ExampleMatcher.matchingAny().withMatcher("currentEvent", ExampleMatcher.GenericPropertyMatchers.startsWith().ignoreCase()).withIgnorePaths("eventID", "registrationEndDate", "registrationStartDate","technologyEndDate","technologyStartDate", "technologyStatus","registrationStatus");
    Example<Event> example = Example.of(testEvent);//, ignoringExampleMatcher);
    
    System.out.println("test");
    Event event = events.findOne(example).orElse(null);
    System.out.println("test2");
  if (event == null){
    System.out.println("fail");
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }
  boolean changes = false;
 
  event.changeRegStatus();
  changes = true;
  if (changes){
      events.save(event);
      System.out.println("ok");
      return new ResponseEntity<>(HttpStatus.OK);
  }
  else {
    System.out.println("not modified");
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
  }
}

// Inverts an events techSubStatus value
@PutMapping(path = "/techStatus", consumes = "application/json", produces = "application/json")
public Object updateTechStatus(){

    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);
  if (event == null){
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }
  boolean changes = false;
  
  event.changeTechStatus();
  changes = true;
  if (changes){
      events.save(event);
      return new ResponseEntity<>(HttpStatus.OK);
  }
  else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
  }
}

//Inverts an events currentEvent value
@PutMapping(path = "/eventStatus", consumes = "application/json", produces = "application/json")
public Object updateCurrentEventStatus(){

  Event testEvent = new Event();
  Example<Event> example = Example.of(testEvent);
  Event event = events.findOne(example).orElse(null);
if (event == null){
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}

boolean changes = false;

event.changeEventStatus();
changes = true;
if (changes){
    events.save(event);
    return new ResponseEntity<>(HttpStatus.OK);
}
else {
    return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
}
}

}
