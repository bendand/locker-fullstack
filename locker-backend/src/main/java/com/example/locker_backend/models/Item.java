package com.example.locker_backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Item {

    @ManyToOne
    @JsonBackReference
    private Account account;

    @ManyToOne
    @JsonBackReference
    private Container container;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private int quantity;


    public Item(Account account, Container container, String name, int quantity) {
        this.account = account;
        this.name = name;
        this.container = container;
        this.quantity = quantity; // Default quantity
    }

    public Item(int id, Account account, String name, Container container) {
        this.id = id;
        this.account = account;
        this.name = name;
        this.container = container;
    }

    public Item(int id, Account account, String name, Container container, int quantity) {
        this.quantity = quantity;
        this.id = id;
        this.account = account;
        this.name = name;
        this.container = container;
    }

    public Item(int id, Account account, String name, int quantity) {
        this.id = id;
        this.account = account;
        this.name = name;
        this.quantity = quantity;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public int getItemId() {
        return id;
    }

    public void setItemId(int itemId) {
        this.id = itemId;
    }

    public void setContainer(Container container) {
        this.container = container;
    }

    public Container getContainer() {
        return container;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Account getAccount() {
        return account;
    }
}
