package com.example.demo.DTO;

public class HelpRequestDTO {
    private Long phone;
    private String subject;
    private String inquiryType;
    private String description;

    public HelpRequestDTO() {}

    public HelpRequestDTO(Long phone, String subject, String inquiryType, String description) {
        this.phone = phone;
        this.subject = subject;
        this.inquiryType = inquiryType;
        this.description = description;
    }

    public Long getPhone() { return phone; }
    public void setPhone(Long phone) { this.phone = phone; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getInquiryType() { return inquiryType; }
    public void setInquiryType(String inquiryType) { this.inquiryType = inquiryType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
