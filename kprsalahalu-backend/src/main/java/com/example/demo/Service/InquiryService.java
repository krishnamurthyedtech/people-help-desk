package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Dao.UserDao;
import com.example.demo.Entity.Comment;
import com.example.demo.Entity.User;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.Dao.InquiryDao;
import com.example.demo.Entity.Inquiry;
import com.example.demo.Entity.ResponseStructure;
import com.example.demo.Repository.InquiryRepository;

@Service
public class InquiryService {
	
	@Autowired
	private InquiryRepository inquiryRepository;
	@Autowired
	private InquiryDao inquiryDao;
	@Autowired
	private CommentService commentService;
	@Autowired
	private UserDao userDao;
	
	public ResponseStructure<Inquiry> saveInquiry(Inquiry inquiry,int userId)
	{
		inquiry.setCreationTime(LocalDateTime.now());
		List<Comment> comments = inquiry.getComments();
		inquiry.setComments(new ArrayList<>());
		Inquiry inquiry2=inquiryDao.saveInquiry(inquiry, userId);
		for (Comment comment : comments) {
			comment.setInquiry(inquiry2);
			comment.setCreationTime(LocalDateTime.now());
			comment.setUser(userDao.fetchUser(userId));
			Comment savedComment = commentService.addComment( comment);
		}
		return new ResponseStructure<Inquiry>(HttpStatus.OK.value(),"Inquiry saved Sucessfully",inquiry2,LocalDateTime.now());
	}
//	public ResponseStructure<Inquiry> updateInquiry(Inquiry inquiry, int id)
//	{
//		List<Comment> comments = inquiry.getComments();
//		inquiry.setComments(new ArrayList<>());
//		Inquiry inquiry2=inquiryDao.updateInquiry(inquiry, id);
//		for (Comment comment : comments) {
//			comment.setInquiry(inquiry2);
//			comment.setCreationTime(LocalDateTime.now());
//			comment.setUser(userDao.fetchUser(inquiry2.getUser().getId()));
//			Comment savedComment = commentService.addComment( comment);
//		}
//			return new ResponseStructure<Inquiry>(HttpStatus.OK.value(),"Inquiry Updated Sucessfully",inquiry2,LocalDateTime.now());
//	}
	public ResponseStructure<Inquiry> updateInquiry(Inquiry updatedInquiry, int inquiryId) {
		Inquiry existingInquiry = inquiryRepository.findById((int) inquiryId)
				.orElseThrow(() -> new IllegalStateException("Inquiry not found with ID: " + inquiryId));

		if (updatedInquiry.getName() == null) {
			updatedInquiry.setName(existingInquiry.getName());
		}

		existingInquiry.setName(updatedInquiry.getName());
		existingInquiry.setDescription(updatedInquiry.getDescription());
		existingInquiry.setLastUpdatedTime(LocalDateTime.now());

		List<Comment> updatedComments = existingInquiry.getComments();
//		existingInquiry.getComments().clear();

		for (Comment comment : updatedComments) {
			if (comment.getComment() == null || comment.getComment().trim().isEmpty()) {
				throw new IllegalArgumentException("Comment text cannot be null or empty");
			}

			comment.setInquiry(existingInquiry);
			comment.setCreationTime(LocalDateTime.now());
			comment.setUser(userDao.fetchUser(existingInquiry.getUser().getId()));
			existingInquiry.getComments().add(commentService.addComment(comment));
		}

		Inquiry savedInquiry = inquiryRepository.save(existingInquiry);

		return new ResponseStructure<>(
				HttpStatus.OK.value(),
				"Inquiry updated successfully",
				savedInquiry,
				LocalDateTime.now()
		);
	}

	public ResponseStructure<Inquiry>fetchInquiry(int id)
	{
		Inquiry inquiry=inquiryDao.fetchInquiry(id);
		return new ResponseStructure<Inquiry>(HttpStatus.OK.value(),"Inquiry fetched Sucessfully",inquiry,LocalDateTime.now());
	}
	public ResponseStructure<List<Inquiry>> fetchAllInquiries()
	{
		List<Inquiry> list=inquiryDao.fetchAllInquiries();
		list.sort((i1, i2) -> i1.getCreationTime().compareTo(i2.getCreationTime()));

		return new ResponseStructure<List<Inquiry>>(HttpStatus.OK.value(),"Inquiries fetched Sucessfully",list,LocalDateTime.now());
	}
	//
	@Transactional
	public List<Inquiry> fetchInquiriesByUserId(int userId) {
		List<Inquiry> inquiries = inquiryRepository.findByUserId(userId);
		inquiries.forEach(inquiry -> {

			Hibernate.initialize(inquiry.getComments());
		});
		return inquiries;
	}
	
	public ResponseStructure<Inquiry> deleteInquiry(int id)
    {
    	Inquiry inquiry=inquiryDao.deleteInquiry(id);
    	return new ResponseStructure<Inquiry>(HttpStatus.OK.value(), "Inqury deleted Succesfully", inquiry,LocalDateTime.now());

    }
}
