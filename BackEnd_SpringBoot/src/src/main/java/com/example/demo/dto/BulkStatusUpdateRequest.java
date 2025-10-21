package com.example.demo.dto;

import java.time.LocalDate;
import java.util.List;

public class BulkStatusUpdateRequest {
    private List<Long> ids;
    private String status;
    private String redirectOption;
    private LocalDate startDate;
    private LocalDate endDate;

    // Getters and setters
    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRedirectOption() {
        return redirectOption;
    }

    public void setRedirectOption(String redirectOption) {
        this.redirectOption = redirectOption;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
