package com.example.locker_backend.repositories;

import com.example.locker_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    // Method to find a user by their username, may need for authentication (seen in Spring Security module)
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    User findByEmail(String email);
}
