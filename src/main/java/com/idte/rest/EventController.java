package com.idte.rest;

import java.security.Principal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import com.idte.rest.data.Event;
import com.idte.rest.data.EventRepository;

import org.springframework.data.domain.Example;
import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping
public class EventController {

  @Autowired
  private EventRepository events;

    
    @PostMapping(path = "/admin/events", consumes = "application/json", produces = "application/json")
    public Object postEvent(@RequestBody Map <String, String> json){
    Event event = new Event();
    String registrationStart = json.get("registrationStart");
    String registrationEnd = json.get("registrationEnd");
    String techSubStart = json.get("techSubStart");
    String techSubEnd = json.get("techSubEnd");
    
    /*
    String setUpOne = event.formatConverter(json.get("setUpOne"));
    String setUpTwo= event.formatConverter(json.get("setUpTwo"));
    String setUpThree= event.formatConverter(json.get("setUpThree"));
    String dryRun= event.formatConverter(json.get("dryRun"));
    String eventDayOne= event.formatConverter(json.get("eventDayOne"));
    String eventDayTwo= event.formatConverter(json.get("eventDayTwo"));
    String eventDayThree= event.formatConverter(json.get("eventDayThree"));
    String eventDayFour= event.formatConverter(json.get("eventDayFour"));
    String eventDayFive= event.formatConverter(json.get("eventDayFive"));
    */

    event.setSetUpOne(event.formatConverter(json.get("setUpOne")));
    event.setSetUpTwo(event.formatConverter(json.get("setUpTwo")));
    event.setSetUpThree(event.formatConverter(json.get("setUpThree")));
    event.setDryRun(event.formatConverter(json.get("dryRun")));
    event.setEventDayOne(event.formatConverter(json.get("eventDayOne")));
    event.setEventDayTwo(event.formatConverter(json.get("eventDayTwo")));
    event.setEventDayThree(event.formatConverter(json.get("eventDayThree")));
    event.setEventDayFour(event.formatConverter(json.get("eventDayFour")));
    event.setEventDayFive(event.formatConverter(json.get("eventDayFive")));

    event.setEventID(event.GenerateKey());
    event.setRegistrationDates(registrationStart, registrationEnd);
    event.setTechnologyDates(techSubStart, techSubEnd);
    event.setRegStatus(false);
    event.setTechStatus(false);
    /*
    event.setEventDates(String.join(",",
     setUpOne,
     setUpTwo,
     setUpThree,
     dryRun,
     eventDayOne,
     eventDayTwo,
     eventDayThree,
     eventDayFour,
     eventDayFive
     ));
     */
    try {
      return new ResponseEntity<>(events.save(event), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  // ---------- Used on event table to make one event the new current event
  @PutMapping(path = "/admin/changeCurrent", consumes = "application/json", produces = "application/json")
  public Object changeCurrentEvent(Principal principal, @RequestBody Map<String, String> json) {
    // Old search, search for event that has currentEvent = true
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event oldEvent = events.findOne(example).orElse(null);
    if (oldEvent == null) {
      testEvent.setRegStatus(true);
      example = Example.of(testEvent);
      oldEvent = events.findOne(example).orElse(null);
      if (oldEvent == null) {
        testEvent.setRegStatus(false);
        testEvent.setTechStatus(true);
        example = Example.of(testEvent);
        oldEvent = events.findOne(example).orElse(null);
        if (oldEvent == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          oldEvent = events.findOne(example).orElse(null);
          if (oldEvent == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    // Change oldEvent's currentEvent = false
    oldEvent.setCurrentEvent("false");

    // Using findByID, get event from table on webpage
    Event find = new Event();
    if (json.get("id") != null) {
      try {
        find.setEventID(json.get("id"));

      } catch (Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    Event event = events.findById(find.getEventID()).orElse(null);
    if (event == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    boolean changes = false;

    // set new events currentEvent=true
    event.setCurrentEvent("true");
    changes = true;

    // Save both new values for the events
    if (changes) {
      DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
      Date date = new Date();
      String currentDateTime = dateFormat.format(date);
      oldEvent.setLastModified(currentDateTime);
      oldEvent.setLastModifiedBy(principal.getName());
      event.setLastModified(currentDateTime);
      event.setLastModifiedBy(principal.getName());
      events.save(oldEvent);
      events.save(event);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
  }

  // ---------- Used when you create a new event, and it makes that new event the
  // new current event
  @PutMapping(path = "/admin/replaceCurrent", consumes = "application/json", produces = "application/json")
  public Object replaceCurrentEvent() {
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event oldEvent = events.findOne(example).orElse(null);
    if (events.findAll(example).size() > 0) {
      if (oldEvent == null) {
        testEvent.setRegStatus(true);
        example = Example.of(testEvent);
        oldEvent = events.findOne(example).orElse(null);
        if (oldEvent == null) {
          testEvent.setRegStatus(false);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          oldEvent = events.findOne(example).orElse(null);
          if (oldEvent == null) {
            testEvent.setRegStatus(true);
            testEvent.setTechStatus(true);
            example = Example.of(testEvent);
            oldEvent = events.findOne(example).orElse(null);
            if (oldEvent == null) {
              return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
          }
        }
      }

      oldEvent.setCurrentEvent("false");
      try {
        events.save(oldEvent);
        return new ResponseEntity<>(HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      return new ResponseEntity<>(HttpStatus.OK);
    }
  }

  // Inverts an events regStatus value
  @PutMapping(path = "/admin/currentRegStatus")
  public Object updateCurrentRegStatus(Principal principal) {

    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setRegStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(false);
        testEvent.setTechStatus(true);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }

    boolean changes = false;

    event.changeRegStatus();
    changes = true;
    if (changes) {
      DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
      Date date = new Date();
      String currentDateTime = dateFormat.format(date);
      event.setLastModified(currentDateTime);
      event.setLastModifiedBy(principal.getName());
      events.save(event);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
  }

  // Inverts an events techSubStatus value
  @PutMapping(path = "/admin/currentTechStatus")
  public Object updateTechStatus(Principal principal) {

    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }

    boolean changes = false;

    event.changeTechStatus();
    changes = true;
    if (changes) {
      DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
      Date date = new Date();
      String currentDateTime = dateFormat.format(date);
      event.setLastModified(currentDateTime);
      event.setLastModifiedBy(principal.getName());
      events.save(event);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
  }

  @PutMapping(path = "/admin/updateDates")
  public Object updateDates(Principal principal,@RequestBody Map<String, String> json) {

    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    String registrationStart = json.get("registrationStart");
    String registrationEnd = json.get("registrationEnd");
    String techSubStart = json.get("techSubStart");
    String techSubEnd = json.get("techSubEnd");
    boolean changes = false;
    event.setRegistrationDates(registrationStart, registrationEnd);
    event.setTechnologyDates(techSubStart, techSubEnd);
    changes = true;
    if (changes) {
      DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
      Date date = new Date();
      String currentDateTime = dateFormat.format(date);
      event.setLastModified(currentDateTime);
      event.setLastModifiedBy(principal.getName());
      events.save(event);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
  }

  @PutMapping(path = "/admin/updateEventDates")
  public Object updateEventDates(Principal principal,@RequestBody Map<String, String> json) {

    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    String newSetUpOne;
    String newSetUpTwo;
    String newSetUpThree;
    String newDryRun;
    String newEventDayOne;;
    String newEventDayTwo;
    String newEventDayThree;
    String newEventDayFour;
    String newEventDayFive;
    
   
    if(json.get("setUpOne") != null && json.get("setUpOne") != ""){
      newSetUpOne = event.formatConverter(json.get("setUpOne"));
      if(newSetUpOne != event.getSetUpOne()){
       event.setSetUpOne(newSetUpOne);
      }
    }
    if(json.get("setUpTwo") != null && json.get("setUpTwo") != ""){
      newSetUpTwo = event.formatConverter(json.get("setUpTwo"));
      if(newSetUpTwo != event.getSetUpTwo()){
        event.setSetUpTwo(newSetUpTwo);
      }
    }
    if(json.get("setUpThree") != null && json.get("setUpThree") != ""){
      newSetUpThree = event.formatConverter(json.get("setUpThree"));
      if(newSetUpThree != event.getSetUpThree()){
        event.setSetUpThree(newSetUpThree);;
      }
    }
    if(json.get("dryRun") != null && json.get("dryRun") != ""){
      newDryRun = event.formatConverter(json.get("dryRun"));
      if(newDryRun != event.getDryRun()){
        event.setDryRun(newDryRun);
      }
    }
    if(json.get("eventDayOne") != null && json.get("eventDayOne") != ""){
      newEventDayOne = event.formatConverter(json.get("eventDayOne"));
      if(newEventDayOne != event.getEventDayOne()){
        event.setEventDayOne(newEventDayOne);
      }
    }
    if(json.get("eventDayTwo") != null && json.get("eventDayTwo") != ""){
      newEventDayTwo = event.formatConverter(json.get("eventDayTwo"));
      if(newEventDayTwo != event.getEventDayTwo()){
        event.setEventDayTwo(newEventDayTwo);;
      }
    }
    if(json.get("eventDayThree") != null && json.get("eventDayThree") != ""){
      newEventDayThree = event.formatConverter(json.get("eventDayThree"));
      if(newEventDayThree != event.getEventDayTwo()){
        event.setEventDayThree(newEventDayThree);
      }
    }
    if(json.get("eventDayFour") != null && json.get("eventDayFour") != ""){
      newEventDayFour = event.formatConverter(json.get("eventDayFour"));
      if(newEventDayFour != event.getEventDayFour()){
        event.setEventDayFour(newEventDayFour);
      }
    }
    if(json.get("eventDayFive") != null && json.get("eventDayFive") != ""){
      newEventDayFive = event.formatConverter(json.get("eventDayFive"));
      if(newEventDayFive != event.getEventDayFive()){
        event.setEventDayFive(newEventDayFive);
      }
    }
  
    

    DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    Date date = new Date();
    String currentDateTime = dateFormat.format(date);
    event.setLastModified(currentDateTime);
    System.out.println(principal.getName());
    event.setLastModifiedBy(principal.getName());
    events.save(event);
    return new ResponseEntity<>(HttpStatus.OK);
    
  }

  @GetMapping(path = "/getTechValue")
  public Object getTechValue() {
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    boolean value = event.getTechnologyStatus();
    Map<String, String> map = new HashMap<String, String>();
    map.put("status", Boolean.toString(value));

    return map;
  }

  @GetMapping(path = "/getTechEnd")
  public Object getTechEnd() {
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    String date = event.getTechnologyEnd();
    Map<String, String> map = new HashMap<String, String>();
    map.put("date", date);

    return map;
  }

  @GetMapping(path = "/getTechStart")
  public Object getTechStart() {
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    String date = event.getTechnologyStart();
    Map<String, String> map = new HashMap<String, String>();
    map.put("date", date);

    return map;
  }

  @GetMapping(path = "/getRegStart")
  public Object getRegStart() {
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    String date = event.getRegistrationStart();
    Map<String, String> map = new HashMap<String, String>();
    map.put("date", date);

    return map;
  }

  @GetMapping(path = "/getRegEnd")
  public Object getRegEnd() {
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    String date = event.getRegistrationEnd();
    Map<String, String> map = new HashMap<String, String>();
    map.put("date", date);

    return map;
  }

  @GetMapping(path = "/getRegValue")
  public Object getRegValue() {
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);

    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    boolean value = event.getRegistrationStatus();

    Map<String, String> map = new HashMap<String, String>();
    map.put("status", Boolean.toString(value));
    return map;
  }

  @DeleteMapping(path = "/admin/events", consumes = "application/json", produces = "application/json")
  public Object deleteEvent(@RequestBody Map<String, String> json) {
    Event find = new Event();
    if (json.get("id") != null) {
      try {
        find.setEventID(json.get("id"));

      } catch (Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    Event event = events.findById(find.getEventID()).orElse(null);
    if (event == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    events.delete(event);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping(path = "/admin/events/all", produces = "application/json")
  public Iterable<Event> findAllEvents() {

    return events.findAll();
  }

  
  @GetMapping(path = "/eventDates")
  public Object getEventDates(){
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);
    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    String setUpOne = event.getSetUpOne();
    String setUpTwo = event.getSetUpTwo();
    String setUpThree = event.getSetUpThree();
    String dryRun = event.getDryRun();
    String eventDayOne = event.getEventDayOne();
    String eventDayTwo = event.getEventDayTwo();
    String eventDayThree = event.getEventDayThree();
    String eventDayFour = event.getEventDayFour();
    String eventDayFive = event.getEventDayFive();
    String dates = String.join(",", setUpOne,setUpTwo,setUpThree,dryRun,eventDayOne, eventDayTwo, eventDayThree, eventDayFour,eventDayFive);
    Map<String, String> map = new HashMap<String, String>();
    map.put("status", dates);
    return map;
  }

  @GetMapping(path = "/eventDateDetails")
  public Object getEventDateDetails(){
    Event testEvent = new Event();
    Example<Event> example = Example.of(testEvent);
    Event event = events.findOne(example).orElse(null);
    if (event == null) {
      testEvent.setTechStatus(true);
      example = Example.of(testEvent);
      event = events.findOne(example).orElse(null);
      if (event == null) {
        testEvent.setRegStatus(true);
        testEvent.setTechStatus(false);
        example = Example.of(testEvent);
        event = events.findOne(example).orElse(null);
        if (event == null) {
          testEvent.setRegStatus(true);
          testEvent.setTechStatus(true);
          example = Example.of(testEvent);
          event = events.findOne(example).orElse(null);
          if (event == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
          }
        }
      }
    }
    String setUpOne = event.getSetUpOne();
    String setUpTwo = event.getSetUpTwo();
    String setUpThree = event.getSetUpThree();
    String dryRun = event.getDryRun();
    String eventDayOne = event.getEventDayOne();
    String eventDayTwo = event.getEventDayTwo();
    String eventDayThree = event.getEventDayThree();
    String eventDayFour = event.getEventDayFour();
    String eventDayFive = event.getEventDayFive();
   
    Map<String, Object> map = new HashMap<String, Object>();

    map.put("setUp1", "SetUp1: " + setUpOne);
    map.put("setUp2", "SetUp2: " + setUpTwo);
    map.put("setUp3", "SetUp3: " + setUpThree);
    map.put("dryRun", "DryRun: " + dryRun);
    map.put("eventDay1", "EventDay1: " + eventDayOne);
    map.put("eventDay2", "EventDay2: " + eventDayTwo);
    map.put("eventDay3", "EventDay3: " + eventDayThree);
    map.put("eventDay4", "EventDay4: " + eventDayFour);
    map.put("eventDay5", "EventDay5: " + eventDayFive);
    System.out.print(map);
    return map;
  }
  
}
