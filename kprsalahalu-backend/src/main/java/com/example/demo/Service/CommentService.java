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

    public Comment addComment( Comment comment) {
        // Fetch user and inquiry from their respective repositories
        int userId = comment.getUser().getId();
        int inquiryId = comment.getInquiry().getId();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Inquiry inquiry = inquiryRepository.findById(inquiryId).orElseThrow(() -> new RuntimeException("Inquiry not found"));

        // Set the user and inquiry in the comment
        comment.setUser(user);
        comment.setInquiry(inquiry);

        // Save the comment
        return commentRepository.save(comment);
    }

    public List<CommentDetailsDTO> getCommentDetailsByInquiryId(int inquiryId) {
        return commentRepository.findCommentDetailsByInquiryId(inquiryId);
    }
}