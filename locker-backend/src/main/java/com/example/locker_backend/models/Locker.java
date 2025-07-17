package com.example.locker_backend.models;

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

    @Column(name="location")
    private String location;

    @Column(name="name")
    private String name;

    @OneToMany(mappedBy="locker", cascade = CascadeType.ALL)
    @JsonManagedReference
    private final List<Container> containers = new ArrayList<>();


    public Locker() {
    }

    public Locker(User user) {
        this.user = user;
    }

    public Locker(String name, User user, String location) {
        this.name = name;
        this.user = user;
        this.location = location;
    }

//    public Locker(int id, String name, int userId) {
//        this.id = id;
//        this.name = name;
//        this.userId = userId;
//    }


    public User getUser() { return user; }

    public void setUser(User user) { this.user = user;}

    public String getName() {
        return name;
    }

    public void setName(String name) { this.name = name; }

    public void setId(int lockerId) { this.id = lockerId; }

    public int getId() { return id; }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Container> getContainers() { return containers; }

    public void addContainer(Container container) {
        containers.add(container);
        container.setLocker(this); // Ensure the container knows its locker
    }
}
