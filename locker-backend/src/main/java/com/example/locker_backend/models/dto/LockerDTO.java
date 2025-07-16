package com.example.locker_backend.models.dto;

import com.example.locker_backend.models.User;

public class LockerDTO {
    private int lockerId;
    private String name;
    private String location;
    private User user;

    public LockerDTO() {
    }

    public LockerDTO(int lockerId, String name, String location, User user) {
        this.lockerId = lockerId;
        this.name = name;
        this.location = location;
        this.user = user;
    }

    public int getLockerId() { return lockerId;}

    public void setLockerId(int lockerId) { this.lockerId = lockerId;}

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location;}

    public String getName() { return name;}

    public void setName(String name) { this.name = name; }

    public User getAccount() { return user; }

    public void setUser(User user) { this.user = user; }
}
