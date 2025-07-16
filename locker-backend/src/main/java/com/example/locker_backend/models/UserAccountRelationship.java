package com.example.locker_backend.models;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class UserAccountRelationship {

    @EmbeddedId
    private UserAccountPK userAccountPK = new UserAccountPK();

    @ManyToOne
    @MapsId("userId")
    private User user;

    @ManyToOne
    @MapsId("accountId")
    private Account account;

    private String accessType;
    


    public UserAccountRelationship(int userId, int accountId, String accessType) {
        this.userAccountPK = new UserAccountPK(userId, accountId);
        this.accessType = accessType;
    }

    public void setAccessType(String accessType) {
        this.accessType = accessType;
    }

    public String getAccessType() {
        return accessType;
    }


}
