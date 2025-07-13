package com.example.locker_backend.models.dto;

import com.example.locker_backend.models.Account;

public class LockerDTO {
    private int lockerId;
    private String name;
    private String location;
    private Account account;

    public LockerDTO() {
    }

    public LockerDTO(int lockerId, String name, String location, Account account) {
        this.lockerId = lockerId;
        this.name = name;
        this.location = location;
        this.account = account;
    }

    public int getLockerId() { return lockerId;}

    public void setLockerId(int lockerId) { this.lockerId = lockerId;}

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location;}

    public String getName() { return name;}

    public void setName(String name) { this.name = name; }

    public Account getAccount() { return account; }

    public void setAccount(Account account) { this.account = account; }
}
