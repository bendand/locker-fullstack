package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Container {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String description = "";

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Item> items = new ArrayList<>();

    @ManyToOne
    @JsonBackReference
    private User user;

    @ManyToOne
    @JsonBackReference
    private Locker locker;

    public Container() {
    }

    public Container(String name, String description, User user, Locker locker) {
        this.name = name;
        this.description = description;
        this.user = user;
        this.locker = locker;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setLocker(Locker locker) {
        this.locker = locker;
    }

    public Locker getLocker() {
        return locker;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return name + " - (Locker: " + locker;
    }

    public String getDescription() {
        return description;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Item> getItems() {
        return items;
    }
}
