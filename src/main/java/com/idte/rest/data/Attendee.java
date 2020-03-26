package com.idte.rest.data;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

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
    protected String dateString;
    protected String dateCreated;
    protected String lastModified;
    protected String modifiedBy;
    protected String comments;

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

    public void setDateString(String dateString) {
        this.dateString = dateString;
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

    public String getDateString() {
        return dateString;
    }
}