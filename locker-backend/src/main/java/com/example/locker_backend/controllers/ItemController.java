package com.example.locker_backend.controllers;

import com.example.locker_backend.models.Container;
import com.example.locker_backend.models.Item;
import com.example.locker_backend.repositories.ContainerRepository;
import com.example.locker_backend.repositories.ItemRepository;
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
    ItemRepository itemRepository;

    // GET the full list of items in a specific container
    // Endpoint is http://localhost:8080/{accountId}/{lockerId}/{containerId}/items
    @GetMapping(value="", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllItemsByContainerId(@PathVariable(value="accountId") int accountId, @PathVariable(value="lockerId") int lockerId, @PathVariable(value="containerId") int containerId) {
        List<Item> allContainersItems = itemRepository.findAllById(Collections.singleton(containerId));
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
//    @PostMapping("/add")
//    public ResponseEntity<?> createNewItem(@RequestParam(value="name") String name,
//                                           @RequestParam(value="containerId") int containerId,
//                                           @RequestParam(value="lockerId") int lockerId,
//                                           @RequestParam(value="userId") int userId) {
//        // Validate that the containerId, lockerId, and userId are valid
//        if (containerId <= 0 || lockerId <= 0 || userId <= 0) {
//            String response = "Invalid containerId, lockerId, or userId.";
//            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.BAD_REQUEST); // 400
//        }
//        // Create a new item and save it to the repository
//        Item newItem = new Item(name, containerId, lockerId, userId);
//        itemRepository.save(newItem);
//        return new ResponseEntity<>(newItem, HttpStatus.CREATED); // 201
//    }


    // DELETE an existing item
    // Corresponds to http://localhost:8080/{userId}/{lockerId}/{containerId}/items/delete/{itemId}
    @DeleteMapping(value="/delete/{itemId}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteItem(@PathVariable(value="containerId") int containerId,
                                             @PathVariable(value="userId") int userId,
                                             @PathVariable(value="lockerId") int lockerId,
                                             @PathVariable(value="itemId") int itemId) {
        // Validate that the containerId, lockerId, and userId are valid
        if (containerId <= 0 || lockerId <= 0 || userId <= 0) {
            String response = "Invalid containerId, lockerId, or userId.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.BAD_REQUEST); // 400
        }

        Item currentItem = itemRepository.findById(containerId).orElse(null);
        if (currentItem != null) {
            itemRepository.deleteById(itemId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        } else {
            String response = "Item with ID of " + itemId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }


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
