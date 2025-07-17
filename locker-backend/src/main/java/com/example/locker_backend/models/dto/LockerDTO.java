package com.example.locker_backend.models.dto;

public class LockerDTO {
    private int lockerId;
    private String name;
    private String location;
    private int userId;

    public LockerDTO() {
    }

    public LockerDTO(int lockerId, String name, String location, int userId) {
        this.lockerId = lockerId;
        this.name = name;
        this.location = location;
        this.userId = userId;
    }

    public int getLockerId() { return lockerId;}

    public void setLockerId(int lockerId) { this.lockerId = lockerId;}

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location;}

    public String getName() { return name;}

    public void setName(String name) { this.name = name; }

    public int getUserId() { return userId; }

    public void setUserId(int userId) { this.userId = userId; }
}
