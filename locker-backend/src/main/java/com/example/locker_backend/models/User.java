package com.example.locker_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;
    private String passHash;

    public User(String name, String email, String passHash) {
        this.name = name;
        this.email = email;
        this.passHash = passHash;
    }

    public User(int id, String name, String email, String passHash) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passHash = passHash;
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

    public String getPassHash() {
        return passHash;
    }

    public void setPassHash(String passHash) {
        this.passHash = passHash;
    }



    private Boolean validateUser(String name, String passHash) {
//        query for matching credentials
        return null;
    }


}
