package com.example.demo.DTO;

import java.time.LocalDateTime;

public class CommentDetailsDTO {

    private String comment;
    private LocalDateTime creationTime;
    private String userName;
    private int id;

    public CommentDetailsDTO() {}

    public CommentDetailsDTO(String comment, LocalDateTime creationTime, String userName, int id) {
        this.comment = comment;
        this.creationTime = creationTime;
        this.userName = userName;
        this.id = id;
    }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreationTime() { return creationTime; }
    public void setCreationTime(LocalDateTime creationTime) { this.creationTime = creationTime; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
}
