package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.List;

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
	
	public ResponseStructure<Inquiry> saveInquiry(Inquiry inquiry,int userId)
	{
		inquiry.setCreationTime(LocalDateTime.now());
		Inquiry inquiry2=inquiryDao.saveInquiry(inquiry, userId); 
		return new ResponseStructure<Inquiry>(HttpStatus.OK.value(),"Inquiry saved Sucessfully",inquiry2,LocalDateTime.now());
	}
	public ResponseStructure<Inquiry> updateInquiry(Inquiry inquiry, int id)
	{
		Inquiry inquiry2=inquiryDao.updateInquiry(inquiry, id);
		
		return new ResponseStructure<Inquiry>(HttpStatus.OK.value(),"Inquiry Updated Sucessfully",inquiry2,LocalDateTime.now());
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

	 public ResponseStructure<List<Inquiry>> fetchInquiriesByUserId(int userId) {
	        List<Inquiry> inquiries = inquiryRepository.findByUserId(userId);
	        ResponseStructure<List<Inquiry>> responseStructure = new ResponseStructure<>();
	        responseStructure.setData(inquiries);
	        responseStructure.setMessage("Inquiries fetched successfully");
	        responseStructure.setStatusCode(HttpStatus.OK.value());
	        return responseStructure;
	    }
	
    public ResponseStructure<Inquiry> deleteInquiry(int id)
    {
    	Inquiry inquiry=inquiryDao.deleteInquiry(id);
    	return new ResponseStructure<Inquiry>(HttpStatus.OK.value(), "Inqury deleted Succesfully", inquiry,LocalDateTime.now());

    }
}
