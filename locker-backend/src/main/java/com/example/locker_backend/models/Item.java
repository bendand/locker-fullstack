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

    @ManyToOne
    @JsonBackReference
    private Locker locker;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private int quantity = 1;

    public Item() {
    }

    public Item(String name, int quantity, User user, Locker locker, Container container) {
        this.name = name;
        this.quantity = quantity;
        this.user = user;
        this.locker = locker;
        this.container = container;
    }

    public Item(int id, String name, int quantity, User user, Locker locker, Container container) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.user = user;
        this.locker = locker;
        this.container = container;
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

    public int getItemId() {
        return id;
    }

    public void setItemId(int itemId) {
        this.id = itemId;
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
}
