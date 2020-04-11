package com.idte.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.security.Principal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
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
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;

import javax.mail.internet.MimeMessage;

@RestController
@RequestMapping
public class AttendeeController {
  @Autowired
  private JavaMailSender javaMailSender;
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

  @PostMapping(path = "/admin/checkinFind")
  public Object checkinFind(@RequestBody Map<String, String> json) {
    String search = json.get("id");
    if(search == null) {
      return new ResponseEntity<>(new Error("Error parsing ID"), HttpStatus.BAD_REQUEST);
    }

    Attendee attendee = attendees.findById(search).orElse(null);
    if(attendee == null) {
      return new ResponseEntity<>(new Error("Could not find attendee"), HttpStatus.NOT_FOUND);
    } else {
      return new ResponseEntity<>(attendee, HttpStatus.OK);
    }
  }

  @PostMapping(path = "/admin/markAttended")
  public Object markAttended(@RequestBody Map<String, String> json) {
    String search = json.get("id");
    String dayType = json.get("dayType");
    if(search == null || dayType == null) {
      return new ResponseEntity<>(new Error("Error parsing request"), HttpStatus.BAD_REQUEST);
    }
    Attendee attendee = attendees.findById(search).orElse(null);
    if(attendee == null) {
      return new ResponseEntity<>(new Error("Could not find attendee"), HttpStatus.NOT_FOUND);
    } else {
      if(dayType.equals("setUpOne")) {
        attendee.setSetUpOneAttended(!attendee.getSetUpOneAttended());
      } else if(dayType.equals("setUpTwo")) {
        attendee.setSetUpTwoAttended(!attendee.getSetUpTwoAttended());
      } else if(dayType.equals("setUpThree")) {
        attendee.setSetUpThreeAttended(!attendee.getSetUpThreeAttended());
      } else if(dayType.equals("dryRun")) {
        attendee.setDryRunAttended(!attendee.getDryRunAttended());
      } else if(dayType.equals("eventDayOne")) {
        attendee.setEventDayOneAttended(!attendee.getEventDayOneAttended());
      } else if(dayType.equals("eventDayTwo")) {
        attendee.setEventDayTwoAttended(!attendee.getEventDayTwoAttended());
      } else if(dayType.equals("eventDayThree")) {
        attendee.setEventDayThreeAttended(!attendee.getEventDayThreeAttended());
      } else if(dayType.equals("eventDayFour")) {
        attendee.setEventDayFourAttended(!attendee.getEventDayFourAttended());
      } else if(dayType.equals("eventDayFive")) {
        attendee.setEventDayFiveAttended(!attendee.getEventDayFiveAttended());
      }
      return new ResponseEntity<>(attendees.save(attendee), HttpStatus.OK);
    }
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
    if (json.get("email") == null || json.get("email").length() == 0) {
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

    if (setup1 != null && !setup1.equals(attendee.getSetUpOne())) {
      attendee.setSetUpOne(setup1);
      changes = true;
    }
    if (setup2 != null && !setup2.equals(attendee.getSetUpTwo())) {
      attendee.setSetUpTwo(setup2);
      changes = true;
    }
    if (setup3 != null && !setup3.equals(attendee.getSetUpThree())) {
      attendee.setSetUpThree(setup3);
      changes = true;
    }
    if (dryRun != null && !dryRun.equals(attendee.getDryRun())) {
      attendee.setDryRun(dryRun);
      changes = true;
    }
    if (event1 != null && !event1.equals(attendee.getEventDayOne())) {
      attendee.setEventDayOne(event1);
      changes = true;
    }
    if (event2 != null && !event2.equals(attendee.getEventDayTwo())) {
      attendee.setEventDayTwo(event2);
      changes = true;
    }
    if (event3 != null && !event3.equals(attendee.getEventDayThree())) {
      attendee.setEventDayThree(event3);
      changes = true;
    }
    if (event4 != null && !event4.equals(attendee.getEventDayFour())) {
      attendee.setEventDayFour(event4);
      changes = true;
    }
    if (event5 != null && !event5.equals(attendee.getEventDayFive())) {
      attendee.setEventDayFive(event5);
      changes = true;
    }

    if (setup1Tech != null && Integer.parseInt(setup1Tech) != attendee.getSetUpOneTech()) {
      attendee.setSetUpOneTech(Integer.parseInt(setup1Tech));
      changes = true;
    }
    if (setup2Tech != null && Integer.parseInt(setup2Tech) != attendee.getSetUpTwoTech()) {
      attendee.setSetUpTwoTech(Integer.parseInt(setup2Tech));
      changes = true;
    }
    if (setup3Tech != null && Integer.parseInt(setup3Tech) != attendee.getSetUpThreeTech()) {
      attendee.setSetUpThreeTech(Integer.parseInt(setup3Tech));
      changes = true;
    }
    if (dryRunTech != null && Integer.parseInt(dryRunTech) != attendee.getDryRunTech()) {
      attendee.setDryRunTech(Integer.parseInt(dryRunTech));
      changes = true;
    }
    if (event1Tech != null && Integer.parseInt(event1Tech) != attendee.getEventDayOneTech()) {
      attendee.setEventDayOneTech(Integer.parseInt(event1Tech));
      changes = true;
    }
    if (event2Tech != null && Integer.parseInt(event2Tech) != attendee.getEventDayTwoTech()) {
      attendee.setEventDayTwoTech(Integer.parseInt(event2Tech));
      changes = true;
    }
    if (event3Tech != null && Integer.parseInt(event3Tech) != attendee.getEventDayThreeTech()) {
      attendee.setEventDayThreeTech(Integer.parseInt(event3Tech));
      changes = true;
    }
    if (event4Tech != null && Integer.parseInt(event4Tech) != attendee.getEventDayFourTech()) {
      attendee.setEventDayFourTech(Integer.parseInt(event4Tech));
      changes = true;
    }
    if (event5Tech != null && Integer.parseInt(event5Tech) != attendee.getEventDayFiveTech()) {
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

    // evaluator specific fields
    String categoryOne = json.get("categoryOne");
    String categoryTwo = json.get("categoryTwo");
    String categoryThree = json.get("categoryThree");

    try {
      if(categoryOne != null && ((Evaluator)attendee).getCategoryOne() != null) {
        if(!categoryOne.equals(((Evaluator)attendee).getCategoryOne())) {
          ((Evaluator)attendee).setCategoryOne(categoryOne);
          changes = true;
        }
      }
      if(categoryTwo != null && ((Evaluator)attendee).getCategoryTwo() != null) {
        if(!categoryTwo.equals(((Evaluator)attendee).getCategoryTwo())) {
          ((Evaluator)attendee).setCategoryTwo(categoryTwo);
          changes = true;
        }
      }
      if(categoryThree != null && ((Evaluator)attendee).getCategoryThree() != null) {
        if(!categoryThree.equals(((Evaluator)attendee).getCategoryThree())) {
          ((Evaluator)attendee).setCategoryThree(categoryThree);
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
    if (json.get("email") == null || json.get("email").length() == 0) {
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

  //Handle attendee checkin for valid or invalid entry
  @PostMapping(path = "/checkin", consumes = "application/json", produces = "application/json")
  public Object attendeeCheckin(@RequestBody Map<String, String> json)
  {
  
   // Attendee attendee = new Attendee();

    String attendeeID = json.get("attendeeID");
    String eventDayOne = json.get("eventDayOne");
    String eventDayTwo = json.get("eventDayTwo");
    String eventDayThree = json.get("eventDayThree");
    String eventDayFour = json.get("eventDayFour");
    String eventDayFive = json.get("eventDayFive");

    Attendee attendee = attendees.findById(attendeeID).orElse(null);
    if (attendee == null)
    {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //Look at each event day.  If it is valid then have it be valid in the database
    if (attendee.getEventDayOne().equals(eventDayOne))
    {
        return attendee.getEventDayOneAttended();
    }
    if (attendee.getEventDayTwo().equals(eventDayTwo))
    {
        return attendee.getEventDayTwoAttended();
    }
    if (attendee.getEventDayThree().equals(eventDayThree))
    {
        return attendee.getEventDayThreeAttended();
    }
    if (attendee.getEventDayFour().equals(eventDayFour))
    {
        return attendee.getEventDayFourAttended();
    }
    if (attendee.getEventDayFive().equals(eventDayFive))
    {
        return attendee.getEventDayFiveAttended();
    }

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping(path = "/attendees", consumes = "application/json", produces = "application/json")
  public Object submitRegistration(@RequestBody Map<String, String> json) {
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

    String category1 = json.get("category1");
    String category2 = json.get("category2");
    String category3 = json.get("category3");

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

      int attendedDays = 0;

      if(setup1.length() > 0) {
        newAttendee.setSetUpOne(setup1);
        attendedDays++;
        if(setup1Tech.length() > 0) {
          newAttendee.setSetUpOneTech(Integer.parseInt(setup1Tech));
        } else {
          errors.add(new Error("Please select a technology for set up day one!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(setup2.length() > 0) {
        newAttendee.setSetUpTwo(setup2);
        attendedDays++;
        if(setup2Tech.length() > 0) {
          newAttendee.setSetUpTwoTech(Integer.parseInt(setup2Tech));
        } else {
          errors.add(new Error("Please select a technology for set up day two!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(setup3.length() > 0) {
        newAttendee.setSetUpThree(setup3);
        attendedDays++;
        if(setup3Tech.length() > 0) {
          newAttendee.setSetUpThreeTech(Integer.parseInt(setup3Tech));
        } else {
          errors.add(new Error("Please select a technology for set up day three!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(dryRun.length() > 0) {
        newAttendee.setDryRun(dryRun);
        attendedDays++;
        if(dryRunTech.length() > 0) {
          newAttendee.setDryRunTech(Integer.parseInt(dryRunTech));
        } else {
          errors.add(new Error("Please select a technology for the dry run!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event1.length() > 0) {
        newAttendee.setEventDayOne(event1);
        attendedDays++;
        if(event1Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event1Tech));
        } else {
          errors.add(new Error("Please select a technology for event day one!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event2.length() > 0) {
        newAttendee.setEventDayOne(event2);
        attendedDays++;
        if(event2Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event2Tech));
        } else {
          errors.add(new Error("Please select a technology for event day two!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event3.length() > 0) {
        newAttendee.setEventDayOne(event3);
        attendedDays++;
        if(event3Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event3Tech));
        } else {
          errors.add(new Error("Please select a technology for event day three!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event4.length() > 0) {
        newAttendee.setEventDayOne(event4);
        attendedDays++;
        if(event4Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event4Tech));
        } else {
          errors.add(new Error("Please select a technology for event day four!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event5.length() > 0) {
        newAttendee.setEventDayOne(event5);
        attendedDays++;
        if(event5Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event5Tech));
        } else {
          errors.add(new Error("Please select a technology for event day five!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }

      if(attendedDays == 0) {
        errors.add(new Error("Select at least one day to attend!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }

      
      // set optional fields
      if(cell != null) {
        newAttendee.setCellNumber(cell);
      }
      if(nickname != null) {
        newAttendee.setNickname(nickname);
      }

      // set supplier specific fields
      if(city == null || country == null || company == null || phone == null ||
        city.length() == 0 || country.length() == 0 || company.length() == 0 || phone.length() == 0) {
        errors.add(new Error("Make sure all required fields are filled out!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }

      newAttendee.setCity(city);
      newAttendee.setPhoneNumber(phone);
      newAttendee.setCountry(country);
      ((Supplier)newAttendee).setCompany(company);
    } else if(type.equals("presenter")) {
      newAttendee = new Presenter();

      // set general fields
      newAttendee.setEmail(email);
      newAttendee.setFirstName(firstName);
      newAttendee.setLastName(lastName);

      int attendedDays = 0;

      if(setup1.length() > 0) {
        newAttendee.setSetUpOne(setup1);
        attendedDays++;
        if(setup1Tech.length() > 0) {
          newAttendee.setSetUpOneTech(Integer.parseInt(setup1Tech));
        } else {
          errors.add(new Error("Please select a technology for set up day one!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(setup2.length() > 0) {
        newAttendee.setSetUpTwo(setup2);
        attendedDays++;
        if(setup2Tech.length() > 0) {
          newAttendee.setSetUpTwoTech(Integer.parseInt(setup2Tech));
        } else {
          errors.add(new Error("Please select a technology for set up day two!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(setup3.length() > 0) {
        newAttendee.setSetUpThree(setup3);
        attendedDays++;
        if(setup3Tech.length() > 0) {
          newAttendee.setSetUpThreeTech(Integer.parseInt(setup3Tech));
        } else {
          errors.add(new Error("Please select a technology for set up day three!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(dryRun.length() > 0) {
        newAttendee.setDryRun(dryRun);
        attendedDays++;
        if(dryRunTech.length() > 0) {
          newAttendee.setDryRunTech(Integer.parseInt(dryRunTech));
        } else {
          errors.add(new Error("Please select a technology for the dry run!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event1.length() > 0) {
        newAttendee.setEventDayOne(event1);
        attendedDays++;
        if(event1Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event1Tech));
        } else {
          errors.add(new Error("Please select a technology for event day one!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event2.length() > 0) {
        newAttendee.setEventDayOne(event2);
        attendedDays++;
        if(event2Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event2Tech));
        } else {
          errors.add(new Error("Please select a technology for event day two!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event3.length() > 0) {
        newAttendee.setEventDayOne(event3);
        attendedDays++;
        if(event3Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event3Tech));
        } else {
          errors.add(new Error("Please select a technology for event day three!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event4.length() > 0) {
        newAttendee.setEventDayOne(event4);
        attendedDays++;
        if(event4Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event4Tech));
        } else {
          errors.add(new Error("Please select a technology for event day four!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }
      if(event5.length() > 0) {
        newAttendee.setEventDayOne(event5);
        attendedDays++;
        if(event5Tech.length() > 0) {
          newAttendee.setEventDayOneTech(Integer.parseInt(event5Tech));
        } else {
          errors.add(new Error("Please select a technology for event day five!"));
          return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
      }

      if(attendedDays == 0) {
        errors.add(new Error("Select at least one day to attend!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }

      // set optional fields
      if(cell != null) {
        newAttendee.setCellNumber(cell);
      }
      if(nickname != null) {
        newAttendee.setNickname(nickname);
      }

      // set presenter specific fields
      if(city == null || country == null || phone == null || phone.length() == 0 ||
        city.length() == 0 || country.length() == 0) {
        errors.add(new Error("Make sure all required fields are filled out!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }

      newAttendee.setCity(city);
      newAttendee.setPhoneNumber(phone);
      newAttendee.setCountry(country);
    } else if(type.equals("evaluator")) {
      newAttendee = new Evaluator();

      // set general fields
      newAttendee.setEmail(email);
      newAttendee.setFirstName(firstName);
      newAttendee.setLastName(lastName);

      int attendedDays = 0;

      if(setup1.length() > 0) {
        newAttendee.setSetUpOne(setup1);
        attendedDays++;
      }
      if(setup2.length() > 0) {
        newAttendee.setSetUpTwo(setup2);
        attendedDays++;
      }
      if(setup3.length() > 0) {
        newAttendee.setSetUpThree(setup3);
        attendedDays++;
      }
      if(dryRun.length() > 0) {
        newAttendee.setDryRun(dryRun);
        attendedDays++;
      }
      if(event1.length() > 0) {
        newAttendee.setEventDayOne(event1);
        attendedDays++;
      }
      if(event2.length() > 0) {
        newAttendee.setEventDayOne(event2);
        attendedDays++;
      }
      if(event3.length() > 0) {
        newAttendee.setEventDayOne(event3);
        attendedDays++;
      }
      if(event4.length() > 0) {
        newAttendee.setEventDayOne(event4);
        attendedDays++;
      }
      if(event5.length() > 0) {
        newAttendee.setEventDayOne(event5);
        attendedDays++;
      }

      if(attendedDays == 0) {
        errors.add(new Error("Select a day to attend!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }

      // set optional fields
      if(phone != null) {
        newAttendee.setPhoneNumber(phone);
      }
      if(nickname != null) {
        newAttendee.setNickname(nickname);
      }

      // set evaluator specific fields
      if(city == null || country == null || cell == null || 
        category1 == null || category2 == null || category3 == null ||
        cell.length() == 0 || city.length() == 0 || country.length() == 0 ||
        category1.length() == 0 || category2.length() == 0 || category3.length() == 0) {
        errors.add(new Error("Make sure all required fields are filled out!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }
      ((Evaluator)newAttendee).setCategoryOne(category1);
      ((Evaluator)newAttendee).setCategoryTwo(category2);
      ((Evaluator)newAttendee).setCategoryThree(category3);
      newAttendee.setCellNumber(cell);
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

    new Thread(() -> {sendEmail(email, newAttendee.getId());}, "Email-Thread").start();

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @Async
  public void sendEmail(String address, String id) {
    File imgfolder = new File("qrimgs");
    if (!imgfolder.exists()) {
      imgfolder.mkdir();
    }
  
    MimeMessage msg = javaMailSender.createMimeMessage();

    try {
      String filePath = "qrimgs/" + id + ".png";
      File file = new File(filePath);
      if(!file.exists()) {
        QRCode.createQRImage(file, id, 200, filePath);
      }

      MimeMessageHelper helper = new MimeMessageHelper(msg, true);
      helper.addAttachment("QRCode.png", file);

      helper.setTo(address);
      helper.setSubject("Ford IDTE: Registration Confirmation");
      helper.setText("Thank you for registering for the Ford IDTE event, attached below is your QRCode which will be used to identify you at check in.");
      javaMailSender.send(msg);
    }
    catch(Exception m) {
      m.printStackTrace();
    }
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

  @GetMapping(path = "/admin/attendeeExcel.xlsx", produces = "application/excel")
  public Object exportAttendeesExcel() {
    XSSFWorkbook workbook = buildExcelDocument();
    DateFormat dateFormat = new SimpleDateFormat("MMddyyyyHHmmss");
    Date date = new Date();
    String fileName = dateFormat.format(date) + "_attendees.xlsx";
    try {
      File dir = new File("excelExports");
      if(!dir.exists()) {
        dir.mkdir();
      }
      FileOutputStream out = new FileOutputStream(new File("excelExports/" + fileName));
      workbook.write(out);
      out.close();
      workbook.close();
      return new FileSystemResource("excelExports/" + fileName);
    } catch(Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping(path = "/admin/attendeeQR", produces = MediaType.IMAGE_PNG_VALUE)
  public Object getQRCode(@RequestBody Map<String, String> json) {
    String id = json.get("id");
    if(id == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    Attendee attendee = attendees.findById(id).orElse(null);
    if(attendee == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    File dir = new File("qrimgs");
    if(!dir.exists()) {
      dir.mkdir();
    }

    String filePath = "qrimgs/" + attendee.getId() + ".png";
    try {
      File file = new File(filePath);
      if(!file.exists()) {
        QRCode.createQRImage(file, attendee.getId(), 200, filePath);
      }
      FileSystemResource resource = new FileSystemResource(file);
      InputStream in = resource.getInputStream();
      byte[] imageBytes = new byte[(int)file.length()];
      in.read(imageBytes, 0, imageBytes.length);
      in.close();

      String base64 = Base64.getEncoder().encodeToString(imageBytes);
      return base64;
    }
    catch(Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected XSSFWorkbook buildExcelDocument() {
    XSSFWorkbook workbook = new XSSFWorkbook();
    XSSFSheet sheet = workbook.createSheet("Attendees");

    List<Supplier> supps = suppliers.findAll();
    List<Presenter> presents = presenters.findAll();
    List<Evaluator> evals = evaluators.findAll();

    XSSFRow header = sheet.createRow(0);
    header.createCell(0).setCellValue("Type");
    header.createCell(1).setCellValue("Attendee ID");
    header.createCell(2).setCellValue("Last Name");
    header.createCell(3).setCellValue("First Name");
    header.createCell(4).setCellValue("Email");
    header.createCell(5).setCellValue("Nickname");
    header.createCell(6).setCellValue("Phone Number");
    header.createCell(7).setCellValue("Cell Number");
    header.createCell(8).setCellValue("Country");
    header.createCell(9).setCellValue("City");
    header.createCell(10).setCellValue("Comments");
    header.createCell(11).setCellValue("Company");
    header.createCell(12).setCellValue("Date Created");
    header.createCell(13).setCellValue("Date Last Modified");
    header.createCell(14).setCellValue("Last Modified By");

    header.createCell(15).setCellValue("Setup Day One Date");
    header.createCell(16).setCellValue("Setup Day Two Date");
    header.createCell(17).setCellValue("Setup Day Three Date");
    header.createCell(18).setCellValue("Dry Run Date");
    header.createCell(19).setCellValue("Event Day One Date");
    header.createCell(20).setCellValue("Event Day Two Date");
    header.createCell(21).setCellValue("Event Day Three Date");
    header.createCell(22).setCellValue("Event Day Four Date");
    header.createCell(23).setCellValue("Event Day Five Date");

    header.createCell(24).setCellValue("Setup Day One Technology");
    header.createCell(25).setCellValue("Setup Day Two Technology");
    header.createCell(26).setCellValue("Setup Day Three Technology");
    header.createCell(27).setCellValue("Dry Run Technology");
    header.createCell(28).setCellValue("Event Day One Technology");
    header.createCell(29).setCellValue("Event Day Two Technology");
    header.createCell(30).setCellValue("Event Day Three Technology");
    header.createCell(31).setCellValue("Event Day Four Technology");
    header.createCell(32).setCellValue("Event Day Five Technology");

    header.createCell(33).setCellValue("Setup Day One Attendance");
    header.createCell(34).setCellValue("Setup Day Two Attendance");
    header.createCell(35).setCellValue("Setup Day Three Attendance");
    header.createCell(36).setCellValue("Dry Run Attendance");
    header.createCell(37).setCellValue("Event Day One Attendance");
    header.createCell(38).setCellValue("Event Day Two Attendance");
    header.createCell(39).setCellValue("Event Day Three Attendance");
    header.createCell(40).setCellValue("Event Day Four Attendance");
    header.createCell(41).setCellValue("Event Day Five Attendance");

    header.createCell(42).setCellValue("Category One Pick");
    header.createCell(43).setCellValue("Category Two Pick");
    header.createCell(44).setCellValue("Category Three Pick");

    int rowNum = 0;

    for(Supplier s: supps) {
      XSSFRow row = sheet.createRow(++rowNum);
      row.createCell(0).setCellValue("Supplier");
      row.createCell(1).setCellValue(s.getId());
      row.createCell(2).setCellValue(s.getLastName());
      row.createCell(3).setCellValue(s.getFirstName());
      row.createCell(4).setCellValue(s.getEmail());
      row.createCell(5).setCellValue(s.getNickname());
      row.createCell(6).setCellValue(s.getPhoneNumber());
      row.createCell(7).setCellValue(s.getCellNumber());
      row.createCell(8).setCellValue(s.getCountry());
      row.createCell(9).setCellValue(s.getCity());
      row.createCell(10).setCellValue(s.getComments());
      row.createCell(11).setCellValue(s.getCompany());
      row.createCell(12).setCellValue(s.getDateCreated());
      row.createCell(13).setCellValue(s.getLastModified());
      row.createCell(14).setCellValue(s.getModifiedBy());
  
      row.createCell(15).setCellValue(s.getSetUpOne());
      row.createCell(16).setCellValue(s.getSetUpTwo());
      row.createCell(17).setCellValue(s.getSetUpThree());
      row.createCell(18).setCellValue(s.getDryRun());
      row.createCell(19).setCellValue(s.getEventDayOne());
      row.createCell(20).setCellValue(s.getEventDayTwo());
      row.createCell(21).setCellValue(s.getEventDayThree());
      row.createCell(22).setCellValue(s.getEventDayFour());
      row.createCell(23).setCellValue(s.getEventDayFive());
  
      row.createCell(24).setCellValue(s.getSetUpOneTech());
      row.createCell(25).setCellValue(s.getSetUpTwoTech());
      row.createCell(26).setCellValue(s.getSetUpThreeTech());
      row.createCell(27).setCellValue(s.getDryRunTech());
      row.createCell(28).setCellValue(s.getEventDayOneTech());
      row.createCell(29).setCellValue(s.getEventDayTwoTech());
      row.createCell(30).setCellValue(s.getEventDayThreeTech());
      row.createCell(31).setCellValue(s.getEventDayFourTech());
      row.createCell(32).setCellValue(s.getEventDayFiveTech());
  
      row.createCell(33).setCellValue(s.getSetUpOneAttended());
      row.createCell(34).setCellValue(s.getSetUpTwoAttended());
      row.createCell(35).setCellValue(s.getSetUpThreeAttended());
      row.createCell(36).setCellValue(s.getDryRunAttended());
      row.createCell(37).setCellValue(s.getEventDayOneAttended());
      row.createCell(38).setCellValue(s.getEventDayTwoAttended());
      row.createCell(39).setCellValue(s.getEventDayThreeAttended());
      row.createCell(40).setCellValue(s.getEventDayFourAttended());
      row.createCell(41).setCellValue(s.getEventDayFiveAttended());

      row.createCell(42).setCellValue(" ");
      row.createCell(43).setCellValue(" ");
      row.createCell(44).setCellValue(" ");
    }

    for(Presenter s: presents) {
      XSSFRow row = sheet.createRow(++rowNum);
      row.createCell(0).setCellValue("Presenter");
      row.createCell(1).setCellValue(s.getId());
      row.createCell(2).setCellValue(s.getLastName());
      row.createCell(3).setCellValue(s.getFirstName());
      row.createCell(4).setCellValue(s.getEmail());
      row.createCell(5).setCellValue(s.getNickname());
      row.createCell(6).setCellValue(s.getPhoneNumber());
      row.createCell(7).setCellValue(s.getCellNumber());
      row.createCell(8).setCellValue(s.getCountry());
      row.createCell(9).setCellValue(s.getCity());
      row.createCell(10).setCellValue(s.getComments());
      row.createCell(11).setCellValue(" ");
      row.createCell(12).setCellValue(s.getDateCreated());
      row.createCell(13).setCellValue(s.getLastModified());
      row.createCell(14).setCellValue(s.getModifiedBy());
  
      row.createCell(15).setCellValue(s.getSetUpOne());
      row.createCell(16).setCellValue(s.getSetUpTwo());
      row.createCell(17).setCellValue(s.getSetUpThree());
      row.createCell(18).setCellValue(s.getDryRun());
      row.createCell(19).setCellValue(s.getEventDayOne());
      row.createCell(20).setCellValue(s.getEventDayTwo());
      row.createCell(21).setCellValue(s.getEventDayThree());
      row.createCell(22).setCellValue(s.getEventDayFour());
      row.createCell(23).setCellValue(s.getEventDayFive());
  
      row.createCell(24).setCellValue(s.getSetUpOneTech());
      row.createCell(25).setCellValue(s.getSetUpTwoTech());
      row.createCell(26).setCellValue(s.getSetUpThreeTech());
      row.createCell(27).setCellValue(s.getDryRunTech());
      row.createCell(28).setCellValue(s.getEventDayOneTech());
      row.createCell(29).setCellValue(s.getEventDayTwoTech());
      row.createCell(30).setCellValue(s.getEventDayThreeTech());
      row.createCell(31).setCellValue(s.getEventDayFourTech());
      row.createCell(32).setCellValue(s.getEventDayFiveTech());
  
      row.createCell(33).setCellValue(s.getSetUpOneAttended());
      row.createCell(34).setCellValue(s.getSetUpTwoAttended());
      row.createCell(35).setCellValue(s.getSetUpThreeAttended());
      row.createCell(36).setCellValue(s.getDryRunAttended());
      row.createCell(37).setCellValue(s.getEventDayOneAttended());
      row.createCell(38).setCellValue(s.getEventDayTwoAttended());
      row.createCell(39).setCellValue(s.getEventDayThreeAttended());
      row.createCell(40).setCellValue(s.getEventDayFourAttended());
      row.createCell(41).setCellValue(s.getEventDayFiveAttended());

      row.createCell(42).setCellValue(" ");
      row.createCell(43).setCellValue(" ");
      row.createCell(44).setCellValue(" ");
    }

    for(Evaluator s: evals) {
      XSSFRow row = sheet.createRow(++rowNum);
      row.createCell(0).setCellValue("Evaluator");
      row.createCell(1).setCellValue(s.getId());
      row.createCell(2).setCellValue(s.getLastName());
      row.createCell(3).setCellValue(s.getFirstName());
      row.createCell(4).setCellValue(s.getEmail());
      row.createCell(5).setCellValue(s.getNickname());
      row.createCell(6).setCellValue(s.getPhoneNumber());
      row.createCell(7).setCellValue(s.getCellNumber());
      row.createCell(8).setCellValue(s.getCountry());
      row.createCell(9).setCellValue(s.getCity());
      row.createCell(10).setCellValue(s.getComments());
      row.createCell(11).setCellValue(" ");
      row.createCell(12).setCellValue(s.getDateCreated());
      row.createCell(13).setCellValue(s.getLastModified());
      row.createCell(14).setCellValue(s.getModifiedBy());
  
      row.createCell(15).setCellValue(s.getSetUpOne());
      row.createCell(16).setCellValue(s.getSetUpTwo());
      row.createCell(17).setCellValue(s.getSetUpThree());
      row.createCell(18).setCellValue(s.getDryRun());
      row.createCell(19).setCellValue(s.getEventDayOne());
      row.createCell(20).setCellValue(s.getEventDayTwo());
      row.createCell(21).setCellValue(s.getEventDayThree());
      row.createCell(22).setCellValue(s.getEventDayFour());
      row.createCell(23).setCellValue(s.getEventDayFive());
  
      row.createCell(24).setCellValue(s.getSetUpOneTech());
      row.createCell(25).setCellValue(s.getSetUpTwoTech());
      row.createCell(26).setCellValue(s.getSetUpThreeTech());
      row.createCell(27).setCellValue(s.getDryRunTech());
      row.createCell(28).setCellValue(s.getEventDayOneTech());
      row.createCell(29).setCellValue(s.getEventDayTwoTech());
      row.createCell(30).setCellValue(s.getEventDayThreeTech());
      row.createCell(31).setCellValue(s.getEventDayFourTech());
      row.createCell(32).setCellValue(s.getEventDayFiveTech());
  
      row.createCell(33).setCellValue(s.getSetUpOneAttended());
      row.createCell(34).setCellValue(s.getSetUpTwoAttended());
      row.createCell(35).setCellValue(s.getSetUpThreeAttended());
      row.createCell(36).setCellValue(s.getDryRunAttended());
      row.createCell(37).setCellValue(s.getEventDayOneAttended());
      row.createCell(38).setCellValue(s.getEventDayTwoAttended());
      row.createCell(39).setCellValue(s.getEventDayThreeAttended());
      row.createCell(40).setCellValue(s.getEventDayFourAttended());
      row.createCell(41).setCellValue(s.getEventDayFiveAttended());

      row.createCell(42).setCellValue(s.getCategoryOne());
      row.createCell(43).setCellValue(s.getCategoryTwo());
      row.createCell(44).setCellValue(s.getCategoryThree());
    }

    try {
      return workbook;
    }
    catch(Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}