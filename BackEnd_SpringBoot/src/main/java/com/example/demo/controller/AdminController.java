package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.User;
import com.example.demo.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Get all admins
    @GetMapping
    public ResponseEntity<List<User>> getAllAdmins() {
        List<User> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    // Promote a user to admin
    @PatchMapping("/promote/{userId}")
    public ResponseEntity<String> promoteToAdmin(@PathVariable Long userId) {
        try {
            adminService.promoteUserToAdmin(userId);
            return ResponseEntity.ok("User promoted to admin successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error promoting user to admin.");
        }
    }

    // Demote an admin to regular user
    @PatchMapping("/demote/{adminId}")
    public ResponseEntity<String> demoteToUser(@PathVariable Long adminId) {
        try {
            adminService.demoteAdminToUser(adminId);
            return ResponseEntity.ok("Admin demoted to regular user successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error demoting admin.");
        }
    }

    // Delete an admin
    @DeleteMapping("/{adminId}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long adminId) {
        try {
            adminService.deleteAdmin(adminId);
            return ResponseEntity.ok("Admin deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting admin.");
        }
    }
}
