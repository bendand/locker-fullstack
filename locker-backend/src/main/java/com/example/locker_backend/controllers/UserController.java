package com.example.locker_backend.controllers;

import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.UserDTO;
import com.example.locker_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.locker_backend.services.CustomUserDetailsService;


@RestController
@CrossOrigin(maxAge = 3600)
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
        // Hashing password using Pbkdf2PasswordEncoder
        Pbkdf2PasswordEncoder encoder = Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8();

        if (user == null || !encoder.matches(userData.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid credentials"); // 401 Unauthorized
        } else {
            // If the password matches, set the user details in the custom user details service
            // customUserDetailsService.setUserDetails(user);
            // If the user exists and the password matches, return a success response
            return ResponseEntity.status(HttpStatus.OK).body(user); // 200 OK
        }
    }

    //  Endpoint to register a new user
    @PostMapping(value="/register", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userData) {
        if (userRepository.existsByEmail(userData.getEmail())) {
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

        // hashing password using Pbkdf2PasswordEncoder before storing it
        Pbkdf2PasswordEncoder encoder = Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8();
        String hashedPassword = encoder.encode(newUserData.getPassword());

        // Update user details
        existingUser.setFirstName(newUserData.getFirstName());
        existingUser.setLastName(newUserData.getLastName());
        existingUser.setEmail(newUserData.getEmail());
        existingUser.setPassword(hashedPassword);

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
        System.out.println("get user by id endpoint hit");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        System.out.println("user fetched: " + user);
        return ResponseEntity.ok(user); // 200 OK
    }
}
