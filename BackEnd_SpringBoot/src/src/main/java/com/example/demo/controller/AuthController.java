package com.example.demo.controller;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	 @Autowired
	 private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    // Register a new user and send OTP for email verification
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Step 1: Register the user in a temporary state
            User newUser = userService.registerUser(
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getDepartment(),
                user.getPhone(),
                user.getRole()
            );

            // Step 2: Send OTP (use the OTP stored in the user object)
            String otp = newUser.getOtp();  // Fetch the OTP from the user entity
            emailService.sendEmail(
            	    newUser.getEmail(),
            	    "Verify your account",
            	    "<p>Hi,</p>" +
            	    "<p>Thank you for registering with us! To complete the process and successfully create your account, please verify your email address.</p>" +
            	    "<p>To do so, use the following OTP (One-Time Password): <b>" + otp + "</b></p>" +
            	    "<p>This OTP is a unique code that will help us confirm your identity. Please write it down and enter it in the verification page to finalize your account creation.</p>" +
            	    "<p>If you did not request this, please ignore this email.</p>" +
            	    "<p><b>Best regards,</b></p>" +
            	    "<p><b>UM6P Studio team</b></p>"
            	);

            


            // Return response indicating OTP has been sent
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully. OTP has been sent to " + newUser.getEmail());
            response.put("userId", newUser.getId().toString());
            response.put("email", newUser.getEmail());
            response.put("role", user.getRole()); // Add role to the response

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred during signup: " + e.getMessage());
        }
    }

    // Verify OTP for email confirmation
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        try {
            // Validate OTP and activate user
            userService.activateUser(email, otp);
            return ResponseEntity.ok("OTP verified successfully. User account activated.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // User sign-in (authentication)
    @PostMapping("/signin")
    public ResponseEntity<?> signInUser(@RequestBody User signInRequest) {
        try {
            User user = userService.authenticateUser(signInRequest.getEmail(), signInRequest.getPassword());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User signed in successfully");
            response.put("userId", user.getId().toString());
            response.put("email", user.getEmail());
            response.put("username", user.getUsername());
            response.put("department", user.getDepartment());
            response.put("phone", user.getPhone());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
