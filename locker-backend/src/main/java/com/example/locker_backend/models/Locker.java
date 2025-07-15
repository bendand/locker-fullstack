package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private Account account;

    @Column(name="name")
    private String name;

    //    look into whether arguments following mappedBy are required
//    @OneToMany(mappedBy = "locker", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonBackReference
    @Column(name="containers")
    private final List<Container> containers = new ArrayList<>();


//    @ManyToOne
//    @JsonManagedReference
//    private User user;

//    public Locker(int userId) {
//        this.userId = userId;
//    }

    public Locker(String name, Account account) {
        this.name = name;
        this.account = account;

    }

    public Locker(int id, String name, Account account) {
        this.id = id;
        this.name = name;
        this.account = account;
    }


    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) { this.account = account;}


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(int lockerId) {
        this.id = lockerId;
    }

    public int getId() {
        return id;
    }
}
