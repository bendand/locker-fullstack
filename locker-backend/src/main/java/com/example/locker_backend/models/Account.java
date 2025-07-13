package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private User adminUser;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<User> readOnlyUsers = new ArrayList<>();

    public Account(User adminUser) {
        this.adminUser = adminUser;
        adminUser.setAccount(this);
    }

    public void addReadOnlyUser(User user) {
        readOnlyUsers.add(user);
        user.addReadOnlyAccount(this); // Set the account for the user
    }

    public void setAdminUser(User user) {
        if (this.adminUser != null) {
            this.adminUser.setAccount(null); // Remove previous admin user from account
        }
        this.adminUser = user;
        user.setAccount(this); // Set the new admin user to this account
    }
}
