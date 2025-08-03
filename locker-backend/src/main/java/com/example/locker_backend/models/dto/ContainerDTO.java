package com.example.locker_backend.models.dto;

public class ContainerDTO {
    private int lockerId;
    private int userId;
    private String name;
    private String description;

    public ContainerDTO(int lockerId, int userId, String name, String description) {
        this.lockerId = lockerId;
        this.userId = userId;
        this.name = name;
        this.description = description;
    }

    public int getLockerId() {
        return lockerId;
    }

    public void setLockerId(int lockerId) {
        this.lockerId = lockerId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
