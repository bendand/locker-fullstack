package com.example.locker_backend.services;

import com.example.locker_backend.models.dto.UserDTO;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
}
