package com.example.demo.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.User;
import com.example.demo.Exceptions.EntityAlreadyExistsException;
import com.example.demo.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Repository
public class UserDao {
	@Autowired
	private UserRepository userRepository;



	public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EntityAlreadyExistsException("User already exists with email: " +user.getEmail());
        }
       
        return userRepository.save(user);
    }
	public User loginUser(String email, String password) {
        Optional<User> userDetails = userRepository.findByEmail(email);

        if (userDetails.isPresent()) {
            User user = userDetails.get();
            if (password.equals(user.getPassword())) 
            { 
                return user; 
            }
            else 
            {
                throw new IllegalArgumentException("Invalid password");
            }
        } 
        else 
        {
        throw new EntityNotFoundException("No user found with email: " + email);
        }
	}

	public User updateUser(User user, int id) {
		user.setId(id);
		boolean existsById = userRepository.existsById(id);
		if (!existsById) {
			throw new EntityNotFoundException("User not found with the ID :" + id);
		}

		return  userRepository.save(user);
	}

	public User fetchUser(int id) {
		Optional<User> optional=userRepository.findById(id);
		if (optional.isEmpty()) {
			throw new EntityNotFoundException("user not found with the ID :" + id);
		}
		return optional.get();
	}

	public List<User> fetchAllUser() {
		List<User> list=userRepository.findAll();
		if (list.isEmpty()) {
			throw new EntityNotFoundException("users data not available in the database ");
		}

		return list;

	}

	public User deleteUser(int id) {
		User user=fetchUser(id);
		userRepository.delete(user);
		return user;
	}

}
