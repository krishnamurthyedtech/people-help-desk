package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Inquiry;



public interface InquiryRepository extends JpaRepository<Inquiry, Integer>{

}

