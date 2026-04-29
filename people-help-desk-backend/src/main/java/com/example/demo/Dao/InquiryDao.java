package com.example.demo.Dao;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Inquiry;
import com.example.demo.Entity.User;
import com.example.demo.repositories.InquiryRepository;

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
	@NonNull
	public Inquiry fetchInquiry(int id)
	{
		Optional<Inquiry> optional=inquiryRepository.findById(id);
		if(optional.isEmpty())
		{
			throw new EntityNotFoundException("Inquiry with the id " + id + " is not present");

		}
		return Objects.requireNonNull(optional.get());
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

	
	public List<Inquiry> fetchInquiryByUserId(int userId) {
        List<Inquiry> inquiries = inquiryRepository.findByUserId(userId);
        if (inquiries.isEmpty()) {
            throw new EntityNotFoundException("No inquiries found for user with id " + userId);
        }
        return inquiries;
    }
	@NonNull
	public Inquiry deleteInquiry(int id)
	{
		Inquiry inquiry=fetchInquiry(id);
		inquiryRepository.delete(inquiry);
		return inquiry;
	}

}
