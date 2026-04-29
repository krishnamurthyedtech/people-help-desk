package com.example.demo.repositories;

import com.example.demo.DTO.CommentDetailsDTO;
import com.example.demo.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("SELECT new com.example.demo.DTO.CommentDetailsDTO(c.comment, c.creationTime, u.name,u.id    ) " +
            "FROM Comment c JOIN c.user u " +
            "WHERE c.inquiry.id = :inquiryId")
    List<CommentDetailsDTO> findCommentDetailsByInquiryId(@Param("inquiryId") int inquiryId);
}
