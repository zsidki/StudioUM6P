package com.example.demo.impl;

import com.example.demo.service.EmailService;

import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.FileSystems;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Override
    public void sendEmail(String to, String subject, String body) {
        if (to != null && !to.trim().isEmpty()) {
            try {
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                helper.setFrom(senderEmail);
                helper.setTo(to);
                helper.setSubject(subject);

                // HTML content with placeholders for inline images
                String htmlContent = "<html>" +
                        "<body>" +
                        "<img src='cid:headerImage' style='width:100%; max-height:280px;' />" +  // Header GIF
                        "<p>" + body + "</p>" +
                        "<div style='margin-top:20px;'>" +
                        "  <div style='background-color:#D4451E; height:10px;'></div>" +  // Small red rectangle
                        "  <div style='display:flex; align-items:center; background-color:#f0f0f0; padding:15px;'>" +
                        "    <img src='cid:logoImage' alt='UM6P Logo' style='height:40px;width:150px; margin-right:15px;' />" +  // Embedded logo
                        "    <div style='color:#333333; font-size:12px;'>" +
                        "      <p>Copyright © 2024 UM6P - All rights reserved.</p>" +
                        "      <p>University Mohammed VI Polytechnic, Hay Moulay Rachid</p>" +
                        "      <p>Lot 660, 43150 Benguerir – Morocco, <a href='http://www.um6p.ma'>www.um6p.ma</a></p>" +
                        "    </div>" +
                        "  </div>" +
                        "</div>" +
                        "</body>" +
                        "</html>";

                helper.setText(htmlContent, true);

                // Correct resource loading
                Resource headerImage = new ClassPathResource("static/images/header.gif");
                Resource logoImage = new ClassPathResource("static/images/logo.png");

                // Attach inline images
                helper.addInline("headerImage", headerImage);
                helper.addInline("logoImage", logoImage);

                mailSender.send(mimeMessage);
                System.out.println("Email sent successfully with header and footer images.");

            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Failed to send email: " + e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("Invalid recipient email");
        }
    }
}
