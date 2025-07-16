package com.example.locker_backend.models.dto;


import com.example.locker_backend.models.Container;
import com.example.locker_backend.models.Locker;
import com.example.locker_backend.models.User;
import org.hibernate.type.descriptor.jdbc.VarcharJdbcType;

public class ItemDTO {
    private int itemId;
    private String name;
    private VarcharJdbcType description;
    private int quantity;
    private Locker locker;
    private Container container;
    private User user;

    public ItemDTO() {
    }

    public ItemDTO(int itemId, String name, VarcharJdbcType description,
                   int quantity, Locker locker,
                   Container container, User user) {
        this.itemId = itemId;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.locker = locker;
        this.container = container;
        this.user = user;
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

    public Locker getLocker() {
        return locker;
    }

    public void setLocker(Locker locker) {
        this.locker = locker;
    }

    public Container getContainer() {
        return container;
    }

    public void setContainer(Container container) {
        this.container = container;
    }

    public VarcharJdbcType getDescription() {
        return description;
    }

    public void setDescription(VarcharJdbcType description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
