package com.example.demo.Service;

import com.example.demo.DTO.CommentDetailsDTO;
import com.example.demo.Dao.InquiryDao;
import com.example.demo.Entity.Comment;
import com.example.demo.Entity.Inquiry;
import com.example.demo.Entity.User;
import com.example.demo.Repository.CommentRepository;
import com.example.demo.Repository.InquiryRepository;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InquiryRepository inquiryRepository;


    public Comment addComment(Long inquiryId, Long userId, String commentText) {

        User user = userRepository.findById(Math.toIntExact(userId))
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));


        Inquiry inquiry = inquiryRepository.findById(Math.toIntExact(inquiryId))
                .orElseThrow(() -> new RuntimeException("Inquiry not found with ID: " + inquiryId));


        Comment newComment = new Comment();
        newComment.setComment(commentText);
        newComment.setUser(user);
        newComment.setInquiry(inquiry);
        newComment.setCreationTime(LocalDateTime.now());


        return commentRepository.save(newComment);
    }

    public List<CommentDetailsDTO> getCommentDetailsByInquiryId(int inquiryId) {
        return commentRepository.findCommentDetailsByInquiryId(inquiryId);
    }

    public Comment addComment(Comment comment){

        return comment;
    }
}

