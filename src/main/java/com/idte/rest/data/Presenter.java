package com.idte.rest.data;

import javax.persistence.Entity;

@Entity
public class Presenter extends Attendee {
  public static Presenter from(Presenter presenter) {
    Presenter newPresenter = new Presenter();

    newPresenter.email = presenter.email;
    newPresenter.firstName = presenter.firstName;
    newPresenter.lastName = presenter.lastName;
    newPresenter.nickname = presenter.nickname;
    newPresenter.phoneNumber = presenter.phoneNumber;
    newPresenter.cellNumber = presenter.cellNumber;
    newPresenter.country = presenter.country;
    newPresenter.city = presenter.city;
    newPresenter.comments = presenter.comments;

    newPresenter.setUpOne = presenter.setUpOne != null ? presenter.setUpOne : "";
    newPresenter.setUpTwo = presenter.setUpTwo != null ? presenter.setUpTwo : "";
    newPresenter.setUpThree = presenter.setUpThree != null ? presenter.setUpThree : "";
    newPresenter.dryRun = presenter.dryRun != null ? presenter.dryRun : "";
    newPresenter.eventDayOne = presenter.eventDayOne != null ? presenter.eventDayOne : "";
    newPresenter.eventDayTwo = presenter.eventDayTwo != null ? presenter.eventDayTwo : "";
    newPresenter.eventDayThree = presenter.eventDayThree != null ? presenter.eventDayThree : "";
    newPresenter.eventDayFour = presenter.eventDayFour != null ? presenter.eventDayFour : "";
    newPresenter.eventDayFive = presenter.eventDayFive != null ? presenter.eventDayFive : "";

    newPresenter.setUpOneTech = presenter.setUpOneTech;
    newPresenter.setUpTwoTech = presenter.setUpTwoTech;
    newPresenter.setUpThreeTech = presenter.setUpThreeTech;
    newPresenter.dryRunTech = presenter.dryRunTech;
    newPresenter.eventDayOneTech = presenter.eventDayOneTech;
    newPresenter.eventDayTwoTech = presenter.eventDayTwoTech;
    newPresenter.eventDayThreeTech = presenter.eventDayThreeTech;
    newPresenter.eventDayFourTech = presenter.eventDayFourTech;
    newPresenter.eventDayFiveTech = presenter.eventDayFiveTech;

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