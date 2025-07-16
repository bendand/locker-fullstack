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
    @JsonManagedReference
    private Account account;

    @Column(name="name")
    private String name;

    @OneToMany(mappedBy="locker", cascade = CascadeType.ALL)
    @JsonManagedReference
    private final List<Container> containers = new ArrayList<>();


    public Locker(Account account) {
        this.account = account;
    }

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

    public List<Container> getContainers() {
        return containers;
    }

    public void addContainer(Container container) {
        containers.add(container);
        container.setLocker(this); // Ensure the container knows its locker
    }
}
