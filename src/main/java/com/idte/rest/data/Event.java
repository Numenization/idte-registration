package com.idte.rest.data;
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Events")
public class Event{
    // Tecnology and registration are off by default
  
    

    @Id
    protected String eventID;
    protected String registrationStartDate;
    protected String registrationEndDate;
    protected String technologyStartDate;
    protected String technologyEndDate;
    protected boolean registrationStatus;
    protected boolean technologyStatus;
    protected boolean currentEvent = true;
    protected String lastModified;
    protected String lastModifiedBy;
    protected String setUpOne;
    protected String setUpTwo;
    protected String setUpThree;
    protected String dryRun;
    protected String eventDayOne;
    protected String eventDayTwo;
    protected String eventDayThree;
    protected String eventDayFour;
    protected String eventDayFive;
    
    public void setSetUpOne(String day){
      setUpOne = day;
    }
    public void setSetUpTwo(String day){
      setUpTwo = day;
    }
    public void setSetUpThree(String day){
      setUpThree = day;
    }
    public void setDryRun(String day){
      dryRun = day;
    }
    public void setEventDayOne(String day){
      eventDayOne = day;
    }
    public void setEventDayTwo(String day){
      eventDayTwo = day;
    }
    public void setEventDayThree(String day){
      eventDayThree = day;
    }
    public void setEventDayFour(String day){
      eventDayFour = day;
    }
    public void setEventDayFive(String day){
      eventDayFive = day;
    }

    public String getSetUpOne(){
      return setUpOne;
    }
    public String getSetUpTwo(){
      return setUpTwo;
    }
    public String getSetUpThree(){
      return setUpThree;
    }
    public String getDryRun(){
      return dryRun;
    }
    public String getEventDayOne(){
      return eventDayOne;
    }
    public String getEventDayTwo(){
      return eventDayTwo;
    }
    public String getEventDayThree(){
      return eventDayThree;
    }
    public String getEventDayFour(){
      return eventDayFour;
    }
    public String getEventDayFive(){
      return eventDayFive;
    }

    public String getEventID(){
      return eventID;
    }
    public String getRegistrationStart(){
      return registrationStartDate;
    }
    public String getRegistrationEnd(){
      return registrationEndDate;
    }
    public String getTechnologyStart(){
      return technologyStartDate;
    }
    public String getTechnologyEnd(){
      return technologyEndDate;
    }
    public boolean getRegistrationStatus() {
      return registrationStatus;
 }
   public boolean getTechnologyStatus(){
     return technologyStatus;
  }
  public boolean getCurrentEvent(){
    return currentEvent;
  }
 
  public String getLastModifiedBy(){
    return lastModifiedBy;
  }
  public String getLastModified(){
    return lastModified;
  }
  public void setRegStatus(boolean status){
    registrationStatus = status;
  }
  public void setTechStatus(boolean status){
    technologyStatus = status;
  }
  public void setLastModifiedBy(String who){
    lastModifiedBy = who;
  }
  public void setLastModified(String when){
    lastModified = when;
  }
  public void changeEventStatus(){
    currentEvent = !currentEvent;
  }
  public void changeRegStatus(){
    registrationStatus = !registrationStatus;
  }
  public void changeTechStatus(){
    technologyStatus = !technologyStatus;
  }
  public String formatConverter(String dtc){
    SimpleDateFormat original = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat newSDF = new SimpleDateFormat("MM-dd-yyyy");

    try{
      String newDate = newSDF.format(original.parse(dtc));
      return newDate;
    }
    catch (ParseException e) {
      e.printStackTrace();
      return "null";
    }
    
  }
  public Date convert(String date){
    SimpleDateFormat original = new SimpleDateFormat("yyyy-MM-dd");

    try{
      Date newDate;
      newDate = (Date) original.parse(date);
    
      return newDate;
    }
    catch (ParseException e) {
      e.printStackTrace();
      return null;
    }

  }
  public void setRegistrationDates(String firstDay, String lastDay){
    SimpleDateFormat original = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat newSDF = new SimpleDateFormat("MM-dd-yyyy");
      try {
        if (firstDay != null && firstDay != ""){
          String newStart = newSDF.format(original.parse(firstDay));
          registrationStartDate = newStart;
        }
        if (lastDay != null && lastDay != ""){
          String newEnd = newSDF.format(original.parse(lastDay));
          registrationEndDate = newEnd;
        }
         
      } catch (ParseException e) {
        e.printStackTrace();
      }
  }
  public void setTechnologyDates(String firstDay, String lastDay){
      SimpleDateFormat original = new SimpleDateFormat("yyyy-MM-dd");
      SimpleDateFormat newSDF = new SimpleDateFormat("MM-dd-yyyy");
      try {
        if (firstDay != null && firstDay != ""){
          String newStart = newSDF.format(original.parse(firstDay));
          technologyStartDate = newStart;
        }
        if (lastDay != null && lastDay != ""){
          String newEnd = newSDF.format(original.parse(lastDay));
          technologyEndDate = newEnd;
        }
      } catch (ParseException e) {
          e.printStackTrace();
      }
  }
  public void setEventID(String generatedID){
    eventID = generatedID;
  }
  public void setCurrentEvent(String choice){
    if (choice.equals("true"))
      currentEvent = true;
    else{
      currentEvent = false;
    }
    
  }
    public String GenerateKey(){
      
      String generatedKey;
      String nums = "0123456789";
      String upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      String lowerLetters = "abcdefghijklmnopqrstuvwxyz";
      String symbols = "!@#$%^&*()_+-=";
  
      Random rand = new Random();
   
        generatedKey = "";
      for(int i = 0; i < 20;i++){
        int randNum = rand.nextInt(4);
  
        if (randNum == 0){
          randNum = rand.nextInt(10);
            generatedKey = generatedKey + nums.charAt(randNum);
        }
        
        if (randNum == 1 ){
          randNum = rand.nextInt(26);
            generatedKey = generatedKey + upperLetters.charAt(randNum);
       }
        
        if (randNum == 2){
          randNum = rand.nextInt(26);
            generatedKey = generatedKey + lowerLetters.charAt(randNum);
        }
       
        else if (randNum == 3){
          randNum = rand.nextInt(14);
            generatedKey = generatedKey + symbols.charAt(randNum);
        }
        
      }
       return generatedKey;
  }
}