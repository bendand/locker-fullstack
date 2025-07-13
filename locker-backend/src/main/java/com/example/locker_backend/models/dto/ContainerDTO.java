package com.example.locker_backend.models.dto;

import com.example.locker_backend.models.Account;
import com.example.locker_backend.models.Locker;

public class ContainerDTO {
    private int containerId;
    private Locker locker;
    private Account account;

    public ContainerDTO() {
    }

    public ContainerDTO(int containerId, Locker locker, Account account) {
        this.containerId = containerId;
        this.locker = locker;
        this.account = account;
    }

    public int getContainerId() {
        return containerId;
    }

    public void setContainerId(int containerId) {
        this.containerId = containerId;
    }

    public Locker getLocker() {
        return locker;
    }

    public void setLocker(Locker locker) {
        this.locker = locker;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
