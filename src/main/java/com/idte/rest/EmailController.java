package com.idte.rest;

import java.util.Map;
import java.io.File;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;


import com.idte.rest.data.AttendeeRepository;
import com.idte.rest.data.SupplierRepository;
import com.idte.rest.data.EvaluatorRepository;
import com.idte.rest.data.PresenterRepository;
import com.idte.rest.data.Attendee;
import com.idte.rest.data.Presenter;
import com.idte.rest.data.Supplier;
import com.idte.rest.data.Evaluator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.mail.internet.MimeMessage;
import javax.mail.MessagingException;
import org.springframework.util.Base64Utils;



@RestController
@RequestMapping
public class EmailController {
  @Autowired
  private JavaMailSender javaMailSender;
  @Autowired
  private AttendeeRepository attendees;
  @Autowired
  private SupplierRepository suppliers;
  @Autowired
  private EvaluatorRepository evaluators;
  @Autowired
  private PresenterRepository presenters;
  // this is for the admin page
  @PostMapping(path = "/admin/email", consumes = "application/json", produces = "application/json")
  public void sendEmail(@RequestBody Map<String, String> json) {
    String to = json.get("to");
    String subject = json.get("subject");
    String body = json.get("body");
    String blastOp = json.get("blastOption");

    if(blastOp == null || blastOp == "") {
      new Thread(() -> {sendNormalEmail(to, subject, body);}, "Email-Thread").start();
    }
    else {
      new Thread(() -> {blastNormalEmail(subject, body, blastOp);}, "Blast-Thread").start();
    }
  }

  @Async
  public void sendNormalEmail(String to, String subject, String body) {
    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setTo(to);
    msg.setSubject(subject);
    msg.setText(body);
    javaMailSender.send(msg);
  }

  @Async
  public void blastNormalEmail(String subject, String body, String blastOp) {
    SimpleMailMessage msg = new SimpleMailMessage();

    ArrayList<String> emails = parseBlastOption(blastOp);
    if(emails.size() == 0) {
      System.out.println("Error: there are no emails of the requested blast type");
      return;
    }
    String[] emailArr = GetStringArray(emails);

    msg.setBcc(emailArr);
    msg.setSubject(subject);
    msg.setText(body);
    javaMailSender.send(msg);
  }

