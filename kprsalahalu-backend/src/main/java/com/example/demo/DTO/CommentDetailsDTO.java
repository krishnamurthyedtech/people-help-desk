package com.example.demo.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDetailsDTO {

    private String comment;
    private LocalDateTime creationTime;
    private String userName;
    private int id;


}
