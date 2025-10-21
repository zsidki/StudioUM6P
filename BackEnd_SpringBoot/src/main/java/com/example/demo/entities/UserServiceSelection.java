package com.example.demo.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class UserServiceSelection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long groupId;
    public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	private String serviceName;
    private String category;
    private String status;
    private Double price;
    private String workerAssigned;
    private String redirectOption;
    @Lob
    @Column(name = "variation", columnDefinition = "LONGTEXT")  // Specify LONGTEXT for MySQL
    private String variation;  // Variation field
    private String workerEmail;
    @Lob  
    @Column(name = "descp", columnDefinition = "LONGTEXT")  // Specify LONGTEXT for MySQL

    private String descp; // Description du besoin
    
    @Lob
    @Column(name = "content", columnDefinition = "LONGTEXT")  // Specify LONGTEXT for MySQL
    private String content;  // Contenu et messages clés

    
    @Lob
    @Column(name = "format", columnDefinition = "LONGTEXT")  // Specify LONGTEXT for MySQL
    private String format;

    // Existing fields
    @Column(name = "start_date", nullable = true)
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = true)
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate endDate;

    // Field for the request date
    @Column(name = "request_date")
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime requestDate;

    // Relationship to User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getWorkerAssigned() {
        return workerAssigned;
    }

    public void setWorkerAssigned(String workerAssigned) {
        this.workerAssigned = workerAssigned;
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

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRedirectOption() {
        return redirectOption;
    }

    public void setRedirectOption(String redirectOption) {
        this.redirectOption = redirectOption;
    }

    public String getVariation() {
        return variation;
    }

    public void setVariation(String variation) {
        this.variation = variation;
    }

    // Getters and Setters for new fields
    

    public String getContent() {
        return content;
    }

    public String getDescp() {
		return descp;
	}

	public void setDescp(String descp) {
		this.descp = descp;
	}

	public void setContent(String content) {
        this.content = content;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getWorkerEmail() {
        return workerEmail;
    }

    public void setWorkerEmail(String workerEmail) {
        this.workerEmail = workerEmail;
    }
}
