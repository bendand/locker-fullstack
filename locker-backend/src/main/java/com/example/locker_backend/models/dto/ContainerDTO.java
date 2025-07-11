package com.example.locker_backend.models.dto;

public class ContainerDTO {
    private String containerId;
    private String lockerId;
    private String itemId;
    private String userId;

    public ContainerDTO() {
    }

    public ContainerDTO(String containerId, String lockerId, String itemId, String userId) {
        this.containerId = containerId;
        this.lockerId = lockerId;
        this.itemId = itemId;
        this.userId = userId;
    }

    public String getContainerId() {
        return containerId;
    }

    public void setContainerId(String containerId) {
        this.containerId = containerId;
    }

    public String getLockerId() {
        return lockerId;
    }

    public void setLockerId(String lockerId) {
        this.lockerId = lockerId;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
