package com.example.locker_backend.exceptions;

public class ItemExistsException extends RuntimeException{

    public ItemExistsException(String message) {
        super(message);
    }
}