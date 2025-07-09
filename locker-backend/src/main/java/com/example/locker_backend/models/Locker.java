package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Locker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    consider using @OneToOne or ManyToOne for userId/user relationship

    private String name;

    //    look into whether arguments following mappedBy are required
    @OneToMany(mappedBy = "locker", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<Container> containers = new ArrayList<>();


    @ManyToOne
    private User user;

//    public Locker(int userId) {
//        this.userId = userId;
//    }

    public Locker(String name, User user) {
        this.name = name;
        this.user = user;

    }

    public Locker(int id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }


    public User getUser() {
        return user;
    }
    public void setUser(User user) { this.user = user;}


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(int lockerId) {
        this.id = lockerId;
    }
}
