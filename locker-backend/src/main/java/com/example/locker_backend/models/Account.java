package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    private int userId;

//    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
//    private List<UserAccountRelationship> userRoles = new ArrayList<>();

    @OneToMany(mappedBy="account", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<UserAccountRelationship> adminUsers = new ArrayList<>();

    @OneToMany(mappedBy="account", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<UserAccountRelationship> readOnlyUsers = new ArrayList<>();

    @OneToMany(mappedBy="account", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Locker> lockers = new ArrayList<>();

    @OneToMany(mappedBy="account", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Container> containers = new ArrayList<>();

    @OneToMany(mappedBy="account", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Item> items = new ArrayList<>();

    public Account(int userId) {
        this.userId = userId;
    }

//    public Account(int id, User creator) {
//        this.id = id;
//        this.creator = creator;
//    }

    public int getId() {
        return id;
    }

//    public void setId(int id) {
//        this.id = id;
//    }

    public int getUserId() {
        return userId;
    }

    public void addLocker(Locker locker) {
        lockers.add(locker);
        locker.setAccount(this);
    }

    public void addContainer(Container container) {
        containers.add(container);
        container.setAccount(this);
    }

    public void addItem(Item item) {
        items.add(item);
        item.setAccount(this);
    }

    public List<Locker> getLockers() {
        return lockers;
    }

    public List<Container> getContainers() {
        return containers;
    }

    public List<Item> getItems() {
        return items;
    }

    public void addAdminUser(UserAccountRelationship userAccountRelationship) {
        userAccountRelationship.setAccount(this);
//        which add will work?
        adminUsers.add(userAccountRelationship);
//        this.adminUsers.add(userAccountRelationship);

    }

    public void addReadOnlyUser(User user) {
    }

//    public HashMap<User, Boolean> getUsers() {
//        return users;
//    }

//    public void addUser(User user, boolean isAdmin) {
//        users.put(user, isAdmin);
//    }
}
