package com.example.locker_backend.controllers;

import com.example.locker_backend.models.Container;
import com.example.locker_backend.models.Item;
import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.ItemDTO;
import com.example.locker_backend.repositories.ContainerRepository;
import com.example.locker_backend.repositories.ItemRepository;
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
@RequestMapping("/{userId}/{lockerId}/{containerId}/items")
public class ItemController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    LockerRepository lockerRepository;

    @Autowired
    ContainerRepository containerRepository;

    @Autowired
    ItemRepository itemRepository;


    // GET the full list of items in a specific container
    // Endpoint is http://localhost:8080/{userId}/{lockerId}/{containerId}/items
    @GetMapping(value="", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllItemsByContainerId(@PathVariable(value="userId") int userId, @PathVariable(value="lockerId") int lockerId, @PathVariable(value="containerId") int containerId) {
        if (containerId <= 0 || lockerId <= 0 || userId <= 0) {
            String response = "Invalid containerId, lockerId, or userId.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.BAD_REQUEST); // 400
        }

        List<Item> allContainersItems = itemRepository.findAllByContainerId(containerId);
        if (allContainersItems.isEmpty()) {
            String response = "No items found for container with ID of " + containerId + ".";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }

        return new ResponseEntity<>(allContainersItems, HttpStatus.OK); // 200
    }


    // GET a single item using its id
    // Corresponds to http://localhost:8080/{userId}/{lockerId}/{containerId}/items/{itemId}
    @GetMapping(value="/{itemId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getItemById(@PathVariable(value="itemId") int itemId) {
        Item currentItem = itemRepository.findById(itemId).orElse(null);
        if (currentItem != null) {
            return new ResponseEntity<>(currentItem, HttpStatus.OK); // 200
        } else {
            String response = "Item with ID of " + itemId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }

    // POST a new item
    // Endpoint http://localhost:8080/{userId}/{lockerId}/{containerId}/items/add
    @PostMapping(value="/add", consumes=MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addItem(@RequestBody ItemDTO itemData) {
        // Validate that the containerId, lockerId, and userId are valid
        if (itemData.getContainerId() <= 0 || itemData.getLockerId() <= 0 || itemData.getUserId() <= 0) {
            String response = "Invalid containerId, lockerId, or userId.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.BAD_REQUEST); // 400
        }

        // Check if the container exists
        User currentUser = userRepository.findById(itemData.getUserId()).orElse(null);
        Locker currentLocker = lockerRepository.findById(itemData.getLockerId()).orElse(null);
        Container currentContainer = containerRepository.findById(itemData.getContainerId()).orElse(null);

        if (currentUser == null || currentLocker == null || currentContainer == null) {
            String response = "Invalid userId, lockerId, or containerId.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }

        // Create a new item and save it to the repository
        Item newItem = new Item(itemData.getName(), itemData.getQuantity(), currentUser,
                                currentLocker, currentContainer);

        System.out.println(newItem);
        itemRepository.save(newItem);

        currentUser.addItem(newItem);
        currentLocker.addItem(newItem);
        currentContainer.addItem(newItem);
        containerRepository.save(currentContainer);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED); // 201

    }
    // DELETE an existing item
    // Corresponds to http://localhost:8080/{userId}/{lockerId}/{containerId}/items/{itemId}



    // PUT to update an existing item
    // Corresponds to http://localhost:8080/{userId}/{lockerId}/{containerId}/items/update/{itemId}
    @PutMapping(value="/update/{itemId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateItem(@PathVariable(value="itemId") int itemId,
                                        @PathVariable(value="lockerId") int lockerId,
                                        @PathVariable(value="userId") int userId,
                                        @PathVariable(value="containerId") int containerId,
                                        @RequestBody Item updatedItem) {
        // Validate that the containerId, lockerId, and userId are valid
        if (containerId <= 0 || lockerId <= 0 || userId <= 0) {
            String response = "Invalid containerId, lockerId, or userId.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.BAD_REQUEST); // 400
        }

        Item currentItem = itemRepository.findById(itemId).orElse(null);
        if (currentItem != null) {
            updatedItem.setItemId(itemId); // Ensure the ID is set correctly
            itemRepository.save(updatedItem);
            return new ResponseEntity<>(updatedItem, HttpStatus.OK); // 200
        } else {
            String response = "Item with ID of " + itemId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }

}
