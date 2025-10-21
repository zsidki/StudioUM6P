package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.service.UserService;

@SpringBootApplication
public class Comum6pbApplication {

    @Autowired
    private UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(Comum6pbApplication.class, args);
    }

    // Crée le super admin lors du démarrage de l'application
    @Bean
    public ApplicationRunner initializer() {
        return args -> {
            // Initialiser un super admin avec des informations de base
            String superAdminUsername = "Super Admin";
            String superAdminEmail = "superadmin@example.com";  // Tu peux définir cette valeur dans application.properties
            String superAdminPassword = "supersecurepassword";  // Assure-toi de hash ce mot de passe

            // Crée le super admin
            userService.createSuperAdmin(superAdminUsername, superAdminEmail, superAdminPassword);

            System.out.println("Super admin initialisé.");
        };
    }
}

