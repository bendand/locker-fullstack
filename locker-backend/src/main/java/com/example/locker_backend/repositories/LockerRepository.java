package com.example.locker_backend.repositories;

import com.example.locker_backend.models.Locker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LockerRepository extends JpaRepository<Locker, Integer>{

//    is this needed?
    private List<Locker> findAllByUserId(int userId) {
        // This method will be implemented by Spring Data JPA
        return null; // Placeholder return statement
    }}
}
