package com.example.demo.Controller;



import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.LoginRequest;
import com.example.demo.Entity.ResponseStructure;
import com.example.demo.Entity.User;
import com.example.demo.Service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;
    @GetMapping("/home")
    public String Home() {
    	return "home";
    }
    
    @PostMapping("/register")
    public ResponseEntity<ResponseStructure<User>> registerUser(@RequestBody User user) {
        ResponseStructure<User> response = userService.registerUser(user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<ResponseStructure<User>> loginUser(@RequestBody LoginRequest loginRequest) {
        ResponseStructure<User> response = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseStructure<User>> updateUser(@RequestBody User user , @PathVariable("id") int id) {
        ResponseStructure<User> user1 = userService.updateUser(user, id);
        return new ResponseEntity<>(user1, HttpStatus.OK);
    }
    

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseStructure<User>> fetchUser(@PathVariable("id") int id) {
        ResponseStructure<User> structure = userService.fetchUser(id);
        return new ResponseEntity<>(structure, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<ResponseStructure<List<User>>> fetchAllUser() {
        ResponseStructure<List<User>> fetchAllUser = userService.fetchAllUser();
        return new ResponseEntity<>(fetchAllUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseStructure<User>> deleteUser(@PathVariable("id") int id) {
        ResponseStructure<User> structure = userService.deleteUser(id);
        return new ResponseEntity<>(structure, HttpStatus.OK);
    }
}
