package com.idte.rest.data;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Supplier extends Attendee {
    @NotNull
    protected String company;


    public void setCompany(String company) {
        this.company = company;
    }


    public String getCompany() {
        return company;
    }

    public static Supplier from(Supplier supplier) {
        Supplier newSupplier = new Supplier();

        newSupplier.email = supplier.email;
        newSupplier.firstName = supplier.firstName;
        newSupplier.lastName = supplier.lastName;
        newSupplier.nickname = supplier.nickname;
        newSupplier.phoneNumber = supplier.phoneNumber;
        newSupplier.cellNumber = supplier.cellNumber;
        newSupplier.country = supplier.country;
        newSupplier.city = supplier.city;
        newSupplier.company = supplier.company;
        newSupplier.comments = supplier.comments;

        newSupplier.setUpOne = supplier.setUpOne != null ? supplier.setUpOne : "";
        newSupplier.setUpTwo = supplier.setUpTwo != null ? supplier.setUpTwo : "";
        newSupplier.setUpThree = supplier.setUpThree != null ? supplier.setUpThree : "";
        newSupplier.dryRun = supplier.dryRun != null ? supplier.dryRun : "";
        newSupplier.eventDayOne = supplier.eventDayOne != null ? supplier.eventDayOne : "";
        newSupplier.eventDayTwo = supplier.eventDayTwo != null ? supplier.eventDayTwo : "";
        newSupplier.eventDayThree = supplier.eventDayThree != null ? supplier.eventDayThree : "";
        newSupplier.eventDayFour = supplier.eventDayFour != null ? supplier.eventDayFour : "";
        newSupplier.eventDayFive = supplier.eventDayFive != null ? supplier.eventDayFive : "";

        newSupplier.setUpOneTech = supplier.setUpOneTech;
        newSupplier.setUpTwoTech = supplier.setUpTwoTech;
        newSupplier.setUpThreeTech = supplier.setUpThreeTech;
        newSupplier.dryRunTech = supplier.dryRunTech;
        newSupplier.eventDayOneTech = supplier.eventDayOneTech;
        newSupplier.eventDayTwoTech = supplier.eventDayTwoTech;
        newSupplier.eventDayThreeTech = supplier.eventDayThreeTech;
        newSupplier.eventDayFourTech = supplier.eventDayFourTech;
        newSupplier.eventDayFiveTech = supplier.eventDayFiveTech;

        return newSupplier;
    }

    @Override
    public String toString() {
        return "Supplier{email='" + this.email + "' firstName='" + this.firstName + 
            "' lastName='" + this.lastName + "' nickname='" + this.nickname + 
            "' phoneNumber='" + this.phoneNumber + "' cellNumber='" + this.cellNumber + 
            "' country='" + this.country + "' city='" + this.city + 
            "' company='" + this.company + "'}";
    }
}