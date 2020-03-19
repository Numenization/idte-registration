package com.idte.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.internet.MimeMessage;
import javax.mail.MessagingException;
import org.springframework.util.Base64Utils;
import java.io.File;
import java.io.IOException;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.ByteArrayInputStream;

@RestController
@RequestMapping
public class EmailController {
    @Autowired
    private JavaMailSender javaMailSender;
        // TODO: PROTECT ADMIN ROUTES

    @PostMapping(path = "/email", consumes = "application/json", produces = "application/json")
    public void sendEmail(@RequestBody Map<String, String> json) {
        SimpleMailMessage msg = new SimpleMailMessage();

        String to = json.get("to");
        String subject = json.get("subject");
        String body = json.get("body");
        String attachment = json.get("attachment");
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(body);
        javaMailSender.send(msg);
    }

    @PostMapping(path = "/emailwattachment", consumes = "application/json", produces = "application/json")
    public void sendEmailwAttachment (@RequestBody Map<String, String> json) throws MessagingException {

        String to = json.get("to");
        String subject = json.get("subject");
        String body = json.get("body");
        String attachment = json.get("file");

        File imgOutFile = null;
        
        //remove beginning of attachment
        String[] arrofStrs = attachment.split(",");
        for(String a : arrofStrs)
            System.out.println(a);

        attachment = arrofStrs[1];
        System.out.println("String 1:");
        System.out.println(attachment);
        //convert Base64 string to img
        byte[] imgBytes = Base64Utils.decodeFromString(arrofStrs[1]);
        try {
        BufferedImage bufImg = ImageIO.read(new ByteArrayInputStream(imgBytes));
        imgOutFile = new File("android.png");
        ImageIO.write(bufImg, "png", imgOutFile);
        }
        catch (IOException e) {
            System.out.println("Failed to read image");
        }
        
        MimeMessage msg = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.addAttachment("Attachment", imgOutFile);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body);
        javaMailSender.send(msg);
    }
}