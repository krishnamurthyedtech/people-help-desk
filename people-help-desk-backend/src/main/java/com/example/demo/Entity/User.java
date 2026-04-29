package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users", schema = "public")
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

	public User() {
	}

	public User(int id, String name, String email, String phoneno, String password, String role) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.phoneno = phoneno;
		this.password = password;
		this.role = role;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneno() {
		return phoneno;
	}

	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
}
