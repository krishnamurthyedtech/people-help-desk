package com.example.demo.Entity;



import java.time.LocalDateTime;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
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

	private String comment;
	private LocalDateTime creationTime;
	@ManyToOne
	private User user;
	

}
