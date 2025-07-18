package com.example.locker_backend.repositories;

import com.example.locker_backend.models.Locker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LockerRepository extends JpaRepository<Locker, Integer>{

    List<Locker> findAllByUserId(int userId);
}
