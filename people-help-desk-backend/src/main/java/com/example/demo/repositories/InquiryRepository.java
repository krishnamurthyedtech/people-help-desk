package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Inquiry;



public interface InquiryRepository extends JpaRepository<Inquiry, Integer>{
	 List<Inquiry> findByUserId(int userId);

}

