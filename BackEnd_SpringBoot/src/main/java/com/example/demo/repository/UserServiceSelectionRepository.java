package com.example.demo.repository;

import com.example.demo.entities.User;
import com.example.demo.entities.UserServiceSelection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.User;
import com.example.demo.entities.UserServiceSelection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface UserServiceSelectionRepository extends JpaRepository<UserServiceSelection, Long> {
    List<UserServiceSelection> findByStatus(String status);
    List<UserServiceSelection> findByUserEmail(String email);
    List<UserServiceSelection> findByUser(User user);
    List<UserServiceSelection> findByUserIdAndRequestDate(Long userId, LocalDateTime requestDate);
    List<UserServiceSelection> findByGroupId(Long groupId);

}
