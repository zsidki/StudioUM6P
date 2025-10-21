package com.example.demo.impl;

import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, String subject, String body) {
        if (to != null && !to.trim().isEmpty()) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(to);
                message.setSubject(subject);
                message.setText(body);

                // Log email sending details
                System.out.println("Sending email to: " + to);
                System.out.println("Subject: " + subject);
                System.out.println("Body: " + body);

                // Send the email
                mailSender.send(message);
                System.out.println("Email sent successfully");
            } catch (Exception e) {
                // Log the exception with stack trace
                e.printStackTrace();
                System.err.println("Failed to send email to " + to + ": " + e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("Invalid recipient email");
        }
    }

}
