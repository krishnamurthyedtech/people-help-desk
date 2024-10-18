    package com.example.demo.Entity;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.time.LocalDateTime;
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Entity
    public class Comment {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Column(nullable = false)
        private String comment;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "user_id", nullable = false)
        private User user;  // User who made the comment

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "inquiry_id", nullable = false)
        @JsonBackReference
        private Inquiry inquiry;  // Inquiry the comment is related to

        private LocalDateTime creationTime = LocalDateTime.now();
    }