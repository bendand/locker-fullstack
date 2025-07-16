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

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private int quantity = 1;

    public Item() {
    }

    public Item(User user, Container container, String name, int quantity) {
        this.user = user;
        this.name = name;
        this.container = container;
        this.quantity = quantity;
    }

    public Item(int id, User user, String name, Container container) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.container = container;
    }

    public Item(int id, User user, String name, Container container, int quantity) {
        this.quantity = quantity;
        this.id = id;
        this.user = user;
        this.name = name;
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
}
