package com.idte.rest;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.idte.rest.data.Attendee;
import com.idte.rest.data.Error;
import com.idte.rest.data.Evaluator;
import com.idte.rest.data.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/idte")
public class Controller {
    @Autowired
    private AttendeeRepository attendees;
    @Autowired
    private SupplierRepository suppliers;
    @Autowired
    private EvaluatorRepository evaluators;

    // get all of either attendees, suppliers, or evaluators
    @GetMapping(path="/attendees")
    public Iterable<Attendee> findAllAttendees() {
        return attendees.findAll();
    }
    @GetMapping(path="/suppliers")
    public Iterable<Supplier> findAllSuppliers() {
        return suppliers.findAll();
    }
    @GetMapping(path="/evaluators")
    public Iterable<Evaluator> findAllEvaluators() {
        return evaluators.findAll();
    }

    // get from email
    @GetMapping(path="/{email}")
    public Attendee findAttendeeByEmail(@PathVariable("email") String search) {
        Attendee find = new Attendee();
        find.setEmail(search);
        Example<Attendee> example = Example.of(find);
        return attendees.findOne(example).orElse(null);
    }

    // create a new supplier
    @PostMapping(path = "/suppliers", consumes = "application/json", produces = "application/json")
    public Object createSupplier(@RequestBody Supplier attendee) {
        // extract request info into new supplier object
        Supplier newAttendee = Supplier.from(attendee);

        // make sure we have a unique email
        Supplier uniqueTest = new Supplier();
        uniqueTest.setEmail(newAttendee.getEmail());
        Example<Supplier> example = Example.of(uniqueTest);
        if(suppliers.findOne(example).orElse(null) != null) {
            return new ResponseEntity<>(new Error("Entity with email " + uniqueTest.getEmail() + " already exists."), HttpStatus.CONFLICT);
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
        }
        catch(Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // create a new evaluator
    @PostMapping(path = "/evaluators", consumes = "application/json", produces = "application/json")
    public Object createEvaluator(@RequestBody Evaluator attendee) {
        // extract request info into new supplier object
        Evaluator newAttendee = Evaluator.from(attendee);

        // make sure we have a unique email
        Evaluator uniqueTest = new Evaluator();
        uniqueTest.setEmail(newAttendee.getEmail());
        Example<Evaluator> example = Example.of(uniqueTest);
        if(evaluators.findOne(example).orElse(null) != null) {
            return new ResponseEntity<>(new Error("Entity with email " + uniqueTest.getEmail() + " already exists."), HttpStatus.CONFLICT);
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
        }
        catch(Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/attendees")
    public Object updateAttendee(@RequestBody Map<String, String> json) {
        // no matter what, we need the original email of the attendee to perform this update
        // if we are changing email, we look for a "newEmail" entry in the json
        // otherwise look for valid fields in the json and update the attendee with their values

        // first we have to find a valid user given the email, if one exists
        String email = json.get("email");
        if(email == null) {
            return new ResponseEntity<>(new Error("Missing email in PUT request"), HttpStatus.BAD_REQUEST);
        }
        Attendee testAttendee = new Attendee();
        testAttendee.setEmail(email);
        Example<Attendee> example = Example.of(testAttendee);
        Attendee attendee = attendees.findOne(example).orElse(null);
        if(attendee == null) {
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

        if(newEmail != null && !newEmail.equals(attendee.getEmail())) {
            attendee.setEmail(newEmail);
            changes = true;
        }
        if(firstName != null && !firstName.equals(attendee.getFirstName())) {
            attendee.setFirstName(firstName);
            changes = true;
        }
        if(lastName != null && !lastName.equals(attendee.getLastName())) {
            attendee.setLastName(lastName);
            changes = true;
        }
        if(nickname != null && !nickname.equals(attendee.getNickname())) {
            attendee.setNickname(nickname);
            changes = true;
        }
        if(phoneNumber != null && !phoneNumber.equals(attendee.getPhoneNumber())) {
            attendee.setPhoneNumber(phoneNumber);
            changes = true;
        }
        if(cellNumber != null && !cellNumber.equals(attendee.getCellNumber())) {
            attendee.setCellNumber(cellNumber);
            changes = true;
        }
        if(country != null && !country.equals(attendee.getCountry())) {
            attendee.setCountry(country);
            changes = true;
        }
        if(city != null && !city.equals(attendee.getCity())) {
            attendee.setCity(city);
            changes = true;
        }
        if(comments != null && !comments.equals(attendee.getComments())) {
            attendee.setComments(comments);
            changes = true;
        }
        
        // now try to update supplier specific fields
        String technologyNumber = json.get("technologyNumber");
        String company = json.get("company");

        try {
            if(technologyNumber != null && ((Supplier)attendee).getTechnologyNumber() != null) {
                if(!technologyNumber.equals(((Supplier)attendee).getTechnologyNumber())) {
                    ((Supplier)attendee).setTechnologyNumber(technologyNumber);
                    changes = true;
                }
            }
            if(company != null && ((Supplier)attendee).getCompany() != null) {
                if(!company.equals(((Supplier)attendee).getCompany())) {
                    ((Supplier)attendee).setCompany(company);
                    changes = true;
                }
            }
        }
        catch(Exception e) {
            return new ResponseEntity<>(new Error(e.getMessage()), HttpStatus.BAD_REQUEST);
        }

        // if we made changes, update the attendee's last modified date and send HTTP OK
        // otherwise send HTTP NOT MODIFIED
        if(changes) {
            DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
            Date date = new Date();
            String currentDateTime = dateFormat.format(date);
            attendee.setLastModified(currentDateTime);

            attendees.save(attendee);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    // TODO: Delete attendee
}