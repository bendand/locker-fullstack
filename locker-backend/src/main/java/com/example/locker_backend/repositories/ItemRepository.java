package com.example.locker_backend.repositories;

import com.example.locker_backend.models.Item;
import com.example.locker_backend.models.Locker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>{
    List<Item> findAllByContainerId(int containerId);

    List<Item> findAllByUserId(int userId);
}