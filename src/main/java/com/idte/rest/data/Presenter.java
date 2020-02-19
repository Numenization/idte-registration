package com.idte.rest.data;

import javax.persistence.Entity;

@Entity
public class Presenter extends Attendee {
  public static Presenter from(Presenter evaluator) {
    Presenter newPresenter = new Presenter();

    newPresenter.email = evaluator.email;
    newPresenter.firstName = evaluator.firstName;
    newPresenter.lastName = evaluator.lastName;
    newPresenter.nickname = evaluator.nickname;
    newPresenter.phoneNumber = evaluator.phoneNumber;
    newPresenter.cellNumber = evaluator.cellNumber;
    newPresenter.country = evaluator.country;
    newPresenter.city = evaluator.city;
    newPresenter.comments = evaluator.comments;

    return newPresenter;
}

@Override
public String toString() {
    return "Presenter{email='" + this.email + "' firstName='" + this.firstName + 
        "' lastName='" + this.lastName + "' nickname='" + this.nickname + 
        "' phoneNumber='" + this.phoneNumber + "' cellNumber='" + this.cellNumber + 
        "' country='" + this.country + "' city='" + this.city + "'}";
}
 }