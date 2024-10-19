package com.example.demo.Controller;

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

    @PostMapping("/add")
    // Add a new comment for a specific inquiry
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment ) {

        Comment savedComment = commentService.addComment( comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    // Fetch comments for a specific inquiry
    @GetMapping("/fetch/{inquiryId}")
    public ResponseEntity<List<Comment>> getCommentsByInquiryId(@PathVariable int inquiryId) {
        List<Comment> comments = commentService.getCommentsByInquiryId(inquiryId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }
}

