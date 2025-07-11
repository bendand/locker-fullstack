package com.example.locker_backend.models.dto;

public class LockerDTO {
    private String lockerId;
    private String location;
    private boolean isAvailable;

    public LockerDTO() {
    }

    public LockerDTO(String lockerId, String location, boolean isAvailable) {
        this.lockerId = lockerId;
        this.location = location;
        this.isAvailable = isAvailable;
    }

    public String getLockerId() {
        return lockerId;
    }

    public void setLockerId(String lockerId) {
        this.lockerId = lockerId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }
}
