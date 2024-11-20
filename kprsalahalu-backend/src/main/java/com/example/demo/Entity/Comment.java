    package com.example.demo.Entity;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import jakarta.persistence.*;
    import jakarta.validation.constraints.NotBlank;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import lombok.ToString;

    import java.time.LocalDateTime;

    import static java.awt.SystemColor.text;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Entity
    public class Comment {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Column(nullable = false)
        @NotBlank(message = "Comment text cannot be null or empty")
        private String comment;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "user_id", nullable = false)
        @ToString.Exclude
        private User user;  // User who made the comment

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "inquiry_id", nullable = false)
        @JsonBackReference
        @ToString.Exclude
        private Inquiry inquiry;  // Inquiry the comment is related to

        private LocalDateTime creationTime = LocalDateTime.now();


        }
