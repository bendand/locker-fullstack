package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Container {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    //    look into whether arguments following mappedBy are required
    @OneToMany(mappedBy = "containers", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<Item> items = new ArrayList<>();

    @ManyToOne
    private Account account;

    public Container(Account account) {
        this.account = account;
    }

    public Container(String name, Account account) {
        this.name = name;
        this.account = account;

    }

    public Container(int id, String name, Account account) {
        this.id = id;
        this.name = name;
        this.account = account;
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


    public void addItem(Item item) {
        items.add(item);
        item.setContainer(this); // Set the container for the item
    }

}
