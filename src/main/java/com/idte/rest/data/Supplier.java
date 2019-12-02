package com.idte.rest.data;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Supplier extends Attendee {
    @NotNull
    protected String technologyNumber;
    @NotNull
    protected String company;

    public void setTechnologyNumber(String technologyNumber) {
        this.technologyNumber = technologyNumber;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getTechnologyNumber() {
        return technologyNumber;
    }

    public String getCompany() {
        return company;
    }

    @Override
    public String toString() {
        return "Supplier{email='" + this.email + "' firstName='" + this.firstName + 
            "' lastName='" + this.lastName + "' nickname='" + this.nickname + 
            "' phoneNumber='" + this.phoneNumber + "' cellNumber='" + this.cellNumber + 
            "' country='" + this.country + "' city='" + this.city + "' technologyNumber='" + 
            this.technologyNumber + "' company='" + this.company + "'}";
    }
}