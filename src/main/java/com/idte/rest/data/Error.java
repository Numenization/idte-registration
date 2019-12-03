package com.idte.rest.data;

import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Error {
    private String message;
    private String timeStamp;

    public Error(String message) {
        setTime();
        this.message = message + " [" + this.timeStamp + "]";
    }

    public Error() {
        setTime();
        this.message = "Error! [" + this.timeStamp + "]";
    }

    public void setMessage(String message) {
        setTime();
        this.message = message + " [" + this.timeStamp + "]";
    }

    public String getMessage() {
        return message;
    }

    private void setTime() {
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
        Date date = new Date();
        String currentDateTime = dateFormat.format(date);
        this.timeStamp = currentDateTime;
    }
}