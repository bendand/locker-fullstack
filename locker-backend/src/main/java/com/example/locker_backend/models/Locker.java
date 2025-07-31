package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Locker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JsonManagedReference
    private User user;

    @Column(name="address")
    private String address;

    @Column(name="name")
    private String name;

    @Column(name="details")
    private String details;

    @OneToMany(mappedBy="locker", cascade = CascadeType.ALL)
    @JsonManagedReference
    private final List<Container> containers = new ArrayList<>();

    @OneToMany(mappedBy="locker", cascade = CascadeType.ALL)
    @JsonManagedReference
    private final List<Item> items = new ArrayList<>();


    public Locker() {
    }

    public Locker(User user) {
        this.user = user;
    }

    public Locker(String name, User user, String address, String details) {
        this.name = name;
        this.user = user;
        this.address = address;
        this.details = details;
    }


    public User getUser() { return user; }

    public void setUser(User user) { this.user = user;}

    public String getName() {
        return name;
    }

    public void setName(String name) { this.name = name; }

//    public void setId(int lockerId) { this.id = lockerId; }

    public int getId() { return id; }

    public List<Container> getContainers() { return containers; }

    public void addContainer(Container container) {
        containers.add(container);
        container.setLocker(this); // Ensure the container knows its locker
    }

    public void addItem(Item newItem) {
        items.add(newItem);
        newItem.setLocker(this); // Ensure the item knows its locker
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTotalItems() {
        int totalItems = 0;
        for (Item item : items) {
            totalItems += item.getQuantity();
        }

        return totalItems;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return name + " (User: " + user + ")";
    }
}
