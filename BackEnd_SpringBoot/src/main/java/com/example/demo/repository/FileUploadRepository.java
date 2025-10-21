package com.example.demo.repository;

import com.example.demo.model.FileUpload;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileUploadRepository extends JpaRepository<FileUpload, Long> {

    // Method to find a file by groupId and fileType
    Optional<FileUpload> findByGroupIdAndFileType(String groupId, String fileType);
}
