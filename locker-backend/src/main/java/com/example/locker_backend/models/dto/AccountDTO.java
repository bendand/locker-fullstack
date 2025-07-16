package com.example.locker_backend.models.dto;


public record AccountDTO(int creatorId) {

    public int getCreatorId() {
        return creatorId;
    }
}
