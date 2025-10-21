package com.example.demo.controller;

import com.example.demo.entities.UserServiceSelection;
import com.example.demo.service.PdfService;
import com.example.demo.service.UserServiceSelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "http://localhost:3000")
public class PdfController {

    @Autowired
    private UserServiceSelectionService selectionService;

    @Autowired
    private PdfService pdfService;

    // Generate PDF for approved selections
    @GetMapping("/generatePdf/{groupId}")
    public ResponseEntity<byte[]> generatePdfForApprovedRequest(@PathVariable Long groupId) {
        // Log the incoming request
        System.out.println("Generating PDF for group ID: " + groupId);

        // Fetch selections based on group ID
        List<UserServiceSelection> selections = selectionService.getAllSelectionsForGroup(groupId);

        // If no selections found, return 404 with message
        if (selections.isEmpty()) {
            System.out.println("No selections found for group ID: " + groupId);
            return ResponseEntity.status(404).body(null);
        }

        // Filter approved selections
        List<UserServiceSelection> approvedSelections = selections.stream()
                .filter(selection -> "Accepted".equalsIgnoreCase(selection.getStatus()))
                .toList();

        // If no approved selections found, return 404 with message
        if (approvedSelections.isEmpty()) {
            System.out.println("No Accepted selections found for group ID: " + groupId);
            return ResponseEntity.status(404).body(null);
        }

        // Log successful PDF generation request
        System.out.println("Generating PDF for approved selections...");

        byte[] pdfBytes = pdfService.generatePdfForUser(approvedSelections);

        // Return the PDF document
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", "devis.pdf");

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}
