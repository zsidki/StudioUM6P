package com.example.demo.controller;

import com.example.demo.dto.BulkStatusUpdateRequest;
import com.example.demo.entities.User;
import com.example.demo.entities.UserServiceSelection;
import com.example.demo.model.Group;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserServiceSelectionService;
import com.example.demo.service.EmailService;
import com.example.demo.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.demo.repository.GroupRepository; // Import the GroupRepository

@RestController
@RequestMapping("/api/selections")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS from your frontend
public class UserServiceSelectionController {

    @Autowired
    private UserServiceSelectionService selectionService;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private PdfService pdfService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService; // Service for sending emails

    // Fetch all selections
    @GetMapping("/all")
    public List<UserServiceSelection> getAllSelections() {
        return selectionService.getAllSelections();
    }

    // Get selections by user email
    @GetMapping("/getRequestsForUserByEmail/{email}")
    public ResponseEntity<List<UserServiceSelection>> getSelectionsByEmail(@PathVariable String email) {
        List<UserServiceSelection> selections = selectionService.getSelectionsByUserEmail(email);
        if (selections.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no selections found
        }
        return ResponseEntity.ok(selections);
    }

    // Get selections by user ID
    @GetMapping("/getRequestsForUserById/{userId}")
    public ResponseEntity<List<UserServiceSelection>> getSelectionsByUserId(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(404).body(null); // Return 404 if user not found
        }

