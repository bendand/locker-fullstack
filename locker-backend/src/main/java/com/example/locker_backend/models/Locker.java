package com.example.locker_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Locker {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private final int userId;


    public Locker(int userId) {
        this.userId = userId;
    }

    public Locker(String name, int userId) {
        this.name = name;
        this.userId = userId;

    }

    public Locker(int id, String name, int userId) {
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

}
