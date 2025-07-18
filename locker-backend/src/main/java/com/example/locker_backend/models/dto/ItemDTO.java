package com.example.locker_backend.models.dto;


import com.example.locker_backend.models.Container;
import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;
import org.hibernate.type.descriptor.jdbc.VarcharJdbcType;

public class ItemDTO {
    private int itemId;
    private String name;
    private String description;
    private int quantity = 1;
    private int lockerId;
    private int containerId;
    private int userId;

    public ItemDTO (int itemId, String name, String description, int quantity, int lockerId, int containerId, int userId) {
        this.itemId = itemId;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.lockerId = lockerId;
        this.containerId = containerId;
        this.userId = userId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLockerId() {
        return lockerId;
    }

    public void setLockerId(int lockerId) {
        this.lockerId = lockerId;
    }

    public int getContainerId() {
        return containerId;
    }

    public void setContainerId(int containerId) {
        this.containerId = containerId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
