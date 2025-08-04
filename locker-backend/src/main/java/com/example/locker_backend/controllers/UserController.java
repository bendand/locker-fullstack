package com.example.locker_backend.controllers;

import com.example.locker_backend.models.Item;
import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.UserDTO;
import com.example.locker_backend.repositories.UserRepository;
import com.example.locker_backend.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    // endpoint to login existing user
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody UserDTO userData) {
        // Check if user already exists in the database
        User user = userRepository.findByEmail(userData.getEmail());

        // Hashing password using Pbkdf2PasswordEncoder
        Pbkdf2PasswordEncoder encoder = Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8();

        // if user doesn't exist or passwords don't match, return generic 'invalid' message
        if (user == null || !encoder.matches(userData.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid credentials");
        } else {
            // If the user exists and the password matches, return a success response
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
    }

    //  Endpoint to register a new user
    @PostMapping(value="/register", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userData) {
        // if user exists
        if (userRepository.existsByEmail(userData.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User exists with this email");
        }

        // hashing password using Pbkdf2PasswordEncoder before storing it
        Pbkdf2PasswordEncoder encoder = Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8();
        String hashedPassword = encoder.encode(userData.getPassword());

        // create new user instance, save user, and return 201 status with newUser
        User newUser = new User(userData.getFirstName(), userData.getLastName(),
                                userData.getEmail(), hashedPassword);

        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    // Endpoint to update an existing user, this endpoint is correct I believe though I don't use it in my app yet
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
        return ResponseEntity.ok(existingUser);
    }

    // Endpoint to delete a user by ID, this endpoint is correct I believe though I don't use it in my app yet
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "userId") int userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + userId + " not found"); // 404 Not Found
        }

        return ResponseEntity.ok().body("User with ID " + userId + " deleted successfully"); // 200 OK
    }

    // Endpoint to get a user by ID and return necessary info for profile card
    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable(value = "userId") int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));


        // gets locker number with builtin method and item number using some class methods
        int numUserLockers = user.getLockers().size();
        int totalItems = 0;
        for (Locker locker : user.getLockers()) {
            totalItems += locker.getTotalItems();
        }

        // creates a hashmap to store key value pairs for json returned
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("userData", user);
        result.put("numUserLockers", numUserLockers);
        result.put("totalItems", totalItems);

        return ResponseEntity.ok(result);
    }

    // GET the full list of items for a user, used for search item function
    // Endpoint is http://localhost:8080/{userId}/items
    @GetMapping(value = "/{userId}/items", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllItemsByUserId(@PathVariable(value = "userId") int userId) {
        if (userId <= 0) {
            String response = "Invalid userId.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.BAD_REQUEST);
        }

        List<Item> allUsersItems = itemRepository.findAllByUserId(userId);
        if (allUsersItems.isEmpty()) {
            String response = "No items found for user with ID of " + userId + ".";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(allUsersItems, HttpStatus.OK);
    }

    // GET all information about an item using itemId
    // Endpoint is http://localhost:8080/items/{itemId}
    @GetMapping(value = "/items/{itemId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getItemInfoById(@PathVariable(value = "itemId") int itemId) {
        Item currentItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with ID: " + itemId));

        // hashmap to store comprehensive data about item, this is used to route the user to the item they're looking for
        // more sensible controller/route planning and mapping needs to be implemented for a couple of the last endpoints for better cohesion
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("lockerId", currentItem.getLocker().getId());
        result.put("lockerName", currentItem.getLocker().getName());
        result.put("containerId", currentItem.getContainer().getId());
        result.put("containerName", currentItem.getContainer().getName());

        return ResponseEntity.ok(result);
    }
}
