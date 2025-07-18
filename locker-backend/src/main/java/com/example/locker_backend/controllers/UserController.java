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
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.List;
import com.example.locker_backend.services.CustomUserDetailsService;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;


@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody UserDTO userData) {
        // Check if user exists in the database
        User user = userRepository.findByEmail(userData.getEmail());
        if (user == null) {
            System.out.println("User not found with this email: " + userData.getEmail());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with this email");
        }

        // Hashing password using Pbkdf2PasswordEncoder
        Pbkdf2PasswordEncoder encoder = Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8();

        // Check if the provided password matches the stored password
        if (!encoder.matches(userData.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // If the user exists and the password matches, return a success response
        return ResponseEntity.ok("Login successful"); // 200 OK
    }

    //  Endpoint to register a new user
    @PostMapping(value="/register", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userData) {
        if (userRepository.existsByEmail(userData.getEmail())) {
            System.out.println("User exists with this email: " + userData.getEmail());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User exists with this email");
        }

        // hashing password using Pbkdf2PasswordEncoder before storing it
        Pbkdf2PasswordEncoder encoder = Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8();
        String hashedPassword = encoder.encode(userData.getPassword());

        User newUser = new User(userData.getFirstName(), userData.getLastName(),
                                userData.getEmail(), hashedPassword);

        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser); // 201 Created
    }


    // Endpoint to update an existing user
    @PutMapping("/users/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable(value = "userId") int userId, @RequestBody UserDTO newUserData) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Update user details
        existingUser.setFirstName(newUserData.getFirstName());
        existingUser.setLastName(newUserData.getLastName());
        existingUser.setEmail(newUserData.getEmail());
        existingUser.setPassword(newUserData.getPassword());

        userRepository.save(existingUser);

        return ResponseEntity.ok(existingUser); // 200 OK
    }

    // Endpoint to delete a user by ID
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "userId") int userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found"); // 404 Not Found
        }

        return ResponseEntity.ok().body("User with ID " + userId + " deleted successfully"); // 200 OK
    }

    // Endpoint to get all users
    @GetMapping("/users/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return new ResponseEntity<>(allUsers, HttpStatus.OK); // 200 OK
    }

    // Endpoint to get a user by ID
    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable(value = "userId") int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        return ResponseEntity.ok(user); // 200 OK
    }
}
