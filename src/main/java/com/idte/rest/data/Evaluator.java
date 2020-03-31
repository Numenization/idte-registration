package com.idte.rest.data;

import javax.persistence.Entity;

@Entity
public class Evaluator extends Attendee {

    public static Evaluator from(Evaluator evaluator) {
        Evaluator newEvaluator = new Evaluator();

        newEvaluator.email = evaluator.email;
        newEvaluator.firstName = evaluator.firstName;
        newEvaluator.lastName = evaluator.lastName;
        newEvaluator.nickname = evaluator.nickname;
        newEvaluator.phoneNumber = evaluator.phoneNumber;
        newEvaluator.cellNumber = evaluator.cellNumber;
        newEvaluator.country = evaluator.country;
        newEvaluator.city = evaluator.city;
        newEvaluator.comments = evaluator.comments;
        newEvaluator.dateString = evaluator.dateString;

        return newEvaluator;
    }

    @Override
    public String toString() {
        return "Evaluator{email='" + this.email + "' firstName='" + this.firstName + 
            "' lastName='" + this.lastName + "' nickname='" + this.nickname + 
            "' phoneNumber='" + this.phoneNumber + "' cellNumber='" + this.cellNumber + 
            "' country='" + this.country + "' city='" + this.city + "'}";
    }
}