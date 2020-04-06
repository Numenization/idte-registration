package com.idte.rest;

import java.security.Principal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import com.idte.rest.data.AttendeeRepository;
import com.idte.rest.data.EvaluatorRepository;
import com.idte.rest.data.Presenter;
import com.idte.rest.data.PresenterRepository;
import com.idte.rest.data.SupplierRepository;
import com.idte.rest.data.Attendee;
import com.idte.rest.data.Error;
import com.idte.rest.data.Evaluator;
import com.idte.rest.data.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class AttendeeController {
  @Autowired
  private AttendeeRepository attendees;
  @Autowired
  private SupplierRepository suppliers;
  @Autowired
  private EvaluatorRepository evaluators;
  @Autowired
  private PresenterRepository presenters;

  // get all of either attendees, suppliers, or evaluators
  @GetMapping(path = "/admin/attendees/all")
  public Iterable<Attendee> findAllAttendees() {
    return attendees.findAll();
  }

  @GetMapping(path = "/admin/suppliers")
  public Iterable<Supplier> findAllSuppliers() {
    return suppliers.findAll();
  }

  @GetMapping(path = "/admin/evaluators")
  public Iterable<Evaluator> findAllEvaluators() {
    return evaluators.findAll();
  }

  @GetMapping(path = "/admin/presenters")
  public Iterable<Presenter> findAllPresenters() {
    return presenters.findAll();
  }

  // get from email, id, first name, last name, nickname, phone number, cell
  // number, city, company, or country
  // due to incorrect implementation of javascripts XHRHttpRequest, this has to be
  // a POST mapping, otherwise we cant have a body
  @PostMapping(path = "/admin/suppliers/search")
  public Object findSuppliers(@RequestBody Map<String, String> json) {

    String search = json.get("search");
    List<String> attributes = Arrays.asList("email", "id", "firstName", "lastName", "nickname", "phoneNumber",
        "cellNumber", "city", "company", "country");

    List<Supplier> attendee = suppliers
        .findAll(Specification.where(SupplierRepository.containsTextInAttributes(search, attributes)));
    return new ResponseEntity<>(attendee, HttpStatus.OK);
  }

  // get from email, id, first name, last name, nickname, phone number, cell
  // number, city, or country
  // due to incorrect implementation of javascripts XHRHttpRequest, this has to be
  // a POST mapping, otherwise we cant have a body
  @PostMapping(path = "/admin/evaluators/search")
  public Object findEvaluators(@RequestBody Map<String, String> json) {

    String search = json.get("search");
    List<String> attributes = Arrays.asList("email", "id", "firstName", "lastName", "nickname", "phoneNumber",
        "cellNumber", "city", "country");

    List<Evaluator> attendee = evaluators
        .findAll(Specification.where(EvaluatorRepository.containsTextInAttributes(search, attributes)));
    return new ResponseEntity<>(attendee, HttpStatus.OK);
  }

  // get from email, id, first name, last name, nickname, phone number, cell
  // number, city, or country
  // due to incorrect implementation of javascripts XHRHttpRequest, this has to be
  // a POST mapping, otherwise we cant have a body
  @PostMapping(path = "/admin/presenters/search")
  public Object findPresenters(@RequestBody Map<String, String> json) {

    String search = json.get("search");
    List<String> attributes = Arrays.asList("email", "id", "firstName", "lastName", "nickname", "phoneNumber",
        "cellNumber", "city", "country");

    List<Presenter> attendee = presenters
        .findAll(Specification.where(EvaluatorRepository.containsTextInAttributes(search, attributes)));
    return new ResponseEntity<>(attendee, HttpStatus.OK);
  }

  // create a new supplier
  @PostMapping(path = "/admin/suppliers", consumes = "application/json", produces = "application/json")
  public Object createSupplier(@RequestBody Supplier attendee) {
    // extract request info into new supplier object
    Supplier newAttendee = Supplier.from(attendee);

    // make sure we have a unique email
    Supplier uniqueTest = new Supplier();
    uniqueTest.setEmail(newAttendee.getEmail());
    Example<Supplier> example = Example.of(uniqueTest);
    if (suppliers.findOne(example).orElse(null) != null) {
      return new ResponseEntity<>(new Error("Entity with email " + uniqueTest.getEmail() + " already exists."),
          HttpStatus.CONFLICT);
    }

    // get time stamp
    DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    Date date = new Date();
    String currentDateTime = dateFormat.format(date);
    newAttendee.setDateCreated(currentDateTime);
    newAttendee.setLastModified(currentDateTime);

    // try to save to database
    try {
      newAttendee.createId();
      return new ResponseEntity<>(suppliers.save(newAttendee), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // create a new evaluator
  @PostMapping(path = "/admin/evaluators", consumes = "application/json", produces = "application/json")
  public Object createEvaluator(@RequestBody Evaluator attendee) {
    // extract request info into new supplier object
    Evaluator newAttendee = Evaluator.from(attendee);

    // make sure we have a unique email
    Evaluator uniqueTest = new Evaluator();
    uniqueTest.setEmail(newAttendee.getEmail());
    Example<Evaluator> example = Example.of(uniqueTest);
    if (evaluators.findOne(example).orElse(null) != null) {
      return new ResponseEntity<>(new Error("Entity with email " + uniqueTest.getEmail() + " already exists."),
          HttpStatus.CONFLICT);
    }

    // get time stamp
    DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    Date date = new Date();
    String currentDateTime = dateFormat.format(date);
    newAttendee.setDateCreated(currentDateTime);
    newAttendee.setLastModified(currentDateTime);

    // try to save to database
    try {
      newAttendee.createId();
      return new ResponseEntity<>(evaluators.save(newAttendee), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // create a new presenter
  @PostMapping(path = "/admin/presenters", consumes = "application/json", produces = "application/json")
  public Object createPresenter(@RequestBody Presenter attendee) {
    // extract request info into new supplier object
    Presenter newAttendee = Presenter.from(attendee);

    // make sure we have a unique email
    Presenter uniqueTest = new Presenter();
    uniqueTest.setEmail(newAttendee.getEmail());
    Example<Presenter> example = Example.of(uniqueTest);
    if (presenters.findOne(example).orElse(null) != null) {
      return new ResponseEntity<>(new Error("Entity with email " + uniqueTest.getEmail() + " already exists."),
          HttpStatus.CONFLICT);
    }

    // get time stamp
    DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    Date date = new Date();
    String currentDateTime = dateFormat.format(date);
    newAttendee.setDateCreated(currentDateTime);
    newAttendee.setLastModified(currentDateTime);

    // try to save to database
    try {
      newAttendee.createId();
      return new ResponseEntity<>(presenters.save(newAttendee), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // update an attendees fields in the database
  @PutMapping(path = "/admin/attendees")
  public Object updateAttendee(Principal principal, @RequestBody Map<String, String> json) {
    // no matter what, we need the original email of the attendee to perform this
    // update
    // if we are changing email, we look for a "newEmail" entry in the json
    // otherwise look for valid fields in the json and update the attendee with
    // their values

    // first we have to find a valid user given the email, if one exists
    if(json.get("email") == null || json.get("email").length() == 0) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    Attendee attendee = attendees.findByEmail(json.get("email"));

    if (attendee == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // we should have a valid attendee now. time to update the fields
    boolean changes = false;

    String newEmail = json.get("newEmail");
    String firstName = json.get("firstName");
    String lastName = json.get("lastName");
    String nickname = json.get("nickname");
    String phoneNumber = json.get("phoneNumber");
    String cellNumber = json.get("cellNumber");
    String country = json.get("country");
    String city = json.get("city");
    String comments = json.get("comments");

    String setup1 = json.get("setUpOne");
    String setup2 = json.get("setUpTwo");
    String setup3 = json.get("setUpThree");
    String dryRun = json.get("dryRun");
    String event1 = json.get("eventDayOne");
    String event2 = json.get("eventDayTwo");
    String event3 = json.get("eventDayThree");
    String event4 = json.get("eventDayFour");
    String event5 = json.get("eventDayFive");
    String setup1Tech = json.get("setUpOneTech");
    String setup2Tech = json.get("setUpTwoTech");
    String setup3Tech = json.get("setUpThreeTech");
    String dryRunTech = json.get("dryRunTech");
    String event1Tech = json.get("eventDayOneTech");
    String event2Tech = json.get("eventDayTwoTech");
    String event3Tech = json.get("eventDayThreeTech");
    String event4Tech = json.get("eventDayFourTech");
    String event5Tech = json.get("eventDayFiveTech");

    if (newEmail != null && !newEmail.equals(attendee.getEmail())) {
      attendee.setEmail(newEmail);
      changes = true;
    }
    if (firstName != null && !firstName.equals(attendee.getFirstName())) {
      attendee.setFirstName(firstName);
      changes = true;
    }
    if (lastName != null && !lastName.equals(attendee.getLastName())) {
      attendee.setLastName(lastName);
      changes = true;
    }
    if (nickname != null && !nickname.equals(attendee.getNickname())) {
      attendee.setNickname(nickname);
      changes = true;
    }
    if (phoneNumber != null && !phoneNumber.equals(attendee.getPhoneNumber())) {
      attendee.setPhoneNumber(phoneNumber);
      changes = true;
    }
    if (cellNumber != null && !cellNumber.equals(attendee.getCellNumber())) {
      attendee.setCellNumber(cellNumber);
      changes = true;
    }
    if (country != null && !country.equals(attendee.getCountry())) {
      attendee.setCountry(country);
      changes = true;
    }
    if (city != null && !city.equals(attendee.getCity())) {
      attendee.setCity(city);
      changes = true;
    }
    if (comments != null && !comments.equals(attendee.getComments())) {
      attendee.setComments(comments);
      changes = true;
    }

    if(setup1 != null && !setup1.equals(attendee.getSetUpOne())) {
      attendee.setSetUpOne(setup1);
      changes = true;
    }
    if(setup2 != null && !setup2.equals(attendee.getSetUpTwo())) {
      attendee.setSetUpTwo(setup2);
      changes = true;
    }
    if(setup3 != null && !setup3.equals(attendee.getSetUpThree())) {
      attendee.setSetUpThree(setup3);
      changes = true;
    }
    if(dryRun != null && !dryRun.equals(attendee.getDryRun())) {
      attendee.setDryRun(dryRun);
      changes = true;
    }
    if(event1 != null && !event1.equals(attendee.getEventDayOne())) {
      attendee.setEventDayOne(event1);
      changes = true;
    }
    if(event2 != null && !event2.equals(attendee.getEventDayTwo())) {
      attendee.setEventDayTwo(event2);
      changes = true;
    }
    if(event3 != null && !event3.equals(attendee.getEventDayThree())) {
      attendee.setEventDayThree(event3);
      changes = true;
    }
    if(event4 != null && !event4.equals(attendee.getEventDayFour())) {
      attendee.setEventDayFour(event4);
      changes = true;
    }
    if(event5 != null && !event5.equals(attendee.getEventDayFive())) {
      attendee.setEventDayFive(event5);
      changes = true;
    }

    if(setup1Tech != null && Integer.parseInt(setup1Tech) != attendee.getSetUpOneTech()) {
      attendee.setSetUpOneTech(Integer.parseInt(setup1Tech));
      changes = true;
    }
    if(setup2Tech != null && Integer.parseInt(setup2Tech) != attendee.getSetUpTwoTech()) {
      attendee.setSetUpTwoTech(Integer.parseInt(setup2Tech));
      changes = true;
    }
    if(setup3Tech != null && Integer.parseInt(setup3Tech) != attendee.getSetUpThreeTech()) {
      attendee.setSetUpThreeTech(Integer.parseInt(setup3Tech) );
      changes = true;
    }
    if(dryRunTech != null && Integer.parseInt(dryRunTech) != attendee.getDryRunTech()) {
      attendee.setDryRunTech(Integer.parseInt(dryRunTech));
      changes = true;
    }
    if(event1Tech != null && Integer.parseInt(event1Tech) != attendee.getEventDayOneTech()) {
      attendee.setEventDayOneTech(Integer.parseInt(event1Tech));
      changes = true;
    }
    if(event2Tech != null && Integer.parseInt(event2Tech) != attendee.getEventDayTwoTech()) {
      attendee.setEventDayTwoTech(Integer.parseInt(event2Tech));
      changes = true;
    }
    if(event3Tech != null && Integer.parseInt(event3Tech) != attendee.getEventDayThreeTech()) {
      attendee.setEventDayThreeTech(Integer.parseInt(event3Tech));
      changes = true;
    }
    if(event4Tech != null && Integer.parseInt(event4Tech) != attendee.getEventDayFourTech()) {
      attendee.setEventDayFourTech(Integer.parseInt(event4Tech));
      changes = true;
    }
    if(event5Tech != null && Integer.parseInt(event5Tech) != attendee.getEventDayFiveTech()) {
      attendee.setEventDayFiveTech(Integer.parseInt(event5Tech));
      changes = true;
    }

    // now try to update supplier specific fields
    String company = json.get("company");

    try {
      if (company != null && ((Supplier) attendee).getCompany() != null) {
        if (!company.equals(((Supplier) attendee).getCompany())) {
          ((Supplier) attendee).setCompany(company);
          changes = true;
        }
      }
    } catch (Exception e) {
      return new ResponseEntity<>(new Error(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    // if we made changes, update the attendee's last modified date and send HTTP OK
    // otherwise send HTTP NOT MODIFIED
    if (changes) {
      DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
      Date date = new Date();
      String currentDateTime = dateFormat.format(date);
      attendee.setLastModified(currentDateTime);
      attendee.setModifiedBy(principal.getName());

      attendees.save(attendee);
      return new ResponseEntity<>(HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
  }

  // delete an attendee from the database
  @DeleteMapping(path = "/admin/attendees")
  public Object delete(@RequestBody Map<String, String> json) {
    // try to find the requested user to delete
    if(json.get("email") == null || json.get("email").length() == 0) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    Attendee attendee = attendees.findByEmail(json.get("email"));

    // if we cant find it send 404
    if (attendee == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // we found it so lets delete it
    attendees.delete(attendee);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping(path = "/attendees", consumes = "application/json", produces = "application/json")
  public Object submitRegistration(@RequestBody Map<String, String> json) {
    // TODO: Set dates to attend and associated technologies on those dates, except for evaluators who only need dates
    Attendee newAttendee;
    List<Error> errors = new ArrayList<>();
    
    String type = json.get("type");
    String firstName = json.get("firstName");
    String lastName = json.get("lastName");
    String nickname = json.get("nickname");
    String email = json.get("email");
    String phone = json.get("phone");
    String cell = json.get("cell");
    String company = json.get("company");
    String city = json.get("city");
    String country = json.get("country");

    String setup1 = json.get("setup1");
    String setup2 = json.get("setup2");
    String setup3 = json.get("setup3");
    String dryRun = json.get("dryRun");
    String event1 = json.get("event1");
    String event2 = json.get("event2");
    String event3 = json.get("event3");
    String event4 = json.get("event4");
    String event5 = json.get("event5");
    String setup1Tech = json.get("setup1Tech");
    String setup2Tech = json.get("setup2Tech");
    String setup3Tech = json.get("setup3Tech");
    String dryRunTech = json.get("dryRunTech");
    String event1Tech = json.get("event1Tech");
    String event2Tech = json.get("event2Tech");
    String event3Tech = json.get("event3Tech");
    String event4Tech = json.get("event4Tech");
    String event5Tech = json.get("event5Tech");

    if(email == null || firstName == null || lastName == null ||
      email.length() == 0 || firstName.length() == 0 ||
      lastName.length() == 0) {
      errors.add(new Error("Make sure all required fields are filled out!"));
      return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    if(type == null || type.equals("_")) {
      errors.add(new Error("Missing type in registration!"));
      return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    } else if(type.equals("supplier")) {
      newAttendee = new Supplier();

      // set general fields
      newAttendee.setEmail(email);
      newAttendee.setFirstName(firstName);
      newAttendee.setLastName(lastName);

      if(setup1.length() > 0) 
        newAttendee.setSetUpOne(setup1);
      if(setup2.length() > 0) 
        newAttendee.setSetUpTwo(setup2);
      if(setup3.length() > 0) 
        newAttendee.setSetUpThree(setup3);
      if(dryRun.length() > 0) 
        newAttendee.setDryRun(dryRun);
      if(event1.length() > 0) 
        newAttendee.setEventDayOne(event1);
      if(event2.length() > 0) 
        newAttendee.setEventDayOne(event2);
      if(event3.length() > 0) 
        newAttendee.setEventDayOne(event3);
      if(event4.length() > 0) 
        newAttendee.setEventDayOne(event4);
      if(event5.length() > 0) 
        newAttendee.setEventDayOne(event5);

      if(setup1Tech.length() > 0) 
        newAttendee.setSetUpOneTech(Integer.parseInt(setup1Tech));
      if(setup2Tech.length() > 0) 
        newAttendee.setSetUpTwoTech(Integer.parseInt(setup2Tech));
      if(setup3Tech.length() > 0) 
        newAttendee.setSetUpThreeTech(Integer.parseInt(setup3Tech));
      if(dryRunTech.length() > 0) 
        newAttendee.setDryRunTech(Integer.parseInt(dryRunTech));
      if(event1Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event1Tech));
      if(event2Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event2Tech));
      if(event3Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event3Tech));
      if(event4Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event4Tech));
      if(event5Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event5Tech));

      
      // set optional fields
      if(phone != null) {
        newAttendee.setPhoneNumber(phone);
      }
      if(cell != null) {
        newAttendee.setCellNumber(cell);
      }
      if(nickname != null) {
        newAttendee.setNickname(nickname);
      }

      // set supplier specific fields
      if(city == null || country == null || company == null ||
        city.length() == 0 || country.length() == 0 || company.length() == 0) {
        errors.add(new Error("Make sure all required fields are filled out!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }

      newAttendee.setCity(city);
      newAttendee.setCountry(country);
      ((Supplier)newAttendee).setCompany(company);
    } else if(type.equals("presenter")) {
      newAttendee = new Presenter();

      // set general fields
      newAttendee.setEmail(email);
      newAttendee.setFirstName(firstName);
      newAttendee.setLastName(lastName);

      if(setup1.length() > 0) 
        newAttendee.setSetUpOne(setup1);
      if(setup2.length() > 0) 
        newAttendee.setSetUpTwo(setup2);
      if(setup3.length() > 0) 
        newAttendee.setSetUpThree(setup3);
      if(dryRun.length() > 0) 
        newAttendee.setDryRun(dryRun);
      if(event1.length() > 0) 
        newAttendee.setEventDayOne(event1);
      if(event2.length() > 0) 
        newAttendee.setEventDayOne(event2);
      if(event3.length() > 0) 
        newAttendee.setEventDayOne(event3);
      if(event4.length() > 0) 
        newAttendee.setEventDayOne(event4);
      if(event5.length() > 0) 
        newAttendee.setEventDayOne(event5);

      if(setup1Tech.length() > 0) 
        newAttendee.setSetUpOneTech(Integer.parseInt(setup1Tech));
      if(setup2Tech.length() > 0) 
        newAttendee.setSetUpTwoTech(Integer.parseInt(setup2Tech));
      if(setup3Tech.length() > 0) 
        newAttendee.setSetUpThreeTech(Integer.parseInt(setup3Tech));
      if(dryRunTech.length() > 0) 
        newAttendee.setDryRunTech(Integer.parseInt(dryRunTech));
      if(event1Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event1Tech));
      if(event2Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event2Tech));
      if(event3Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event3Tech));
      if(event4Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event4Tech));
      if(event5Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event5Tech));

      // set optional fields
      if(phone != null) {
        newAttendee.setPhoneNumber(phone);
      }
      if(cell != null) {
        newAttendee.setCellNumber(cell);
      }
      if(nickname != null) {
        newAttendee.setNickname(nickname);
      }

      // set presenter specific fields
      if(city == null || country == null || 
        city.length() == 0 || country.length() == 0) {
        errors.add(new Error("Make sure all required fields are filled out!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }

      newAttendee.setCity(city);
      newAttendee.setCountry(country);
    } else if(type.equals("evaluator")) {
      newAttendee = new Evaluator();

      // set general fields
      newAttendee.setEmail(email);
      newAttendee.setFirstName(firstName);
      newAttendee.setLastName(lastName);

      if(setup1.length() > 0) 
        newAttendee.setSetUpOne(setup1);
      if(setup2.length() > 0) 
        newAttendee.setSetUpTwo(setup2);
      if(setup3.length() > 0) 
        newAttendee.setSetUpThree(setup3);
      if(dryRun.length() > 0) 
        newAttendee.setDryRun(dryRun);
      if(event1.length() > 0) 
        newAttendee.setEventDayOne(event1);
      if(event2.length() > 0) 
        newAttendee.setEventDayOne(event2);
      if(event3.length() > 0) 
        newAttendee.setEventDayOne(event3);
      if(event4.length() > 0) 
        newAttendee.setEventDayOne(event4);
      if(event5.length() > 0) 
        newAttendee.setEventDayOne(event5);

      if(setup1Tech.length() > 0) 
        newAttendee.setSetUpOneTech(Integer.parseInt(setup1Tech));
      if(setup2Tech.length() > 0) 
        newAttendee.setSetUpTwoTech(Integer.parseInt(setup2Tech));
      if(setup3Tech.length() > 0) 
        newAttendee.setSetUpThreeTech(Integer.parseInt(setup3Tech));
      if(dryRunTech.length() > 0) 
        newAttendee.setDryRunTech(Integer.parseInt(dryRunTech));
      if(event1Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event1Tech));
      if(event2Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event2Tech));
      if(event3Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event3Tech));
      if(event4Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event4Tech));
      if(event5Tech.length() > 0) 
        newAttendee.setEventDayOneTech(Integer.parseInt(event5Tech));

      // set optional fields
      if(phone != null) {
        newAttendee.setPhoneNumber(phone);
      }
      if(cell != null) {
        newAttendee.setCellNumber(cell);
      }
      if(nickname != null) {
        newAttendee.setNickname(nickname);
      }

      // set presenter specific fields
      if(city == null || country == null || 
        city.length() == 0 || country.length() == 0) {
        errors.add(new Error("Make sure all required fields are filled out!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }

      newAttendee.setCity(city);
      newAttendee.setCountry(country);
    } else {
      errors.add(new Error("Unrecognized registration type!"));
      return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    if(attendees.findByEmail(email) != null) {
      errors.add(new Error("Registration with email " + email + " already exists!"));
      return new ResponseEntity<>(errors, HttpStatus.CONFLICT);
    }

    try {
      newAttendee.createId();

      // get time stamp
      DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
      Date date = new Date();
      String currentDateTime = dateFormat.format(date);
      newAttendee.setDateCreated(currentDateTime);
      newAttendee.setLastModified(currentDateTime);
      
      if(type.equals("supplier")) {
        suppliers.save((Supplier)newAttendee);
      } else if(type.equals("presenter")) {
        presenters.save((Presenter)newAttendee);
      } else if(type.equals("evaluator")) {
        evaluators.save((Evaluator)newAttendee);
      } else {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }
    catch(Exception e) {
      System.out.println(e);
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // TODO: SEND CONFIRMATION EMAIL

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  // get registration type from user for use on registration page.
  // this can be used to filter out unnecessary fields and used for posting to db
  @PostMapping(path = "/setRegistrationStatus")
  public Object sessionTest(HttpSession session, @RequestBody Map<String, String> json) {
    String registrationType = json.get("type");
    if (registrationType == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    session.setAttribute("registrationType", registrationType);
    String uid = session.getId();
    Map<String, String> map = new HashMap<String, String>();
    map.put("iid", uid);

    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping(path = "/getRegistrationStatus")
  public Object getRegStatus(HttpSession session) {
    if (session == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    String regtype = session.getAttribute("registrationType").toString();
    String uid = session.getId();

    Map<String, String> map = new HashMap<String, String>();
    map.put("type", regtype);
    map.put("iid", uid);

    return new ResponseEntity<>(map, HttpStatus.OK);
  }

}