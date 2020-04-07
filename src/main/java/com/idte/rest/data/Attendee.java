package com.idte.rest.data;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
public class Attendee {
    @Id
    protected String id;
    @Email
    protected String email;
    @NotNull
    protected String firstName;
    @NotNull
    protected String lastName;
    protected String nickname;
    @NotNull
    protected String phoneNumber;
    protected String cellNumber;
    @NotNull
    protected String country;
    @NotNull
    protected String city;
    protected String dateCreated;
    protected String lastModified;
    protected String modifiedBy;
    protected String comments;

    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String setUpOne = "";
    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String setUpTwo = "";
    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String setUpThree = "";
    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String dryRun = "";
    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String eventDayOne = "";
    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String eventDayTwo = "";
    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String eventDayThree = "";
    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String eventDayFour = "";
    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    protected String eventDayFive = "";

    protected int setUpOneTech = 0;
    protected int setUpTwoTech = 0;
    protected int setUpThreeTech = 0;
    protected int dryRunTech = 0;
    protected int eventDayOneTech = 0;
    protected int eventDayTwoTech = 0;
    protected int eventDayThreeTech = 0;
    protected int eventDayFourTech = 0;
    protected int eventDayFiveTech = 0;

    protected boolean setUpOneAttended = false;
    protected boolean setUpTwoAttended = false;
    protected boolean setUpThreeAttended = false;
    protected boolean dryRunAttended = false;
    protected boolean eventDayOneAttended = false;
    protected boolean eventDayTwoAttended = false;
    protected boolean eventDayThreeAttended = false;
    protected boolean eventDayFourAttended = false;
    protected boolean eventDayFiveAttended = false;

    public void createId() throws UnsupportedEncodingException, NoSuchAlgorithmException {
        try {
            byte[] bytes = email.getBytes("UTF-8");
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] hashedEmail = md5.digest(bytes);
            id = UUID.nameUUIDFromBytes(hashedEmail).toString();
        }
        catch (Exception e) {
            throw e;
        }
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setCellNumber(String cellNumber) {
        this.cellNumber = cellNumber;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setLastModified(String lastModified) {
        this.lastModified = lastModified;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public void setSetUpOne(String setUpOne) {
        this.setUpOne = setUpOne;
    }

    public void setSetUpTwo(String setUpTwo) {
        this.setUpTwo = setUpTwo;
    }

    public void setSetUpThree(String setUpThree) {
        this.setUpThree = setUpThree;
    }

    public void setDryRun(String dryRun) {
        this.dryRun = dryRun;
    }

    public void setEventDayOne(String eventDayOne) {
        this.eventDayOne = eventDayOne;
    }

    public void setEventDayTwo(String eventDayTwo) {
        this.eventDayTwo = eventDayTwo;
    }

    public void setEventDayThree(String eventDayThree) {
        this.eventDayThree = eventDayThree;
    }

    public void setEventDayFour(String eventDayFour) {
        this.eventDayFour = eventDayFour;
    }

    public void setEventDayFive(String eventDayFive) {
        this.eventDayFive = eventDayFive;
    }

    public void setSetUpOneTech(int setUpOne) {
        this.setUpOneTech = setUpOne;
    }

    public void setSetUpTwoTech(int setUpTwo) {
        this.setUpTwoTech = setUpTwo;
    }

    public void setSetUpThreeTech(int setUpThree) {
        this.setUpThreeTech = setUpThree;
    }

    public void setDryRunTech(int dryRun) {
        this.dryRunTech = dryRun;
    }

    public void setEventDayOneTech(int eventDayOne) {
        this.eventDayOneTech = eventDayOne;
    }

    public void setEventDayTwoTech(int eventDayTwo) {
        this.eventDayTwoTech = eventDayTwo;
    }

    public void setEventDayThreeTech(int eventDayThree) {
        this.eventDayThreeTech = eventDayThree;
    }

    public void setEventDayFourTech(int eventDayFour) {
        this.eventDayFourTech = eventDayFour;
    }

    public void setEventDayFiveTech(int eventDayFive) {
        this.eventDayFiveTech = eventDayFive;
    }

    public void setSetUpOneAttended(boolean setUpOne) {
        this.setUpOneAttended = setUpOne;
    }

    public void setSetUpTwoAttended(boolean setUpTwo) {
        this.setUpTwoAttended = setUpTwo;
    }

    public void setSetUpThreeAttended(boolean setUpThree) {
        this.setUpThreeAttended = setUpThree;
    }

    public void setDryRunAttended(boolean dryRun) {
        this.dryRunAttended = dryRun;
    }

    public void setEventDayOneAttended(boolean eventDayOne) {
        this.eventDayOneAttended = eventDayOne;
    }

    public void setEventDayTwoAttended(boolean eventDayTwo) {
        this.eventDayTwoAttended = eventDayTwo;
    }

    public void setEventDayThreeAttended(boolean eventDayThree) {
        this.eventDayThreeAttended = eventDayThree;
    }

    public void setEventDayFourAttended(boolean eventDayFour) {
        this.eventDayFourAttended = eventDayFour;
    }

    public void setEventDayFiveAttended(boolean eventDayFive) {
        this.eventDayFiveAttended = eventDayFive;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getCellNumber() {
        return cellNumber;
    }

    public String getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public String getLastModified() {
        return lastModified;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public String getComments() {
        return comments;
    }

    public String getSetUpOne() {
        return setUpOne;
    }

    public String getSetUpTwo() {
        return setUpTwo;
    }

    public String getSetUpThree() {
        return setUpThree;
    }

    public String getDryRun() {
        return dryRun;
    }

    public String getEventDayOne() {
        return eventDayOne;
    }

    public String getEventDayTwo() {
        return eventDayTwo;
    }

    public String getEventDayThree() {
        return eventDayThree;
    }

    public String getEventDayFour() {
        return eventDayFour;
    }

    public String getEventDayFive() {
        return eventDayFive;
    }

    public int getSetUpOneTech() {
        return setUpOneTech;
    }

    public int getSetUpTwoTech() {
        return setUpTwoTech;
    }

    public int getSetUpThreeTech() {
        return setUpThreeTech;
    }

    public int getDryRunTech() {
        return dryRunTech;
    }

    public int getEventDayOneTech() {
        return eventDayOneTech;
    }

    public int getEventDayTwoTech() {
        return eventDayTwoTech;
    }

    public int getEventDayThreeTech() {
        return eventDayThreeTech;
    }

    public int getEventDayFourTech() {
        return eventDayFourTech;
    }

    public int getEventDayFiveTech() {
        return eventDayFiveTech;
    }

    public boolean getSetUpOneAttended() {
        return setUpOneAttended;
    }

    public boolean getSetUpTwoAttended() {
        return setUpTwoAttended;
    }

    public boolean getSetUpThreeAttended() {
        return setUpThreeAttended;
    }

    public boolean getDryRunAttended() {
        return dryRunAttended;
    }

    public boolean getEventDayOneAttended() {
        return eventDayOneAttended;
    }

    public boolean getEventDayTwoAttended() {
        return eventDayTwoAttended;
    }

    public boolean getEventDayThreeAttended() {
        return eventDayThreeAttended;
    }

    public boolean getEventDayFourAttended() {
        return eventDayFourAttended;
    }

    public boolean getEventDayFiveAttended() {
        return eventDayFiveAttended;
    }
}