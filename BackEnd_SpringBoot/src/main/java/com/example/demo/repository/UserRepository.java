package com.example.demo.repository;

import com.example.demo.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);  // Custom query to find user by email
    List<User> findByRole(String role);
}
