package com.example.locker_backend.models.dto;

import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;

public class ContainerDTO {
    private int lockerId;
    private int userId;
    private String name;

    public ContainerDTO() {
    }

    public ContainerDTO(int lockerId, int userId, String name) {
        this.lockerId = lockerId;
        this.userId = userId;
        this.name = name;
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
}
