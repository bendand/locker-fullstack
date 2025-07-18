package com.example.locker_backend.repositories;

import com.example.locker_backend.models.Container;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContainerRepository extends JpaRepository<Container, Integer>{
    List<Container> findAllByLockerId(int lockerId);
}