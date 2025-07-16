package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Container {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL)
    @JsonBackReference
    private final List<Item> items = new ArrayList<>();

    @ManyToOne
    @JsonManagedReference
    private Account account;

    @ManyToOne
    @JsonManagedReference
    private Locker locker;

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

    public Container(String name, int lockerId) {
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

    public void setLocker(Locker locker) {
        this.locker = locker;
    }

    public Locker getLocker() {
        return locker;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Account getAccount() {
        return account;
    }
}
