package com.example.demo.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Inquiry;
import com.example.demo.Entity.User;
import com.example.demo.Repository.InquiryRepository;

import jakarta.persistence.EntityNotFoundException;


@Repository
public class InquiryDao {
	
	@Autowired
	private InquiryRepository inquiryRepository;
	@Autowired
	private UserDao userDao;
	
	public Inquiry saveInquiry(Inquiry inquiry,int userId)
	{
		User user=userDao.fetchUser(userId);
		inquiry.setUser(user);
		return inquiryRepository.save(inquiry);
	}
	public Inquiry updateInquiry(Inquiry inquiry, int id)
	{
		boolean existsById=inquiryRepository.existsById(id);
		if(!existsById)
		{
			throw new EntityNotFoundException("Inquiry with the id " + id + " is not present");
		}
		inquiry.setId(id);
		return inquiryRepository.save(inquiry);
	}
	public Inquiry fetchInquiry(int id)
	{
		Optional<Inquiry> optional=inquiryRepository.findById(id);
		if(optional.isEmpty())
		{
			throw new EntityNotFoundException("Inquiry with the id " + id + " is not present");

		}
		return optional.get();
	}
	public List<Inquiry> fetchAllInquiries()
	{
		List<Inquiry> list=inquiryRepository.findAll();
		if (list.isEmpty())
		{
			throw new EntityNotFoundException("No Inquires data available in the DataBase");
		}
		return list;
	}
	public List<Inquiry> fetchInquiryByUserId(int id){
		User user=userDao.fetchUser(id);
		return user.getInquiry();
	}
	public Inquiry deleteInquiry(int id)
	{
		Inquiry inquiry=fetchInquiry(id);
		inquiryRepository.delete(inquiry);
		return inquiry;
	}

}
