package com.example.locker_backend.repositories;

import com.example.locker_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    User findByEmail(String email);

    boolean existsByEmail(String email);
}
