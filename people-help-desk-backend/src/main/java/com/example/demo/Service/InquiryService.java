package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.Dao.UserDao;
import com.example.demo.DTO.HelpRequestDTO;
import com.example.demo.Entity.Comment;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.Dao.InquiryDao;
import com.example.demo.Entity.Inquiry;
import com.example.demo.Entity.ResponseStructure;
import com.example.demo.repositories.InquiryRepository;

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
			commentService.addComment(comment);
		}
		return new ResponseStructure<>(HttpStatus.OK.value(),"Inquiry saved Sucessfully",inquiry2,LocalDateTime.now());
	}
	public ResponseStructure<Inquiry> updateInquiry(Inquiry updatedInquiry, int inquiryId) {
		Inquiry existingInquiry = inquiryRepository.findById(inquiryId)
				.orElseThrow(() -> new IllegalStateException("Inquiry not found with ID: " + inquiryId));

		if (updatedInquiry.getSubject() != null) {
			existingInquiry.setSubject(updatedInquiry.getSubject());
		}
		if (updatedInquiry.getDescription() != null) {
			existingInquiry.setDescription(updatedInquiry.getDescription());
		}
		if (updatedInquiry.getInquiryType() != null) {
			existingInquiry.setInquiryType(updatedInquiry.getInquiryType());
		}

		existingInquiry.setLastUpdatedTime(LocalDateTime.now());
		Inquiry savedInquiry = inquiryRepository.save(existingInquiry);

		return new ResponseStructure<>(HttpStatus.OK.value(), "Inquiry updated successfully", savedInquiry, LocalDateTime.now());
	}


	public ResponseStructure<Inquiry> fetchInquiry(int id)
	{
		Inquiry inquiry=inquiryDao.fetchInquiry(id);
		return new ResponseStructure<>(HttpStatus.OK.value(),"Inquiry fetched Sucessfully",inquiry,LocalDateTime.now());
	}
	public ResponseStructure<List<Inquiry>> fetchAllInquiries()
	{
		List<Inquiry> list=inquiryDao.fetchAllInquiries();
		list.sort((i1, i2) -> i1.getCreationTime().compareTo(i2.getCreationTime()));

		return new ResponseStructure<>(HttpStatus.OK.value(),"Inquiries fetched Sucessfully",list,LocalDateTime.now());
	}

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
    	return new ResponseStructure<>(HttpStatus.OK.value(), "Inqury deleted Succesfully", inquiry,LocalDateTime.now());

    }

	public ResponseStructure<Inquiry> saveHelpRequest(HelpRequestDTO helpRequestDTO)
	{
		Inquiry inquiry = new Inquiry();
		inquiry.setSubject(helpRequestDTO.getSubject());
		inquiry.setInquiryType(helpRequestDTO.getInquiryType());
		inquiry.setDescription(helpRequestDTO.getDescription());
		inquiry.setPhoneNo(helpRequestDTO.getPhone());
		inquiry.setName(String.valueOf(helpRequestDTO.getPhone()));
		inquiry.setCreationTime(LocalDateTime.now());
		inquiry.setComments(new ArrayList<>());

		Inquiry savedInquiry = inquiryRepository.save(inquiry);
		return new ResponseStructure<>(HttpStatus.OK.value(), "Help request submitted successfully", savedInquiry, LocalDateTime.now());
	}
}
