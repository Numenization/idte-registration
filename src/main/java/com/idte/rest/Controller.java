package com.idte.rest;

import com.idte.rest.data.Attendee;
import com.idte.rest.data.Evaluator;
import com.idte.rest.data.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    // TODO: Get attendee by PK
    // TODO: Get supplier by PK
    // TODO: Get evaluator by PK

    // TODO: Post supplier
    // TODO: Post evaluator

    // TODO: Update attendees

    // TODO: Delete attendee
}