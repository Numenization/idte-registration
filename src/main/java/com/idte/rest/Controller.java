package com.idte.rest;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

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
/* 
    // get from UUID
    @GetMapping(path="/{id}")
    public Attendee findAttendeeById(@PathVariable("id") String id) {
        Attendee find = new Attendee();
        find.setId(id);
        Example<Attendee> example = Example.of(find);
        return attendees.findOne(example).orElse(null);
    }
 */
    // get from email
    @GetMapping(path="/{email}")
    public Attendee findAttendeeByEmail(@PathVariable("email") String email) {
        Attendee find = new Attendee();
        find.setEmail(email);
        Example<Attendee> example = Example.of(find);
        return attendees.findOne(example).orElse(null);
    }

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

    // TODO: Update attendees

    // TODO: Delete attendee
}