package com.example.demo.Controller;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.DTO.CommentDetailsDTO;
import com.example.demo.DTO.InquiryDetailsDTO;
import com.example.demo.Repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Inquiry;
import com.example.demo.Entity.ResponseStructure;
import com.example.demo.Service.InquiryService;

@RestController
@RequestMapping("/api/inquiry")

public class InquiryController {

	@Autowired
	public InquiryService inquiryService;
	@Autowired
	public InquiryRepository inquiryRepository;
	
	@PostMapping("/save/{userId}")
	public ResponseEntity<ResponseStructure<Inquiry>> saveInquiry(@RequestBody Inquiry inquiry,@PathVariable("userId")int userId)
	{
		ResponseStructure<Inquiry> structure=inquiryService.saveInquiry(inquiry, userId);
		return new ResponseEntity<>(structure,HttpStatus.OK);
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<ResponseStructure<Inquiry>> updateInquiry(@RequestBody Inquiry inquiry,@PathVariable("id") int id)
	{
		ResponseStructure<Inquiry> structure=inquiryService.updateInquiry(inquiry, id);
		return new ResponseEntity<>(structure,HttpStatus.OK);
	}
	@GetMapping("/fetch/{id}")
	public ResponseEntity<ResponseStructure<Inquiry>> fetchInquiry(@PathVariable("id") int id)
	{
		ResponseStructure<Inquiry> inquiry=inquiryService.fetchInquiry(id);
		return new ResponseEntity<>(inquiry,HttpStatus.OK);
	}
	@GetMapping("/fetch")
	public ResponseEntity<ResponseStructure<List<Inquiry>>> fetchAllInquiries()
	{
		ResponseStructure<List<Inquiry>> structure=inquiryService.fetchAllInquiries();
		return new ResponseEntity<>(structure,HttpStatus.OK);
	}
	@GetMapping("/fetchByUser/{userId}")
	public ResponseEntity<ResponseStructure<List<InquiryDetailsDTO>>> fetchInquiriesByUserId(@PathVariable("userId") int userId) {
		List<Inquiry> inquiries = inquiryService.fetchInquiriesByUserId(userId);
		List<InquiryDetailsDTO> inquiryDTOs = inquiries.stream().map(inquiry -> {
			InquiryDetailsDTO dto = new InquiryDetailsDTO();
			dto.setId(inquiry.getId());
			dto.setName(inquiry.getName());
			dto.setSubject(inquiry.getSubject());
			dto.setInquiryType(inquiry.getInquiryType());
			dto.setDescription(inquiry.getDescription());
			dto.setPhoneNo(inquiry.getPhoneNo());
			dto.setCreationTime(inquiry.getCreationTime());
			dto.setComments(inquiry.getComments().stream().map(comment -> {
				CommentDetailsDTO commentDTO = new CommentDetailsDTO();
				commentDTO.setId(comment.getId());
				//commentDTO.setText(comment.getText());
				commentDTO.setCreationTime(comment.getCreationTime());
				return commentDTO;
			}).collect(Collectors.toList()));
			return dto;
		}).collect(Collectors.toList());

		ResponseStructure<List<InquiryDetailsDTO>> structure = new ResponseStructure<>();
		structure.setData(inquiryDTOs);
		structure.setMessage("Inquiries fetched successfully");
		structure.setStatusCode(HttpStatus.OK.value());

		return new ResponseEntity<>(structure, HttpStatus.OK);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ResponseStructure<Inquiry>> deleteInquiry(@PathVariable("id") int id)
	{
		ResponseStructure<Inquiry> structure=inquiryService.deleteInquiry(id);
		return new ResponseEntity<>(structure,HttpStatus.OK);
	}
}
