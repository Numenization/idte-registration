package com.idte.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@RestController
@RequestMapping
public class EmailController {
    @Autowired
    private JavaMailSender javaMailSender;
    

    @PostMapping(path = "/email", consumes = "application/json", produces = "application/json")
    public void sendEmail(@RequestBody Map<String, String> json) {
        SimpleMailMessage msg = new SimpleMailMessage();

        String to = json.get("to");
        String subject = json.get("subject");
        String body = json.get("body");
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(body);
        javaMailSender.send(msg);
    }
}