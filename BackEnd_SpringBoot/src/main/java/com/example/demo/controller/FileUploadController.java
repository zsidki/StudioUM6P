package com.example.demo.controller;

import com.example.demo.service.FileUploadService; // Import your service
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/upload")
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class); // Logger instance

    private final FileUploadService fileUploadService;

    @Autowired
    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    // Upload file with groupId and fileType (either "quote" or "summary")
    @PostMapping("/{groupId}/{fileType}")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable String groupId, @PathVariable String fileType) {
        if (file.isEmpty()) {
            logger.warn("File upload failed. No file selected.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }

        // Validate the fileType to ensure it's either "quote" or "summary"
        if (!fileType.equals("quote") && !fileType.equals("summary")) {
            logger.error("Invalid file type received: {}", fileType);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type. Must be 'quote' or 'summary'.");
        }

        try {
            // Log the file upload attempt
            logger.info("Uploading file: {} with groupId: {} and fileType: {}", file.getOriginalFilename(), groupId, fileType);

            // Call the service method to store the file with the groupId and fileType
            fileUploadService.storeFile(file, groupId, fileType);

            // Log success
            logger.info("File uploaded successfully: {} with groupId: {} and fileType: {}", file.getOriginalFilename(), groupId, fileType);

            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            // Log error if something goes wrong
            logger.error("Error uploading file: {} with groupId: {} and fileType: {}. Error: {}", file.getOriginalFilename(), groupId, fileType, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping("/download/{groupId}/{fileType}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String groupId, @PathVariable String fileType) {
        try {
            // Log the download attempt
            logger.info("Attempting to download file with groupId: {} and fileType: {}", groupId, fileType);

            // Call the service method to load the file as a Resource based on groupId and fileType
            Resource fileResource = fileUploadService.loadFileAsResource(groupId, fileType);

            if (fileResource == null) {
                logger.warn("File not found for groupId: {} and fileType: {}", groupId, fileType);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Log success
            logger.info("File found and ready for download: {} with groupId: {} and fileType: {}", fileResource.getFilename(), groupId, fileType);

            // Prepare response with file metadata
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResource.getFilename() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream") // Ensure the correct content type
                .body(fileResource);

        } catch (Exception e) {
            // Log error if something goes wrong
            logger.error("Error downloading file with groupId: {} and fileType: {}. Error: {}", groupId, fileType, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}