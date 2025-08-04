package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JsonBackReference
    private User user;

    @ManyToOne
    @JsonBackReference
    private Container container;

    private String description;

    @ManyToOne
    @JsonBackReference
    private Locker locker;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private int quantity = 1;

    public Item() {
    }

    public Item(String name, int quantity, String description, User user, Locker locker, Container container) {
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.user = user;
        this.locker = locker;
        this.container = container;
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

    public void setContainer(Container container) {
        this.container = container;
    }

    public Container getContainer() {
        return container;
    }

    public User getUser() {
        return user;
    }

    public Locker getLocker() {
        return locker;
    }

    public void setLocker(Locker locker) {
        this.locker = locker;
    }

    public void setUser(User currentUser) {
        this.user = currentUser;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return name + " - (Container: " + container;
    }
}
