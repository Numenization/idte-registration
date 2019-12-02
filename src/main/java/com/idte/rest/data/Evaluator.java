package com.idte.rest.data;

import javax.persistence.Entity;

@Entity
public class Evaluator extends Attendee {
    // don't need anything attendee doesn't have, just a concrete version of it

    @Override
    public String toString() {
        return "Evaluator{email='" + this.email + "' firstName='" + this.firstName + 
            "' lastName='" + this.lastName + "' nickname='" + this.nickname + 
            "' phoneNumber='" + this.phoneNumber + "' cellNumber='" + this.cellNumber + 
            "' country='" + this.country + "' city='" + this.city + "'}";
    }
}