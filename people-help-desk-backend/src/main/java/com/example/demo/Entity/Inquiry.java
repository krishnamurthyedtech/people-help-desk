package com.example.demo.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "inquiry", schema = "public")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Inquiry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String subject;
	@Column(nullable = false)
	private String  inquiryType;
	@Column(nullable = false)
	private String description;
	private Long phoneNo;

	@OneToMany(mappedBy = "inquiry", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JsonManagedReference
	private List<Comment> comments = new ArrayList<>();

	private LocalDateTime creationTime;

	@Column
	private LocalDateTime lastUpdatedTime;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	@JoinColumn(name = "user_id", nullable = true)
	private User user;

	public Inquiry() {
	}

	public Inquiry(int id, String name, String subject, String inquiryType, String description, Long phoneNo, List<Comment> comments, LocalDateTime creationTime, LocalDateTime lastUpdatedTime, User user) {
		this.id = id;
		this.name = name;
		this.subject = subject;
		this.inquiryType = inquiryType;
		this.description = description;
		this.phoneNo = phoneNo;
		this.comments = comments;
		this.creationTime = creationTime;
		this.lastUpdatedTime = lastUpdatedTime;
		this.user = user;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getInquiryType() {
		return inquiryType;
	}

	public void setInquiryType(String inquiryType) {
		this.inquiryType = inquiryType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(Long phoneNo) {
		this.phoneNo = phoneNo;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public LocalDateTime getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(LocalDateTime creationTime) {
		this.creationTime = creationTime;
	}

	public LocalDateTime getLastUpdatedTime() {
		return lastUpdatedTime;
	}

	public void setLastUpdatedTime(LocalDateTime lastUpdatedTime) {
		this.lastUpdatedTime = lastUpdatedTime;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
