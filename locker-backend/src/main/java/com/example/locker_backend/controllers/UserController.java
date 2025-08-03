package com.example.locker_backend.controllers;

import com.example.locker_backend.models.Item;
import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.UserDTO;
import com.example.locker_backend.repositories.UserRepository;
import com.example.locker_backend.repositories.ItemRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    @PostMapping("/logout")
//    public void logOut(HttpServletRequest request) {
//        String jwtToken = extractJwtTokenFromRequest(request);
//        if (jwtToken != null) {
//            tokenBlacklistService.addTokenToBlacklist(jwtToken);
//        }
//    }

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

    // Endpoint to get a user by ID and return necessary info for profile card
    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable(value = "userId") int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));


        int numUserLockers = user.getLockers().size();
        int totalItems = 0;
        for (Locker locker : user.getLockers()) {
            totalItems += locker.getTotalItems();
        }

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("userData", user);
        result.put("numUserLockers", numUserLockers);
        result.put("totalItems", totalItems);

        return ResponseEntity.ok(result); // 200 OK
    }

    // GET the full list of items for a user
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
        System.out.println("get item info by id endpoint hit");
        Item currentItem = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with ID: " + itemId));

        Map<String, Object> result = new HashMap<String, Object>();

        result.put("lockerId", currentItem.getLocker().getId());
        result.put("lockerName", currentItem.getLocker().getName());
        result.put("containerId", currentItem.getContainer().getId());
        result.put("containerName", currentItem.getContainer().getName());

        return ResponseEntity.ok(result); // 200 OK
    }
}
