package com.example.locker_backend.models.dto;

public class LockerDTO {
    private String name;
    private String address;
    private String details;


    public LockerDTO(String name, String address, String details) {
        this.name = name;
        this.address = address;
        this.details = details;
    }


    public String getName() { return name;}

    public void setName(String name) { this.name = name; }

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
