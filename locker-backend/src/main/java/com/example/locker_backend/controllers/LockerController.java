package com.example.locker_backend.controllers;


import com.example.locker_backend.models.Locker;
import com.example.locker_backend.repositories.LockerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/{userId}/lockers")
public class LockerController {

    @Autowired
    LockerRepository lockerRepository;

    // GET the full list of lockers for a specific user
    // Endpoint is http://localhost:8080/{userId}/lockers
    @GetMapping(value="", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllLockersByUserId(@PathVariable(value="userId") int userId) {
        List<Locker> allLockers = lockerRepository.findAllById(userId);
        return new ResponseEntity<>(allLockers, HttpStatus.OK); // 200
    }


    // GET a single locker using its id
    // Corresponds to http://localhost:8080/{userId}/lockers/{lockerId}
    @GetMapping(value="/{lockerId}", produces=MediaType.APPLICATION_JSON_VALUE)
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
    // Endpoint http://localhost:8080//{userId}/lockers/add
    @PostMapping("/add")
    public ResponseEntity<?> createNewLocker(@RequestParam(value="name") String name, @RequestParam(value="userId") int userId) {
        Locker newLocker = new Locker(name, userId);
        lockerRepository.save(newLocker);
        return new ResponseEntity<>(newLocker, HttpStatus.CREATED); // 201
    }


    // DELETE an existing locker
    // Corresponds to http://localhost:8080/{userId}/lockers/delete/6 (for example)
    @DeleteMapping(value="/delete/{lockerId}", produces=MediaType.APPLICATION_JSON_VALUE)
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
    @PutMapping(value="/update/{lockerId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateLocker(@PathVariable(value="lockerId") int lockerId, @RequestBody Locker updatedLocker) {
        Locker currentLocker = lockerRepository.findById(lockerId).orElse(null);
        if (currentLocker != null) {
            updatedLocker.setId(lockerId); // Ensure the ID is set correctly
            lockerRepository.save(updatedLocker);
            return new ResponseEntity<>(updatedLocker, HttpStatus.OK); // 200
        } else {
            String response = "Locker with ID of " + lockerId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }

}
