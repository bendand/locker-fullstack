package com.example.locker_backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Container {

    //    consider using @OneToOne or ManyToOne for lockerid/locker relationship


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int userId;

    //    look into whether arguments following mappedBy are required
    @OneToMany(mappedBy = "containers", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<Item> items = new ArrayList<>();

    @ManyToOne
    private User user;

    public Container(int userId) {
        this.userId = userId;
    }

    public Container(String name, int userId) {
        this.name = name;
        this.userId = userId;

    }

    public Container(int id, String name, int userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
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

    public void setId(int id) {
        this.id = id;
    }


}
