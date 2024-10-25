package com.example.demo.Controller;

import com.example.demo.DTO.CommentDetailsDTO;
import com.example.demo.Entity.Comment;
import com.example.demo.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;


@PostMapping("/add/{inquiryId}")
public ResponseEntity<Comment> addComment(@PathVariable Long inquiryId, @RequestBody Map<String, Object> requestBody) {
    try {
        String commentText = (String) requestBody.get("comment");
        Long userId = Long.valueOf((Integer) requestBody.get("userId"));


        Comment savedComment = commentService.addComment(inquiryId, userId, commentText);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
    @GetMapping("/fetch/{inquiryId}")
    public ResponseEntity<List<CommentDetailsDTO>> getCommentDetailsByInquiryId(@PathVariable int inquiryId) {
        List<CommentDetailsDTO> commentDetails = commentService.getCommentDetailsByInquiryId(inquiryId);
        return new ResponseEntity<>(commentDetails, HttpStatus.OK);
    }
}

