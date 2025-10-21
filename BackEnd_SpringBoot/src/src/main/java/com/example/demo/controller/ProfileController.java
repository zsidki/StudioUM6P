package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.UserProfileDto;
import com.example.demo.entities.User;
import com.example.demo.service.UserService;

import java.io.IOException; 

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

    // Endpoint to update user profile details
    @PostMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestBody UserProfileDto userProfileDto) {
        User updatedUser = userService.updateUserProfile(userProfileDto);

        if (updatedUser != null) {
            return ResponseEntity.ok("Profile updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update profile.");
        }
    }


    // Endpoint to handle profile image upload
    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadProfileImage(
        @RequestParam("file") MultipartFile file,
        @RequestParam("userId") Long userId) {
        try {
            String filePath = userService.saveProfileImage(file, userId); // Call the correct service method
            return ResponseEntity.ok(filePath);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image due to server error.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
