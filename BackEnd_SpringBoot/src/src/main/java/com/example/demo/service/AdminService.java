package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    // Get all users with role "ADMIN"
    public List<User> getAllAdmins() {
        return userRepository.findByRole("ADMIN");
    }

    // Promote a user to admin
    public void promoteUserToAdmin(Long userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        user.setRole("ADMIN");
        userRepository.save(user);
    }

    // Demote an admin back to regular user
    public void demoteAdminToUser(Long adminId) throws Exception {
        User admin = userRepository.findById(adminId).orElseThrow(() -> new Exception("Admin not found"));
        admin.setRole("USER");
        userRepository.save(admin);
    }

    // Delete an admin
    public void deleteAdmin(Long adminId) throws Exception {
        User admin = userRepository.findById(adminId).orElseThrow(() -> new Exception("Admin not found"));
        userRepository.delete(admin);
    }
}
