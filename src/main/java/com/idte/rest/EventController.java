package com.idte.rest;

import java.util.Map;
import com.idte.rest.data.Event;
import com.idte.rest.data.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

    // Event Key is generated and assigned to eventID
    event.setEventID(event.GenerateKey());

    // Begin and end dates for registration and technology submission are set
    event.setRegistrationDates(registrationStart, registrationEnd);
    event.setTechnologyDates(techSubStart, techSubEnd);
   
    try {
        return new ResponseEntity<>(events.save(event), HttpStatus.CREATED);
    }
    catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Setting registration on/off. Gets the current status of registration, then inverts it
public boolean updateRegistrationStatus(boolean registrationStatus){
    return !registrationStatus;
}
// Setting technology submission on/off. Gets the current status of technology submission, then inverts it
public boolean updateTechnologyStatus(boolean technologyStatus){
    return !technologyStatus;
}
public boolean updateCurrentEvent(boolean currentEvent){
  return !currentEvent;
}






}