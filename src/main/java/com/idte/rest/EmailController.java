package com.idte.rest;

import java.util.Map;
import java.io.File;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.io.IOException;


import com.google.zxing.WriterException;
import com.idte.rest.data.Attendee;
import com.idte.rest.data.AttendeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Example;
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
  // this is for the admin page
  @PostMapping(path = "/admin/email", consumes = "application/json", produces = "application/json")
  public void sendEmail(@RequestBody Map<String, String> json) {
    String to = json.get("to");
    String subject = json.get("subject");
    String body = json.get("body");
    new Thread(() -> {sendNormalEmail(to, subject, body);}, "Email-Thread").start();
  }

  @Async
  public void sendNormalEmail(String to, String subject, String body) {
    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setTo(to);
    msg.setSubject(subject);
    msg.setText(body);
    javaMailSender.send(msg);
  }

  // // tech submission confirmation, not really a diff from above...
  // @PostMapping(path = "/techconfirm", consumes = "application/json", produces = "application/json")
  // public void sendTechConfirm(@RequestBody Map<String, String> json) {
  //   SimpleMailMessage msg = new SimpleMailMessage();

  //   String to = json.get("to");
  //   String subject = json.get("subject");
  //   String body = json.get("body");
  //   msg.setTo(to);
  //   msg.setSubject(subject);
  //   msg.setText(body);
  //   javaMailSender.send(msg);
  // }

  @PostMapping(path = "/admin/emailwattachment", consumes = "application/json", produces = "application/json")
  public Object sendEmailwAttachment(@RequestBody Map<String, String> json){

    String to = json.get("to");
    String subject = json.get("subject");
    String body = json.get("body");
    String attachment = json.get("file");
    String name = json.get("name");
    System.out.println(name);

    new Thread(() -> {sendAttachmentEmail(to, subject, body, attachment, name);}, "Email-Thread").start();
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
    // STORE FILES BY UUID
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