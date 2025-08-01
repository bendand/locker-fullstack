package com.example.locker_backend.services.impl;

import com.example.locker_backend.exceptions.ItemExistsException;
import com.example.locker_backend.models.User;
import com.example.locker_backend.models.dto.UserDTO;
import com.example.locker_backend.repositories.UserRepository;
import com.example.locker_backend.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder encoder;

    @Override
    public UserDTO createUser (UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new ItemExistsException("Profile already exists for " + userDTO.getEmail());
        }
        userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        User userProfile = mapToProfileEntity(userDTO);
        userProfile = userRepository.save(userProfile); // returns saved object with generated id
        return mapToUserDTO(userProfile);
    }

    // Mapper method to map values from entity to DTO
    private UserDTO mapToUserDTO(User userEntity) {
        return modelMapper.map(userEntity, UserDTO.class);
    }

    // Mapper method to map values from DTO to entity
    private User mapToProfileEntity(UserDTO userProfileDTO) {
        return modelMapper.map(userProfileDTO, User.class);
    }
}
