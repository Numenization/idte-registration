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

        newEvaluator.setUpOne = evaluator.setUpOne != null ? evaluator.setUpOne : "";
        newEvaluator.setUpTwo = evaluator.setUpTwo != null ? evaluator.setUpTwo : "";
        newEvaluator.setUpThree = evaluator.setUpThree != null ? evaluator.setUpThree : "";
        newEvaluator.dryRun = evaluator.dryRun != null ? evaluator.dryRun : "";
        newEvaluator.eventDayOne = evaluator.eventDayOne != null ? evaluator.eventDayOne : "";
        newEvaluator.eventDayTwo = evaluator.eventDayTwo != null ? evaluator.eventDayTwo : "";
        newEvaluator.eventDayThree = evaluator.eventDayThree != null ? evaluator.eventDayThree : "";
        newEvaluator.eventDayFour = evaluator.eventDayFour != null ? evaluator.eventDayFour : "";
        newEvaluator.eventDayFive = evaluator.eventDayFive != null ? evaluator.eventDayFive : "";
    
        newEvaluator.setUpOneTech = evaluator.setUpOneTech;
        newEvaluator.setUpTwoTech = evaluator.setUpTwoTech;
        newEvaluator.setUpThreeTech = evaluator.setUpThreeTech;
        newEvaluator.dryRunTech = evaluator.dryRunTech;
        newEvaluator.eventDayOneTech = evaluator.eventDayOneTech;
        newEvaluator.eventDayTwoTech = evaluator.eventDayTwoTech;
        newEvaluator.eventDayThreeTech = evaluator.eventDayThreeTech;
        newEvaluator.eventDayFourTech = evaluator.eventDayFourTech;
        newEvaluator.eventDayFiveTech = evaluator.eventDayFiveTech;

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