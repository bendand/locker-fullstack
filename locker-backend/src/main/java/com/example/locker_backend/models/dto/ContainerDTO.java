package com.example.locker_backend.models.dto;

import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;

public class ContainerDTO {
    private int containerId;
    private Locker locker;
    private User user;

    public ContainerDTO() {
    }

    public ContainerDTO(int containerId, Locker locker, User user) {
        this.containerId = containerId;
        this.locker = locker;
        this.user = user;
    }

    public int getContainerId() {
        return containerId;
    }

    public void setContainerId(int containerId) {
        this.containerId = containerId;
    }

    public Locker getLocker() {
        return locker;
    }

    public void setLocker(Locker locker) {
        this.locker = locker;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
