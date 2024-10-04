package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Inquiry;
import com.example.demo.Entity.ResponseStructure;
import com.example.demo.Service.InquiryService;

@RestController
@RequestMapping("/inquiry")

public class InquiryController {

	@Autowired
	public InquiryService inquiryService;
	
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
    public ResponseEntity<ResponseStructure<List<Inquiry>>> fetchInquiriesByUserId(@PathVariable("userId") int userId) {
        ResponseStructure<List<Inquiry>> structure = inquiryService.fetchInquiriesByUserId(userId);
        return new ResponseEntity<>(structure, HttpStatus.OK);
    }
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ResponseStructure<Inquiry>> deleteInquiry(@PathVariable("id") int id)
	{
		ResponseStructure<Inquiry> structure=inquiryService.deleteInquiry(id);
		return new ResponseEntity<ResponseStructure<Inquiry>>(structure,HttpStatus.OK);
	}
}