        List<UserServiceSelection> selections = selectionService.getSelectionsByUser(userOptional.get());
        if (selections.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no selections found
        }
        return ResponseEntity.ok(selections);
    }

    

 // Helper method to convert string "null" to actual null
    private String sanitizeNull(String value) {
        return "null".equals(value) ? null : value;
    }

    @PostMapping("/saveSelection")
    public ResponseEntity<Map<String, Object>> saveSelection(@RequestBody UserServiceSelection selection, @RequestParam Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
            }

            // Attach the user to the selection and generate a unique group ID
            selection.setUser(userOptional.get());
            Long groupId = generateUniqueGroupId(); // Generate a unique group ID
            selection.setGroupId(groupId); // Assign the group ID
            selection.setRequestDate(LocalDateTime.now());

            // Set additional fields
            selection.setDescp(selection.getDescp()); // Set Descp field
            selection.setContent(selection.getContent()); // Set Content field
            selection.setVariation(selection.getVariation()); // Set Variation field
            selection.setFormat(selection.getFormat()); // Set Format field

            // Save the selection
            selectionService.saveSelection(selection);

            // Send a success email to the client
            sendSuccessEmailToClient(selection.getUser().getEmail());

            // Return the groupId in the response as a JSON object
            Map<String, Object> response = new HashMap<>();
            response.put("groupId", groupId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Error saving selection: " + e.getMessage()));
        }
    }

    @PostMapping("/saveSelections")
    public ResponseEntity<Map<String, Object>> saveSelections(@RequestBody List<UserServiceSelection> selections, @RequestParam Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("message", "User not found"));
            }

            // Generate a unique group ID for all selections
            Long groupId = generateUniqueGroupId(); 

            // Loop through each selection, attach the user, set the group ID, and save
            for (UserServiceSelection selection : selections) {
                // Attach user and set request date
                selection.setUser(userOptional.get());
                selection.setGroupId(groupId); // Assign the same group ID to all selections
                selection.setRequestDate(LocalDateTime.now());

                // Set additional fields
                selection.setDescp(selection.getDescp()); // Set Descp field
                selection.setContent(selection.getContent()); // Set Content field
                selection.setVariation(selection.getVariation()); // Set Variation field
                selection.setFormat(selection.getFormat()); // Set Format field

                // Save the selection
                selectionService.saveSelection(selection);
            }

            // Send a success email to the client after saving all selections
            sendSuccessEmailToClient(userOptional.get().getEmail());

            // Return the groupId in the response as a JSON object
            Map<String, Object> response = new HashMap<>();
            response.put("groupId", groupId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Error saving selections: " + e.getMessage()));
        }
    }


    private Long generateUniqueGroupId() {
        return System.currentTimeMillis();
    }


    // Method to send a success email to the client
    private void sendSuccessEmailToClient(String clientEmail) {
    	String messageContent = 
    		    "<html><body>" +
    		    "<p>Dear UM6P Community Member,</p>" +
    		    "<p>Your service request has been successfully saved.</p>" +
    		    "<p>Thank you for using our services.</p>" +
    		    "<p>If you have any questions, feel free to contact us at <a href='mailto:studio6@um6p.ma'>studio6@um6p.ma</a>.</p>" +
    		    "<p><b>Best regards,</b></p>" +
    		    "<p><b>UM6P Studio team</b></p>" +
    		    "</body></html>";


        emailService.sendEmail(clientEmail, "Service Request Submitted Successfully", messageContent);
    }
    @PutMapping("/updateSelection/{id}")
    public ResponseEntity<String> updateSelection(@PathVariable Long id, 
                                                  @RequestBody UserServiceSelection selection) {
        try {
            // Fetch the existing selection
            Optional<UserServiceSelection> existingSelection = selectionService.getSelectionById(id);
            if (!existingSelection.isPresent()) {
                return ResponseEntity.status(404).body("Selection not found");
            }

            UserServiceSelection existing = existingSelection.get();

            // Log the incoming selection object
            System.out.println("Updating Selection: " + selection);

            // Update the fields from the frontend, including status
            existing.setPrice(selection.getPrice());
            existing.setVariation(selection.getVariation());
            existing.setWorkerAssigned(selection.getWorkerAssigned());
            existing.setWorkerEmail(selection.getWorkerEmail());
            existing.setStatus(selection.getStatus());
            existing.setStartDate(selection.getStartDate());
            existing.setEndDate(selection.getEndDate());

            // Save the updated selection
            selectionService.saveSelection(existing);

            // After updating the selection, check the statuses of all requests in the same group
            List<UserServiceSelection> allSelectionsForGroup = selectionService.getAllSelectionsForGroup(existing.getGroupId());

            // Check if all selections in the group are no longer pending (case-insensitive)
            boolean allNotPending = allSelectionsForGroup.stream()
                .noneMatch(sel -> "Pending".equalsIgnoreCase(sel.getStatus())); // Case-insensitive check

            // Log the status of allNotPending
            System.out.println("All selections in group ID " + existing.getGroupId() + " are not pending: " + allNotPending);

            // Check if at least one selection in the group is accepted (case-insensitive)
            boolean hasAccepted = allSelectionsForGroup.stream()
                .anyMatch(sel -> "Accepted".equalsIgnoreCase(sel.getStatus())); // Case-insensitive check

            // Log the status of hasAccepted
            System.out.println("At least one selection in group ID " + existing.getGroupId() + " is accepted: " + hasAccepted);

            // If all requests in the group are not pending and at least one is accepted, send the email
            if (allNotPending && hasAccepted) {
                StringBuilder emailBody = new StringBuilder()
                    .append("<p>Dear UM6P Community Member,</p>")
                    .append("<p>Good news! Your order has been accepted and is currently being processed.</p>")
                    .append("<p>You can now check your order dashboard for more details and real-time updates.</p>")
                    .append("<p>Here are the details of the accepted services:</p>");

                // Only include "Accepted" selections in the email
                allSelectionsForGroup.stream()
                    .filter(req -> "Accepted".equalsIgnoreCase(req.getStatus()))
                    .forEach(req -> emailBody.append(String.format("<p>- Service: %s, Status: %s, Price: %.2f MAD</p>", 
                        req.getServiceName(), req.getStatus(), req.getPrice())));

                emailBody.append("<p>If you have any questions, feel free to contact us at studio6@um6p.ma.</p>")
                    .append("<p>Best regards,</p>")
                    .append("<p><b>UM6P Studio team</b></p>");

                // Log the email content
                System.out.println("Preparing to send email to client. Email content: \n" + emailBody.toString());

                // Send the email to the client
                sendEmailToClient(existing.getUser().getEmail(), emailBody.toString(), "accepted");

                // Log that the email has been sent to the client
                System.out.println("Email successfully sent to client: " + existing.getUser().getEmail());
            } else {
                // Log why email was not sent
                System.out.println("Email was not sent because either not all selections are non-pending or no selections are accepted.");
            }

            // Send email to worker if the selection was approved
            if ("Accepted".equalsIgnoreCase(existing.getStatus())) {
                sendEmailToWorker(existing); // Call the method to send email to the worker
            }

            return ResponseEntity.ok("Selection updated successfully");


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating selection: " + e.getMessage());
        }
    }

    // Method to send an email to the worker
    private void sendEmailToWorker(UserServiceSelection selection) {
        String workerEmail = selection.getWorkerEmail();

        // Log worker email before sending
        System.out.println("Worker email (before sending): " + workerEmail);

        if (workerEmail != null) {
            String messageContent = String.format(
                "Dear %s,\n\n" +
                "You have been assigned a new task for the service '%s'.\n" +
                "Variation: %s\n" +
                "Description: %s\n" +
                "Format: %s\n" +
                "Start Date: %s\n" +
                "End Date: %s\n\n" +
                "--- Client Details ---\n" +
                "Client Name: %s\n" +
                "Client Email: %s\n" +
                "Client Phone: %s\n" +
                "Client Department: %s\n\n" +
                "Please check the system for further details.",
                selection.getWorkerAssigned(),
                selection.getServiceName(),
                selection.getVariation(),
                selection.getDescp(), // Assuming description is part of UserServiceSelection
                selection.getFormat(), // Assuming format is part of UserServiceSelection
                selection.getStartDate() != null ? selection.getStartDate().toString() : "N/A",
                selection.getEndDate() != null ? selection.getEndDate().toString() : "N/A",
                selection.getUser().getUsername(),
                selection.getUser().getEmail(),
                selection.getUser().getPhone(),
                selection.getUser().getDepartment()
            );

            // Log message content for verification
            System.out.println("Message Content to Worker: " + messageContent);

            emailService.sendEmail(workerEmail, "New Task Assigned", messageContent);
            
            // Log that the email has been sent to the worker
            System.out.println("Email successfully sent to worker: " + workerEmail);
        } else {
            System.out.println("Worker email is null or invalid.");
        }
    }

   
    private void sendEmailToClient(String clientEmail, String emailBody, String finalStatus) {
        String subject = "Service Requests " + finalStatus.substring(0, 1).toUpperCase() + finalStatus.substring(1);
        String messageContent = String.format(
            "%s\n\nThank you for using our services.", 
            emailBody
        );

        emailService.sendEmail(clientEmail, subject, messageContent);
    }



    // Bulk status update
    @PostMapping("/bulkUpdateStatus")
    public ResponseEntity<String> bulkUpdateStatus(@RequestBody BulkStatusUpdateRequest request) {
        try {
            List<Long> ids = request.getIds();
            String newStatus = request.getStatus();
            String redirectOption = request.getRedirectOption();
            List<UserServiceSelection> selections = selectionService.bulkUpdateStatus(ids, newStatus, redirectOption);

            for (UserServiceSelection selection : selections) {
                if ("Accepted".equals(selection.getStatus()) && selection.getWorkerEmail() != null) {
                    sendEmailToWorker(selection); // Send email on approval
                }
            }

            return ResponseEntity.ok("Bulk status update successful");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating selections: " + e.getMessage());
        }
    }

    // Delete a selection
    @DeleteMapping("/deleteSelection/{id}")
    public ResponseEntity<String> deleteSelection(@PathVariable Long id) {
        try {
            selectionService.deleteSelection(id);
            return ResponseEntity.ok("Selection deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting selection: " + e.getMessage());
        }
    }
    @GetMapping("/generatePdf/{groupId}")
    public ResponseEntity<byte[]> generatePdfForApprovedRequest(@PathVariable Long groupId) {
        // Fetch selections by group ID
        List<UserServiceSelection> selections = selectionService.getAllSelectionsForGroup(groupId);

        // Ensure there are selections to process
        if (!selections.isEmpty()) {
            // Generate the PDF using the PdfService
            byte[] pdfBytes = pdfService.generatePdfForUser(selections);

            // Prepare response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "devis.pdf");

            return ResponseEntity.ok().headers(headers).body(pdfBytes);
        }

        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/devis/{groupId}")
    public ResponseEntity<String> getDevisForGroup(@PathVariable Long groupId) {
        // Fetch the group by ID
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        // Check if a devis file exists
        String devisFilePath = group.getDevisFile();
        if (devisFilePath != null) {
            // Return the file path (you can modify this to return file content or a download link)
            return ResponseEntity.ok(devisFilePath);
        } else {
            return ResponseEntity.status(404).body("No Devis found for this group");
        }
    }

    private void applyStatusLogic(UserServiceSelection selection) {
        if ("Rejected".equals(selection.getStatus())) {
            selection.setStartDate(null);
            selection.setEndDate(null);
        } else if ("Redirected".equals(selection.getStatus())) {
            if (selection.getRedirectOption() == null) {
                throw new IllegalArgumentException("Redirect option is required for redirected status.");
            }
        } else if ("Accepted".equals(selection.getStatus())) {
            if (selection.getWorkerEmail() == null) {
                throw new IllegalArgumentException("Worker email is required for approved requests.");
            }
        } else {
            selection.setRedirectOption(null);  // Clear redirect option if not applicable
        }
    }
}
