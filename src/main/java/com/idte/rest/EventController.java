package com.idte.rest;

import java.util.Map;
import com.idte.rest.data.Event;
import com.idte.rest.data.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping
public class EventController{

    @Autowired
    private EventRepository events;


    @GetMapping(path = "/events")
public Object postEvent(@RequestBody Map <String, String> json){
    String start = json.get("Reg. Start");
    String end = json.get("Reg. End");

    String techSubStart = json.get("Tech. Start");
    String techSubEnd = json.get("Tech. End");
    
    Event event = new Event();

    // Event Key is generated and assigned to eventID
    event.setEventID(event.GenerateKey());

    // Begin and end dates for registration and technology submission are set
    event.setRegistrationDates(start, end);
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

// Deleting event is work in progress
public Object deleteEvent(){

    Object test = new Object();
    return test;
}




}