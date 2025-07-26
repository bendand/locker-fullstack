package com.example.locker_backend.controllers;

import com.example.locker_backend.models.Container;
import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.ContainerDTO;
import com.example.locker_backend.repositories.ContainerRepository;
import com.example.locker_backend.repositories.LockerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping("/{userId}/{lockerId}/containers")
public class ContainerController {

    @Autowired
    ContainerRepository containerRepository;

    @Autowired
    LockerRepository lockerRepository;

    // GET the full list of containers for a specific locker
    // Endpoint is http://localhost:8080/{userId}/{lockerId}/containers
    @GetMapping(value="", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllContainersByLockerId(@PathVariable(value="lockerId") int lockerId) {
        List<Container> allLockersContainers = containerRepository.findAllByLockerId(lockerId);
        if (allLockersContainers.isEmpty()) {
            String response = "No containers found for locker with locker ID of " + lockerId + ".";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }

        return new ResponseEntity<>(allLockersContainers, HttpStatus.OK); // 200
    }


    // GET a single container using its id
    // Corresponds to http://localhost:8080/{userId}/{lockerId}/containers/{containerId}
    @GetMapping(value="/{containerId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getContainerById(@PathVariable(value="containerId") int containerId) {
        Container currentContainer = containerRepository.findById(containerId).orElse(null);
        if (currentContainer != null) {
            return new ResponseEntity<>(currentContainer, HttpStatus.OK); // 200
        } else {
            String response = "Container with ID of " + containerId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }


    // POST a new container
    // Endpoint http://localhost:8080/{userId}/{lockerId}/containers/add
    @PostMapping("/add")
    public ResponseEntity<?> addContainer(@RequestBody ContainerDTO containerData) {
        if (containerData.getLockerId() <= 0 || containerData.getUserId() <= 0) {
            String response = "Invalid lockerId or userId.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.BAD_REQUEST); // 400
        }

        Locker locker = lockerRepository.findById(containerData.getLockerId()).orElse(null);
        User user = locker != null ? locker.getUser() : null;

        // Create a new container and save it to the repository
        Container newContainer = new Container(containerData.getName(), containerData.getDescription(), user, locker);
        containerRepository.save(newContainer);

        // Add the new container to the locker
        return new ResponseEntity<>(newContainer, HttpStatus.CREATED); // 201
    }


    // DELETE an existing container
    // Corresponds to http://localhost:8080/{userId}/{lockerId}/containers/{containerId}
    @DeleteMapping(value="/{containerId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteContainer(@PathVariable(value="containerId") int containerId, @PathVariable(value="userId") int userId) {
        Container currentContainer = containerRepository.findById(containerId).orElse(null);
        if (currentContainer != null) {
            containerRepository.deleteById(containerId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        } else {
            String response = "Container with ID of " + containerId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }


    // PUT to update an existing container
    // Corresponds to http://localhost:8080/{userId}/{lockerId}/containers/update/{containerId}
    @PutMapping(value="/{containerId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateContainer(@PathVariable(value="containerId") int containerId, @RequestBody ContainerDTO updatedContainer) {
        Container currentContainer = containerRepository.findById(containerId).orElse(null);
        if (currentContainer != null) {
            currentContainer.setName(updatedContainer.getName());
            currentContainer.setDescription(updatedContainer.getDescription());

            // Save the updated container
            containerRepository.save(currentContainer);
            return new ResponseEntity<>(currentContainer, HttpStatus.OK); // 200
        } else {
            String response = "Container with ID of " + containerId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }

    }
}
