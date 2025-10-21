package com.example.demo.service;

import com.example.demo.entities.User;
import com.example.demo.entities.UserServiceSelection;
import com.example.demo.repository.UserServiceSelectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceSelectionService {

    @Autowired
    private UserServiceSelectionRepository selectionRepository;

    public List<UserServiceSelection> getAllSelections() {
        return selectionRepository.findAll();
    }

    public void saveSelection(UserServiceSelection selection) {
        selectionRepository.save(selection);
    }

    public void saveSelections(List<UserServiceSelection> selections) {
        selectionRepository.saveAll(selections);
    }

    public void deleteSelection(Long id) {
        selectionRepository.deleteById(id);
    }

    public List<UserServiceSelection> getSelectionsByStatus(String status) {
        return selectionRepository.findByStatus(status);
    }

    public List<UserServiceSelection> getSelectionsByUserEmail(String email) {
        return selectionRepository.findByUserEmail(email);
    }

    // Corrected this method to use `selectionRepository` instead of `userServiceSelectionRepository`
    public List<UserServiceSelection> getSelectionsByUser(User user) {
        return selectionRepository.findByUser(user);
    }
    public List<UserServiceSelection> getAllSelectionsForUser(Long userId, LocalDateTime requestDate) {
        // Adjust this query according to your repository method
        return selectionRepository.findByUserIdAndRequestDate(userId, requestDate);
    }
    public Optional<UserServiceSelection> getSelectionById(Long id) {
        return selectionRepository.findById(id);
    }
    public List<UserServiceSelection> getAllSelectionsForGroup(Long groupId) {
        return selectionRepository.findByGroupId(groupId);
    }


    public List<UserServiceSelection> getSelectionsByIds(List<Long> ids) {
        return selectionRepository.findAllById(ids);
    }

    // Bulk update method to update the status of multiple selections
    public List<UserServiceSelection> bulkUpdateStatus(List<Long> ids, String newStatus, String redirectOption) {
        List<UserServiceSelection> selections = selectionRepository.findAllById(ids);
        for (UserServiceSelection selection : selections) {
            selection.setStatus(newStatus);

            if ("accepted".equals(newStatus)) {
                selection.setRedirectOption("none");  // No redirect option for approved status
            } else if ("redirected".equals(newStatus)) {
                selection.setRedirectOption(redirectOption);  // Set the redirect option if redirected
            } else if ("rejected".equals(newStatus)) {
                selection.setRedirectOption(null);  // No redirect option for rejected status
            } else if ("pending".equals(newStatus)) {
                selection.setRedirectOption(null);  // Reset redirect option if set to pending
            }
            // Save updated selection
            selectionRepository.save(selection);
        }
		return selections;
    }
    public double getTotalHT() {
        return 0.0;  // Total HT is set to zero
    }

    // Taxes are also zero
    public double getTaxes() {
        return 0.0;  // Taxes set to zero
    }

    // Calculate total (sum of service prices)
    public double calculateTotal(List<UserServiceSelection> selections) {
        return selections.stream()
            .mapToDouble(UserServiceSelection::getPrice)
            .sum();  // Sum of prices of selected services
    }
}
