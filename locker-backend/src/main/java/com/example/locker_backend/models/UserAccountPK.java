package com.example.locker_backend.models;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class UserAccountPK implements Serializable {

    private int userId;
    private int accountId;

    public UserAccountPK() {
    }

    public UserAccountPK(int userId, int accountId) {
        this.userId = userId;
        this.accountId = accountId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }
}
