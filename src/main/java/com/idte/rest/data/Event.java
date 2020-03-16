package com.idte.rest.data;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import java.util.Calendar;
import java.time.*;

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
    
   // protected List<String> eventDates = new ArrayList<String>();
   
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
  public void setRegStatus(boolean status){
    registrationStatus = status;
  }
  public void setTechStatus(boolean status){
    technologyStatus = status;
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
  

    // Set functions take in strings for now- previous code still commented out when parameters were of type Date. 
    // Need to work out why parse function gives error, after functions will return to using variables of type Date, and not String.
    public void setRegistrationDates(String firstDay, String lastDay){
      /*
      DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");  
      String strDate = dateFormat.format(firstDay);
      String lastDate = dateFormat.format(lastDay);  
        registrationStartDate = strDate;
        registrationEndDate = lastDate;


        //-----Getting list of days WIP
        /*
        Calendar c = Calendar.getInstance();
        
        try{
          SimpleDateFormat.getInstance();
          c.setTime(SimpleDateFormat.parse(strDate));
        }
        catch(Exception e){
            e.printStackTrace();
        }
       
        while (!strDate.equals(lastDate) {  
          strDate = dateFormat.format(c.getTime());
          eventDates.add(strDate);
          c.add(Calendar.DATE, 1);  // number of days to add 
         }
          */

         registrationStartDate = firstDay;
         registrationEndDate = lastDay;

    }
    public void setTechnologyDates(String firstDay, String lastDay){
      /*
     DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");  
     String strDate = dateFormat.format(firstDay);
     String lastDate = dateFormat.format(lastDay);  
        technologyStartDate = strDate;
        technologyEndDate = lastDate;
        */

        technologyStartDate = firstDay;
        technologyEndDate =  lastDay;
    }
/*
    public Date stringToDates(String Day){

      SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyyy");
      Date date = formatter.parse(date);
      return (date);

      }
*/


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