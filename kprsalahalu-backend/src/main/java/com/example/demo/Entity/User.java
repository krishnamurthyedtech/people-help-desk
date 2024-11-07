package com.example.demo.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable=false)
	private String name;
	@Column(unique = true,nullable=false)
	private String email;
	
	@Column(unique = true,nullable=false)
	private String phoneno;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false, columnDefinition = "varchar(255) default 'user'")
	private String role ="user";


}
