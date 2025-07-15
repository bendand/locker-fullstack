package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private User createdBy;

//    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<User> adminUsers = new ArrayList<>();

//    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<User> readOnlyUsers = new ArrayList<>();

    public Account(User user) {
        this.createdBy = user;
    }

    public void addReadOnlyUser(User user) {
        readOnlyUsers.add(user);
        user.addReadOnlyAccount(this); // Set the account for the user
    }

    public void addAdminUser(User user) {
        adminUsers.add(user);
        user.addAdminAccount(this); // Set the account for the user
    }

    public User getCreatedBy() {
        return createdBy;
    }
}
