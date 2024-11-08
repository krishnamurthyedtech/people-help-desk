package com.example.demo.Entity;



import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Inquiry
{
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
	private String phoneNo;

	@OneToMany(mappedBy = "inquiry", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JsonManagedReference
	@ToString.Exclude
	private List<Comment> comments = new ArrayList<>();


	//private String comment;
	private LocalDateTime creationTime;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	@ToString.Exclude
	private User user;


}
