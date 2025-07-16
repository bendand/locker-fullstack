package com.example.locker_backend.controllers;

import com.example.locker_backend.models.Account;
import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.AccountDTO;
import com.example.locker_backend.models.dto.UserDTO;
import com.example.locker_backend.repositories.AccountRepository;
import com.example.locker_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    // Autowired UserRepository to handle user data operations
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    // Endpoint to validate if a user exists by username
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody UserDTO userData) throws UsernameNotFoundException, InvalidKeySpecException, NoSuchAlgorithmException {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        KeySpec spec = new PBEKeySpec(userData.getPassword().toCharArray(), salt, 65536, 128);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] hashedPassword = factory.generateSecret(spec).getEncoded();
        System.out.println(Arrays.toString(hashedPassword));

        try {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userData.getUsername());
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

    // Endpoint to create an admin account for a user
    @PostMapping(value="/createAdmin", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createAdminAccount(@RequestBody AccountDTO accountData,
                                                @RequestParam(value = "userId") int userId) {
        Account newAccount = new Account(accountData.creatorId());
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));
        user.setHasCreatedAccount();

        accountRepository.save(newAccount);
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(newAccount); // 201 Created
    }

    @GetMapping(value="/findUserByEmail", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findUserByEmail(@RequestParam(value = "email") String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + email); // 404 Not Found
        }
    }

    @PutMapping(value="/addAccountToUser/{userId}", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addAccountToUser(@PathVariable(value = "userEmail") String userEmail,
                                              @RequestParam(value = "accountId") int accountId,
                                              @RequestParam (value = "accessType") String accessType) {

        User user = userRepository.findByEmail(userEmail);

        Account account = accountRepository.findById(accountId);

        if (accessType.equals("admin")) {
            user.addAdminAccount(account);
        } else if (accessType.equals("read-only")) {
            user.addReadOnlyAccount(account);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid access type");
        }

        accountRepository.save(account);
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(account); // 201 Created
    }


    // Endpoint to get a user by ID
//    @GetMapping("/{id}")
//    public User getUser(@PathVariable(value = "id") int userId) {
//        return userRepository.findById(userId).orElse(null);
//    }

    // Endpoint to add a new user
//    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> addUser(@RequestBody UserDTO userData) {
//        User newUser = new User(userData.getName(), userData.getEmail(), userData.getPassword());
//        userRepository.save(newUser);
//        return ResponseEntity<>(newUser, HttpStatus.CREATED); // 201 Created
//    }

    // Endpoint to update an existing user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable(value = "id") int userId, @RequestBody User user) {
        user.setId(userId);
        return userRepository.save(user);
    }

    // Endpoint to delete a user by ID
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable(value = "id") int id) {
//        userRepository.findById(id).ifPresent(currUser -> userRepository.deleteById(id));
//    }
}
