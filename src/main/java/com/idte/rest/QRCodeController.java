package com.idte.rest;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.lang.model.util.Elements;

import com.google.zxing.WriterException;
import com.idte.rest.data.Attendee;
import com.idte.rest.data.AttendeeRepository;

import org.hibernate.boot.model.relational.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class QRCodeController {
    // Reference the Attendee class
    @Autowired
    private AttendeeRepository attendees;

    @PostMapping(path = "/MakeQRCode", consumes = "application/json", produces = "application/json")

    public void createQRCOde(@RequestBody Map<String, String> json) throws WriterException, IOException {
        Attendee attendee = new Attendee();
        
        String firstName = json.get("first name");
        String lastName = json.get("last name");
        String email = json.get("email");
        String qrCodeText;

        Example<Attendee> attendeeID = Example.of(attendee);

        Attendee event = attendees.findOne(attendeeID).orElse(null);

        //Using a conditional statement to make sure there is a matching set for first, last, and email
        //If there is, put the ID string into QR Code text
        if (firstName == event.getFirstName() && lastName == event.getLastName() && email == event.getEmail())
        {
            qrCodeText = event.getId();
        }
        else
        {
            qrCodeText = null;
        }

        String filePath = "QRCode.png";
        int size = 125;
        File qrFile = new File(filePath);

        QRCode.createQRImage(qrFile, qrCodeText, size, filePath);
    }
}
