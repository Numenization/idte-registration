package com.idte.rest;

import java.util.Map;
import com.idte.rest.data.Event;
import com.idte.rest.data.EventRepository;

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
  //  String currentEvent = json.get("currentEvent");
    
    Event event = new Event();
    event.setEventID(event.GenerateKey());
    event.setRegistrationDates(registrationStart, registrationEnd);
    event.setTechnologyDates(techSubStart, techSubEnd);
   
    try {
        return new ResponseEntity<>(events.save(event), HttpStatus.CREATED);
    }
    catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


public boolean updateRegistrationStatus(boolean registrationStatus){
    return !registrationStatus;
}

public boolean updateTechnologyStatus(boolean technologyStatus){
    return !technologyStatus;
}
public boolean updateCurrentEvent(boolean currentEvent){
  return !currentEvent;
}

@GetMapping (path="/events",consumes = "application.json", produces = "application.json")
public Object findCurrentEvent(@RequestBody Map<String, String> json){
    Event find = new Event();
    find.setCurrentEvent("true");
    Example <Event> example = Example.of(find);
    Event event = events.findOne(example).orElse(null);
    if(event != null && event.getCurrentEvent() == true){
        return new ResponseEntity<>(event, HttpStatus.OK);
    }
    else{
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

@PutMapping(path = "/events", consumes = "application/json", produces = "application/json")
public Object updateCurrentEvent(@RequestBody Map<String, String> json){

  Event testEvent = new Event();
  testEvent.changeEventStatus();
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
