package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

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

    @Column(name="email")
    private String email;

    @Column(name="username")
    private String username;

    @Column(length = 255, name="password")
    private String password;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Locker> lockers = new ArrayList<>();

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Container> containers = new ArrayList<>();

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Item> items = new ArrayList<>();


    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = email.substring(0, '@');

    }

    public User(String firstName, String lastName, String email, String password, int id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = email.substring(0, '@');
    }

    public User() {
        // Default constructor for JPA
    }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName;}

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public int getId() { return id;}

    public void setId(int id) { this.id = id; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }

    public void setEmail(String email) {
        this.email = email;
        this.username = email.substring(0, '@');
    }

    public String fullName() { return firstName + " " + lastName; }

    public String getInitials() {
        return (firstName != null && lastName != null) ? (firstName.charAt(0) + "" + lastName.charAt(0)).toUpperCase() : "";
    }

    public void addLocker(Locker locker) {
        lockers.add(locker);
        locker.setUser(this);
    }

    public void addContainer(Container container) {
        containers.add(container);
    }

    public void addItem(Item item) {
        items.add(item);
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return firstName + " " + lastName + " - " + email;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


}
