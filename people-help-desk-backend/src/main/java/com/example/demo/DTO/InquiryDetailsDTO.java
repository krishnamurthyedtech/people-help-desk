package com.example.demo.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryDetailsDTO {
    private int id;
    private String name;
    private String subject;
    private String inquiryType;
    private String description;
    private String phoneNo;
    private LocalDateTime creationTime;
    private List<CommentDetailsDTO> comments;  // List of comment DTOs
}

