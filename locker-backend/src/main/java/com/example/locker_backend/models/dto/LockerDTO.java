package com.example.locker_backend.models.dto;

public class LockerDTO {
    private String name;
    private String location;
    private int userId;


    public LockerDTO(String name, String location, int userId) {
        this.name = name;
        this.location = location;
        this.userId = userId;
    }


    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location;}

    public String getName() { return name;}

    public void setName(String name) { this.name = name; }

    public int getUserId() { return userId; }

    public void setUserId(int userId) { this.userId = userId; }
}
