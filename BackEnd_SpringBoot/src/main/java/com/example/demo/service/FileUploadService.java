package com.example.demo.service;

import com.example.demo.model.FileUpload;
import com.example.demo.repository.FileUploadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class FileUploadService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private FileUploadRepository fileUploadRepository;

    // Store file with groupId and fileType association
    public FileUpload storeFile(MultipartFile file, String groupId, String fileType) throws IOException {
        // Create the directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save the file to the upload directory
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        Files.write(filePath, file.getBytes());

        // Save file info in the database
        FileUpload fileUpload = new FileUpload();
        fileUpload.setFileName(file.getOriginalFilename());
        fileUpload.setFilePath(filePath.toString());
        fileUpload.setGroupId(groupId); // Associate file with the groupId
        fileUpload.setFileType(fileType);  // Set the file type (either "quote" or "summary")

        return fileUploadRepository.save(fileUpload);
    }

    // Method to load file as a Resource based on the groupId and fileType
    public Resource loadFileAsResource(String groupId, String fileType) throws MalformedURLException {
        // Query the file metadata by groupId and fileType from the database
        Optional<FileUpload> fileUploadOptional = fileUploadRepository.findByGroupIdAndFileType(groupId, fileType);

        if (fileUploadOptional.isPresent()) {
            FileUpload fileUpload = fileUploadOptional.get();
            Path filePath = Paths.get(fileUpload.getFilePath()).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found or not readable");
            }
        } else {
            throw new RuntimeException("File not found for groupId: " + groupId + " and fileType: " + fileType);
        }
    }
}
