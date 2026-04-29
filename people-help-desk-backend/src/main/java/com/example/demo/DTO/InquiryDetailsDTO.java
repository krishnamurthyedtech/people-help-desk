package com.example.demo.DTO;

import java.time.LocalDateTime;
import java.util.List;

public class InquiryDetailsDTO {
    private int id;
    private String name;
    private String subject;
    private String inquiryType;
    private String description;
    private Long phoneNo;
    private LocalDateTime creationTime;
    private List<CommentDetailsDTO> comments;

    public InquiryDetailsDTO() {}

    public InquiryDetailsDTO(int id, String name, String subject, String inquiryType, String description, Long phoneNo, LocalDateTime creationTime, List<CommentDetailsDTO> comments) {
        this.id = id;
        this.name = name;
        this.subject = subject;
        this.inquiryType = inquiryType;
        this.description = description;
        this.phoneNo = phoneNo;
        this.creationTime = creationTime;
        this.comments = comments;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getInquiryType() { return inquiryType; }
    public void setInquiryType(String inquiryType) { this.inquiryType = inquiryType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getPhoneNo() { return phoneNo; }
    public void setPhoneNo(Long phoneNo) { this.phoneNo = phoneNo; }

    public LocalDateTime getCreationTime() { return creationTime; }
    public void setCreationTime(LocalDateTime creationTime) { this.creationTime = creationTime; }

    public List<CommentDetailsDTO> getComments() { return comments; }
    public void setComments(List<CommentDetailsDTO> comments) { this.comments = comments; }
}

