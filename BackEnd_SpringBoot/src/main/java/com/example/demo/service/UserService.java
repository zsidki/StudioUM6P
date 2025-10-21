package com.example.demo.service;

import com.example.demo.dto.UserProfileDto;
import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Inject the upload directory from application.properties
    @Value("${file.upload-dir}")
    private String uploadDir;

    // Register a new user
    public User registerUser(String username, String email, String password, String department, String phone,String role) {
        if (!isValidEmail(email)) {
            throw new RuntimeException("Invalid email domain. Only @um6p.ma or @esi.ac.ma are allowed.");
        }

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered.");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email.toLowerCase());
        user.setPassword(password);  // Store the plain-text password
        user.setDepartment(department);
        user.setPhone(phone);
        user.setActive(false);
        user.setRole("user"); // Par défaut, l'utilisateur est un 'user'

        String otp = generateOTP();
        user.setOtp(otp);

        // Save the user to the database
        User savedUser = userRepository.save(user);

        System.out.println("Generated OTP: " + otp);

        return savedUser;
    }

    // Update the user profile
    public User updateUserProfile(UserProfileDto userProfileDto) {
        Optional<User> userOptional = userRepository.findById(userProfileDto.getUserId());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Validate email domain
            if (!isValidEmail(userProfileDto.getEmail())) {
                throw new RuntimeException("Invalid email domain.");
            }

            // Update user fields
            user.setUsername(userProfileDto.getUsername());
            user.setEmail(userProfileDto.getEmail());
            user.setPhone(userProfileDto.getPhone());
            user.setDepartment(userProfileDto.getDepartment());

            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found.");
        }
    }
    public void activateUser(String email, String otp) {
        Optional<User> userOptional = userRepository.findByEmail(email.toLowerCase());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Check if the OTP matches
            if (user.getOtp().equals(otp)) {
                user.setActive(true);  // Activate the account
                user.setOtp(null);     // Clear the OTP after verification
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid OTP.");
            }
        } else {
            throw new RuntimeException("User not found.");
        }
    }


    // Save the user's profile image
    public String saveProfileImage(MultipartFile file, Long userId) throws IOException {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String fileName = userId + "_" + file.getOriginalFilename();
            String filePath = uploadDir + "/profileImages/" + fileName;

            // Create directories if they do not exist
            File directory = new File(uploadDir + "/profileImages/");
            if (!directory.exists()) {
                directory.mkdirs(); // Create the directory
            }

            // Save the file to the server
            File saveFile = new File(filePath);
            file.transferTo(saveFile);

            // Update user's profile image path
            user.setProfileImage(filePath);
            userRepository.save(user);

            return filePath;
        } else {
            throw new RuntimeException("User not found.");
        }
    }
    public User createSuperAdmin(String username, String email, String password) {
        // Vérifie si un super admin existe déjà
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return existingUser.get();  // Le super admin existe déjà
        }

        // Si le super admin n'existe pas, créer un nouveau
        User superAdmin = new User();
        superAdmin.setUsername(username);
        superAdmin.setEmail(email.toLowerCase());
        superAdmin.setPassword(password);  // Stocke le mot de passe hashé
        superAdmin.setActive(true);  // Compte actif
        superAdmin.setRole("SUPER_ADMIN");  // Assigner le rôle de super admin

        return userRepository.save(superAdmin);
    }
    // Authenticate the user by email and password
    public User authenticateUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email.toLowerCase());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Compare passwords (plain-text for now, but can be hashed)
            if (user.getPassword().equals(password)) {
                return user;
            } else {
                throw new RuntimeException("Invalid email or password.");
            }
        } else {
            throw new RuntimeException("Invalid email or password.");
        }
    }

    // Check if the user is an admin
    public boolean isAdmin(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email.toLowerCase());

        return userOptional.isPresent() && (userOptional.get().getRole().equals("admin")
                || userOptional.get().getRole().equals("super_admin"));
    }

    // Generate a 6-digit OTP for email verification
    private String generateOTP() {
        Random random = new Random();
        int otp = random.nextInt(999999);
        return String.format("%06d", otp);
    }
    public void promoteToAdmin(Long userId) throws Exception {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if ("admin".equalsIgnoreCase(user.getRole())) {
                throw new Exception("User is already an admin");
            }
            user.setRole("admin");
            userRepository.save(user);
        } else {
            throw new Exception("User not found");
        }
    }

    public void revertToUser(Long userId) throws Exception {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if ("user".equalsIgnoreCase(user.getRole())) {
                throw new Exception("User is already a regular user");
            }
            user.setRole("user");
            userRepository.save(user);
        } else {
            throw new Exception("User not found");
        }
    }

    // Check if the email domain is valid
    private boolean isValidEmail(String email) {
        return email.endsWith("@um6p.ma");
    }
}
