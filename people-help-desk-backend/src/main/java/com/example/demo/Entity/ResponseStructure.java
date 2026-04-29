package com.example.demo.Entity;

import java.time.LocalDateTime;

public class ResponseStructure<T> {
	
	private int statusCode;
	private String message;
	private T data;
	private LocalDateTime time;

	public ResponseStructure() {
	}

	public ResponseStructure(int statusCode, String message, T data, LocalDateTime time) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.time = time;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public LocalDateTime getTime() {
		return time;
	}

	public void setTime(LocalDateTime time) {
		this.time = time;
	}
}
