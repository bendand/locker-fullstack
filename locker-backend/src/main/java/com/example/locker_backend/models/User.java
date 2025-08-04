package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.sql.Timestamp;
import java.util.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="firstName")
    private String firstName;

    @Column(name="lastName")
    private String lastName;

    @Column(name="email", unique = true)
    private String email;

    @Column(name="username")
    private String username;

    @Column(length = 256, name="password")
    private String password;

    @Column(updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Locker> lockers = new ArrayList<>();

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Container> containers = new ArrayList<>();

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Item> items = new ArrayList<>();

    public User() {
        // Default constructor for JPA
    }

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = email.substring(0, email.indexOf('@'));
    }

    public void setFirstName(String firstName) { this.firstName = firstName;}

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public void setEmail(String email) {
        this.email = email;
        this.username = email.substring(0, email.indexOf('@'));
    }

    public List<Locker> getLockers() {
        return lockers;
    }

    @Override
    public String toString() {
        return firstName + " " + lastName + " - " + email;
    }

    public List<Container> getContainers() {
        return containers;
    }

    public List<Item> getItems() {
        return items;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
