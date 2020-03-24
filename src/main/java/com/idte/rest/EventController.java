package com.idte.rest;

import java.util.HashMap;
import java.util.Map;


import com.idte.rest.data.Event;
import com.idte.rest.data.EventRepository;

import org.springframework.data.domain.Example;
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

<<<<<<< HEAD
    
    @PostMapping(path = "/admin/events", consumes = "application/json", produces = "application/json")
    public Object postEvent(@RequestBody Map <String, String> json){
    Event event = new Event();
=======
  @PostMapping(path = "/admin/events", consumes = "application/json", produces = "application/json")
  public Object postEvent(@RequestBody Map<String, String> json) {
>>>>>>> c591bd7777c3719fc1cf24707094e888ab1e5b97
    String registrationStart = json.get("registrationStart");
    String registrationEnd = json.get("registrationEnd");
    String techSubStart = json.get("techSubStart");
    String techSubEnd = json.get("techSubEnd");
<<<<<<< HEAD
    
    String setUpOne = event.formatConverter(json.get("setUpOne"));
    String setUpTwo= event.formatConverter(json.get("setUpTwo"));
    String setUpThree= event.formatConverter(json.get("setUpThree"));
    String dryRun= event.formatConverter(json.get("dryRun"));
    String eventDayOne= event.formatConverter(json.get("eventDayOne"));
    String eventDayTwo= event.formatConverter(json.get("eventDayTwo"));
    String eventDayThree= event.formatConverter(json.get("eventDayThree"));
    String eventDayFour= event.formatConverter(json.get("eventDayFour"));
    String eventDayFive= event.formatConverter(json.get("eventDayFive"));
    
    System.out.println(setUpOne);
    System.out.println(setUpTwo);
    System.out.println(setUpThree);
    System.out.println(dryRun);
    System.out.println(eventDayOne);
    System.out.println(eventDayTwo);
    System.out.println(eventDayThree);
    System.out.println(eventDayFour);
    System.out.println(eventDayFive);

=======

    Event event = new Event();
>>>>>>> c591bd7777c3719fc1cf24707094e888ab1e5b97
    event.setEventID(event.GenerateKey());
    event.setRegistrationDates(registrationStart, registrationEnd);
    event.setTechnologyDates(techSubStart, techSubEnd);
    event.setRegStatus(false);
    event.setTechStatus(false);
<<<<<<< HEAD
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
=======

>>>>>>> c591bd7777c3719fc1cf24707094e888ab1e5b97
    try {
      return new ResponseEntity<>(events.save(event), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  // ---------- Used on event table to make one event the new current event
  @PutMapping(path = "/admin/changeCurrent", consumes = "application/json", produces = "application/json")
  public Object changeCurrentEvent(@RequestBody Map<String, String> json) {
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
  public Object updateCurrentRegStatus() {

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
      events.save(event);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
  }

  // Inverts an events techSubStatus value
  @PutMapping(path = "/admin/currentTechStatus")
  public Object updateTechStatus() {

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
      events.save(event);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
  }

  @PutMapping(path = "/admin/updateDates")
  public Object updateDates(@RequestBody Map<String, String> json) {

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
      events.save(event);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
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
}
