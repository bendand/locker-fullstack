package com.example.locker_backend.controllers;

import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.UserDTO;
import com.example.locker_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.locker_backend.services.CustomUserDetailsService;

@RestController
@RequestMapping("/")
public class UserController {

    // Autowired UserRepository to handle user data operations
    @Autowired
    private UserRepository userRepository;

    // Endpoint to validate if a user exists by username
    @GetMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody UserDTO userData) throws UsernameNotFoundException {
        try {
            UserDetails userDetails = CustomUserDetailsService.loadUserByUsername(userData.getEmail(), userData.getPassword());
            // If user is found, return user details
            System.out.println(userDetails);
            return ResponseEntity.ok().body("User exists");

        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    //  Endpoint to register a new user
    @PostMapping(value="/register", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userData) {
        System.out.println(userData);
        if (userRepository.existsByUsername(userData.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User exists with this email");
        }
        User newUser = new User(userData.getFirstName(), userData.getLastName(),
                                userData.getPassword(), userData.getEmail());
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser); // 201 Created
    }

    // Endpoint to get all users
    @GetMapping("")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Endpoint to get a user by ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable(value = "id") int userId) {
        return userRepository.findById(userId).orElse(null);
    }

    // Endpoint to add a new user
    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addUser(@RequestBody UserDTO userData) {
        User newUser = new User(userData.getName(), userData.getEmail(), userData.getPassword());
        userRepository.save(newUser);
        return ResponseEntity<>(newUser, HttpStatus.CREATED); // 201 Created
    }

    // Endpoint to update an existing user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable(value = "id") int userId, @RequestBody User user) {
        user.setId(userId);
        return userRepository.save(user);
    }

    // Endpoint to delete a user by ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable(value = "id") int id) {
        userRepository.findById(id).ifPresent(currUser -> userRepository.deleteById(id));
    }
}
