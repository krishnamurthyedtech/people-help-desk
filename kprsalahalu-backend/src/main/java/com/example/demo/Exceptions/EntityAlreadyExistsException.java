package com.example.demo.Exceptions;

public class EntityAlreadyExistsException extends RuntimeException{
	public EntityAlreadyExistsException(String msg)
	{
		super(msg);
	}

}