  @PostMapping(path = "/admin/emailwattachment", consumes = "application/json", produces = "application/json")
  public Object sendEmailwAttachment(@RequestBody Map<String, String> json){

    String to = json.get("to");
    //check if there is multiple emails?
    String subject = json.get("subject");
    String body = json.get("body");
    String attachment = json.get("file");
    String name = json.get("name");
    String blastOp = json.get("blastOption");
    //grab whether single email or blast email

    if (blastOp == null || blastOp == "" ) {
      new Thread(() -> {sendAttachmentEmail(to, subject, body, attachment, name);}, "Email-Thread").start();
    }
    else {
      new Thread(() -> {blastAttachmentEmail(subject, body, attachment, name, blastOp);}, "Blast-Thread").start();
    }
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @Async
  public void sendAttachmentEmail(String to, String subject, String body, String attachment, String name){
    // remove beginning of attachment
    String[] arrofStrs = attachment.split(",");

    attachment = arrofStrs[1];
    // convert Base64 string to img
    byte[] imgBytes = Base64Utils.decodeFromString(arrofStrs[1]);

    File file = new File(name);

    try {
      OutputStream os = new FileOutputStream(file);
      os.write(imgBytes);
      os.close();
    } catch (Exception e) {
      e.printStackTrace();
    }

    MimeMessage msg = javaMailSender.createMimeMessage();

    try {
      MimeMessageHelper helper = new MimeMessageHelper(msg, true);
      helper.addAttachment(name, file);

      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(body);
      javaMailSender.send(msg);
    }
    catch (MessagingException e){
      System.out.println("FAILED TO SEND EMAIL");
    }
    
    file.delete();
  }

  @Async
  public void blastAttachmentEmail(String subject, String body, String attachment, String name, String blastOp){
    // remove beginning of attachment
    String[] arrofStrs = attachment.split(",");

    attachment = arrofStrs[1];
    // convert Base64 string to img
    byte[] imgBytes = Base64Utils.decodeFromString(arrofStrs[1]);

    File file = new File(name);

    try {
      OutputStream os = new FileOutputStream(file);
      os.write(imgBytes);
      os.close();
    } catch (Exception e) {
      e.printStackTrace();
    }

    ArrayList<String> emails = parseBlastOption(blastOp);
    if(emails.size() == 0) {
      System.out.println("Error: there are no emails of the requested blast type");
      return;
    }
    String[] emailArr = GetStringArray(emails);
    MimeMessage msg = javaMailSender.createMimeMessage();

    try {
      MimeMessageHelper helper = new MimeMessageHelper(msg, true);
      helper.addAttachment(name, file);
  
      helper.setBcc(emailArr);
      helper.setSubject(subject);
      helper.setText(body);
      javaMailSender.send(msg);
    }
    catch (MessagingException e){
      System.out.println("FAILED TO SEND EMAIL");
    }
    
    file.delete();
  }

  public ArrayList<String> parseBlastOption(String option) {
    switch(option) {
      case "allAttendees":
      {
        return grabAllAttendees();
      }
      case "allSuppliers":
      {
        return grabAllSuppliers();
      }
      case "allPresenters":
      {
        return grabAllPresenters();
      }
      case "allEvaluators":
      {
        return grabAllEvaluators();
      }
      default: {
        return null;
      }
    }
  }

  public static String[] GetStringArray(ArrayList<String> arr) 
    { 
        String str[] = new String[arr.size()]; 
        for (int j = 0; j < arr.size(); j++) { 
  
            // Assign each value to String array 
            str[j] = arr.get(j); 
        } 
        return str; 
    } 

  public ArrayList<String> grabAllAttendees() {
    ArrayList<String> allEmails = new ArrayList<>();
    List<Attendee> newattendees = attendees.findAll();
    for(int i = 0; i < newattendees.size(); i++) {
      allEmails.add(newattendees.get(i).getEmail());
    }
    return allEmails;
  }

  public ArrayList<String> grabAllEvaluators() {
    ArrayList<String> allEmails = new ArrayList<>();
    List<Evaluator> evals = evaluators.findAll();
    for(int i = 0; i < evals.size(); i++) {
      allEmails.add(evals.get(i).getEmail());
    }
    return allEmails;
  }

  public ArrayList<String> grabAllSuppliers() {
    ArrayList<String> allEmails = new ArrayList<>();
    List<Supplier> sups = suppliers.findAll();
    for(int i = 0; i < sups.size(); i++) {
      allEmails.add(sups.get(i).getEmail());
    }
    return allEmails;
  }

  public ArrayList<String> grabAllPresenters() {
    ArrayList<String> allEmails = new ArrayList<>();
    List<Presenter> pres = presenters.findAll();
    for(int i = 0; i < pres.size(); i++) {
      allEmails.add(pres.get(i).getEmail());
    }
    return allEmails;
  }
  // reg confirmation
  // @PostMapping(path = "/emailqr", consumes = "application/json", produces = "application/json")
  // public void sendEmailwQRCode(@RequestBody Map<String, String> json) throws MessagingException, WriterException, IOException {
  //   //QR CODE STUFF
  //   Attendee attendee = new Attendee();
        
  //   String firstName = json.get("firstName");
  //   String lastName = json.get("lastName");
  //   String email = json.get("email");
  //   String to = json.get("to");
  //   String subject = json.get("subject");
  //   String body = json.get("body");
  //   attendee.setFirstName(firstName);
  //   attendee.setLastName(lastName);
  //   attendee.setEmail(email);
  //   String qrCodeText;
  //   Example<Attendee> attendeeID = Example.of(attendee);

  //   Attendee event = attendees.findOne(attendeeID).orElse(null);

  //   //make directory
  //   File imgfolder = new File("\\qrimgs");
  //   if (!imgfolder.exists()) {
  //     if(imgfolder.mkdir()) {
  //       System.out.println("Directory is created!");
  //     } else {
  //       System.out.println("Failed to create directory!");
  //     }
  //   }

  //   //Using a conditional statement to make sure there is a matching set for first, last, and email
  //   //If there is, put the ID string into QR Code text
  //   if (event != null && event.getFirstName().equals(firstName) && event.getLastName().equals(lastName) && event.getEmail().equals(email))
  //   {
  //       qrCodeText = event.getId();
  //       String filePath = "\\qrimgs\\" + qrCodeText + ".png";
  //       int size = 125;
  //       File qrFile = new File(filePath);
  //       System.out.println(filePath);
  //       QRCode.createQRImage(qrFile, qrCodeText, size, filePath);
  //   }
  //   else
  //   {
  //       qrCodeText = null;
  //       System.out.println("ERROR: QR Code generation failed");
  //   }

  //   // EMAIL STUFF

  //   File file = new File("\\qrimgs\\" + event.getId() + ".png");
  //   System.out.println(file.getAbsolutePath());
  //   MimeMessage msg = javaMailSender.createMimeMessage();

  //   MimeMessageHelper helper = new MimeMessageHelper(msg, true);
  //   helper.addAttachment("QRCode.png", file);

  //   helper.setTo(to);
  //   helper.setSubject(subject);
  //   helper.setText(body);
  //   javaMailSender.send(msg);
  
  //   System.out.println("Sent?");
  // }
}