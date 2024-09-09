package com.example.demo.Repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	
   public Optional<User> findByEmail(String email);
    
    public boolean existsByEmail(String email);

}
