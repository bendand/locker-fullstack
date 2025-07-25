package com.example.locker_backend.controllers;


import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.LockerDTO;
import com.example.locker_backend.repositories.LockerRepository;
import com.example.locker_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping("/{userId}/lockers")
public class LockerController {

    @Autowired
    LockerRepository lockerRepository;

    @Autowired
    UserRepository userRepository;

    // GET the full list of lockers for a specific user
    // Endpoint is http://localhost:8080/{userId}/lockers
    @GetMapping(value="", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllLockersByUserId(@PathVariable(value="userId") int userId) {
        System.out.println("get user lockers endpoint hit");
        System.out.println("user id: " + userId);
        List<Locker> allUsersLockers = lockerRepository.findAllByUserId(userId);
        System.out.println("all users lockers: " + allUsersLockers);
        if (allUsersLockers.isEmpty()) {
            String response = "No lockers found for user with ID of " + userId + ".";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }

        return new ResponseEntity<>(allUsersLockers, HttpStatus.OK); // 200
    }


    // GET a single locker using its id
    // Corresponds to http://localhost:8080/{userId}/lockers/{lockerId}
    @GetMapping(value="{lockerId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getLockerById(@PathVariable(value="lockerId") int lockerId) {
        Locker currentLocker = lockerRepository.findById(lockerId).orElse(null);
        if (currentLocker != null) {
            return new ResponseEntity<>(currentLocker, HttpStatus.OK); // 200
        } else {
            String response = "Locker with ID of " + lockerId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }


    // POST a new locker
    // Endpoint http://localhost:8080/{userId}/lockers/add
    @PostMapping("/add")
    public ResponseEntity<?> addLocker(@PathVariable(value="userId") int userId, @RequestBody LockerDTO lockerData) {
        System.out.println("locker name: " + lockerData.getName());
        System.out.println("locker address: " + lockerData.getAddress());
        System.out.println("locker details: " + lockerData.getDetails());

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            String response = "User with ID of " + userId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }

        Locker newLocker = new Locker(lockerData.getName(), user, lockerData.getAddress(), lockerData.getDetails());
        System.out.println(newLocker);
//        lockerRepository.save(newLocker);

        return new ResponseEntity<>(newLocker, HttpStatus.CREATED); // 201
    }


    // DELETE an existing locker
    // Corresponds to http://localhost:8080/{userId}/lockers/{lockerId}
    @DeleteMapping(value="/{lockerId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteLocker(@PathVariable(value="lockerId") int lockerId, @PathVariable(value="userId") int userId) {
        Locker currentLocker = lockerRepository.findById(lockerId).orElse(null);
        if (currentLocker != null) {
            lockerRepository.deleteById(lockerId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        } else {
            String response = "Locker with ID of " + lockerId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }

    // PUT to update an existing locker
    // Corresponds to http://localhost:8080/{userId}/lockers/update/{lockerId}
    @PutMapping(value="/{lockerId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateLocker(@PathVariable(value="lockerId") int lockerId, @PathVariable(value="userId") int userId, @RequestBody LockerDTO updatedLockerData) {
        Locker currentLocker = lockerRepository.findById(lockerId).orElse(null);
        if (currentLocker != null) {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                String response = "User with ID of " + userId + " not found.";
                return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
            }

            currentLocker.setName(updatedLockerData.getName());
            currentLocker.setAddress(updatedLockerData.getAddress());
            lockerRepository.save(currentLocker);

            return new ResponseEntity<>(currentLocker, HttpStatus.OK); // 200
        } else {
            String response = "Locker with ID of " + lockerId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }
}
