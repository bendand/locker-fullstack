package com.example.locker_backend.models.dto;

public class LockerDTO {
    private String name;
    private String address;
    private int userId;
    private String details;


    public LockerDTO(String name, String address, int userId, String details) {
        this.name = name;
        this.address = address;
        this.userId = userId;
        this.details = details;
    }

    public LockerDTO(String name, String address, int userId) {
        this.name = name;
        this.address = address;
        this.userId = userId;
    }

    public String getName() { return name;}

    public void setName(String name) { this.name = name; }

    public int getUserId() { return userId; }

    public void setUserId(int userId) { this.userId = userId; }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
