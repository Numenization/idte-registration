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
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null); 
    
  if (event == null){
      System.out.println("1st null");
      testEvent.setRegStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null){
        System.out.println("2nd null");
        testEvent.setRegStatus(false);
        testEvent.setTechStatus(true);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null){
            System.out.println("3rd null");
            testEvent.setRegStatus(true);
            testEvent.setTechStatus(true);
            example = Example.of(testEvent);
            event = events.findOne(example).orElse(null);
            if (event == null){
                System.out.println("Fuck");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
      }   
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
@PutMapping(path = "/currentTechStatus")
public Object updateTechStatus(){

    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null){
        System.out.println("1st tech");
        testEvent.setTechStatus(true);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null){
            System.out.println("2nd tech");
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(false);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null){
            System.out.println("3rd tech");
              testEvent.setRegStatus(true);
              testEvent.setTechStatus(true);
              example = Example.of(testEvent);
              event = events.findOne(example).orElse(null);
              if (event == null){
                System.out.println("FML");
                  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
              }
          }
        }   
    }
    
  boolean changes = false;
  
  event.changeTechStatus();
  changes = true;
  if (changes){
      events.save(event);
      System.out.println("sucues");
      return new ResponseEntity<>(HttpStatus.OK);
  }
  else {
    System.out.println("mot modified");
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
