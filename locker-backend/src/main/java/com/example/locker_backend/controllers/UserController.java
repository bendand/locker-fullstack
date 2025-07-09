package com.example.locker_backend.controllers;

import com.example.locker_backend.models.User;
import com.example.locker_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    // Autowired UserRepository to handle user data operations
    @Autowired
    private UserRepository userRepository;

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
    @PostMapping("")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
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
