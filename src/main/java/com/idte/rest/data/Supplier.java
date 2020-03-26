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