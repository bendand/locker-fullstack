package com.example.locker_backend.controllers;

import com.example.locker_backend.models.Container;
import com.example.locker_backend.models.Locker;
import com.example.locker_backend.repositories.ContainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/{userId}/{lockerId}/containers")
public class ContainerController {

    @Autowired
    ContainerRepository containerRepository;

    // GET the full list of containers for a specific locker
    // Endpoint is http://localhost:8080/{accountId}/{lockerId}/containers
    @GetMapping(value="", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllContainersByLockerId(@PathVariable(value="accountId") Long accountId, @PathVariable(value="lockerId") int lockerId) {
        List<Container> allLockersContainers = containerRepository.findAllById(Collections.singleton(lockerId));
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
//    @PostMapping("/add")
//    public ResponseEntity<?> createNewContainer(@RequestParam(value="name") String name, @RequestParam(value="lockerId") int lockerId) {
//        Container newContainer = new Container(name, lockerId);
//        containerRepository.save(newContainer);
//        return new ResponseEntity<>(newContainer, HttpStatus.CREATED); // 201
//    }


    // DELETE an existing container
    // Corresponds to http://localhost:8080/{userId}/{lockerId}/containers/delete/{containerId}
    @DeleteMapping(value="/delete/{containerId}", produces=MediaType.APPLICATION_JSON_VALUE)
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
    @PutMapping(value="/update/{containerId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateContainer(@PathVariable(value="containerId") int containerId, @RequestBody Container updatedContainer) {
        Container currentContainer = containerRepository.findById(containerId).orElse(null);
        if (currentContainer != null) {
            updatedContainer.setId(containerId); // Ensure the ID is set correctly
            containerRepository.save(updatedContainer);
            return new ResponseEntity<>(updatedContainer, HttpStatus.OK); // 200
        } else {
            String response = "Container with ID of " + containerId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }
}
