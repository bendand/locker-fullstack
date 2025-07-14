package com.example.locker_backend.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Item {

    //    consider using @OneToOne or ManyToOne for container/containerid relationship
//    consider also

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private final int userId;
    private String name;
    private int quantity;


    public Item(int userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public Item(int id, int userId, String name) {
        this.id = id;
        this.userId = userId;
        this.name = name;
    }

    public Item(int id, int userId, String name, int quantity) {
        this.id = id;
        this.userId = userId;
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
}
