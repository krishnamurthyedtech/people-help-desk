package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.Dao.UserDao;
import com.example.demo.Entity.ResponseStructure;
import com.example.demo.Entity.User;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	public ResponseStructure<User>registerUser(User user)
	{
		User user1=userDao.registerUser(user);
		return new ResponseStructure<>(HttpStatus.CREATED.value(),"User registered successfully", user1, LocalDateTime.now());
	}
	
	public ResponseStructure<User> loginUser(String email, String password) {
	    try {
	        User user = userDao.loginUser(email, password);
	        return new ResponseStructure<>(HttpStatus.OK.value(), "User logged in successfully", user, LocalDateTime.now());
	    } catch (EntityNotFoundException e) {
	      return new ResponseStructure<>(HttpStatus.OK.value(), "No user found with the given email", null, LocalDateTime.now());
	    } catch (IllegalArgumentException e) {
	        return new ResponseStructure<>(HttpStatus.OK.value(), "Invalid password", null, LocalDateTime.now());
	    } catch (Exception e) {
	        return new ResponseStructure<>(HttpStatus.OK.value(), "No user found with the given email and password", null, LocalDateTime.now());
	    }
	}

	public ResponseStructure<User> updateUser(User user,int id)
	{
		User user2=userDao.updateUser(user, id);
		return new ResponseStructure<>(HttpStatus.OK.value(), "User Updated Succesfully",user2 , LocalDateTime.now());
	}
	public ResponseStructure<User> fetchUser(int id)
	{
		User userLogin=userDao.fetchUser(id);
		return new ResponseStructure<>(HttpStatus.OK.value(), "User data fetched Succesfully", userLogin,LocalDateTime.now());
	}
	public ResponseStructure<List<User>> fetchAllUser() {
		List<User> list=userDao.fetchAllUser();
		return new ResponseStructure<>(HttpStatus.OK.value(), " All User data fetched Succesfully", list, LocalDateTime.now());
	}
	public ResponseStructure<User> deleteUser(int id)
	{
		User userLogin=userDao.deleteUser(id);
		return new ResponseStructure<>(HttpStatus.OK.value(), "User deleted Succesfully",userLogin, LocalDateTime.now());

	}

}
