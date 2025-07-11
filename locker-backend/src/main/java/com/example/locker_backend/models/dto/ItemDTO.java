package com.example.locker_backend.models.dto;

public class ItemDTO {
    private String itemId;
    private String name;
    private String description;
    private String userId;

    public ItemDTO() {
    }

    public ItemDTO(String itemId, String name, String description, String userId) {
        this.itemId = itemId;
        this.name = name;
        this.description = description;
        this.userId = userId;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
