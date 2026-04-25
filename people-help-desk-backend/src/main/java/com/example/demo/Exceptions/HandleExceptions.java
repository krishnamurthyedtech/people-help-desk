package com.example.demo.Exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.Entity.ResponseStructure;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class HandleExceptions {
	
	@ExceptionHandler(EntityAlreadyExistsException.class)
	public ResponseEntity<ResponseStructure<String>> handleEntityAlreadyExists(EntityAlreadyExistsException e) {
		ResponseStructure<String> structure = new ResponseStructure<>();
		structure.setStatusCode(HttpStatus.CONFLICT.value());
		structure.setMessage("Entity Alrady Exists");
		structure.setData(e.getMessage());
		structure.setTime(LocalDateTime.now());

		return new ResponseEntity<>(structure, HttpStatus.CONFLICT);
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ResponseStructure<String>> handleEntityNotFoundException(EntityNotFoundException e) {
		ResponseStructure<String> structure = new ResponseStructure<>(HttpStatus.NOT_FOUND.value(), "Entity Not Found",
				e.getMessage(), LocalDateTime.now());

		return new ResponseEntity<>(structure, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ResponseStructure<String>> handleException(Exception e) {
		ResponseStructure<String> structure = new ResponseStructure<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),
				"Internal Server Error Please Try again", e.getMessage(), LocalDateTime.now());
		return new ResponseEntity<>(structure, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}