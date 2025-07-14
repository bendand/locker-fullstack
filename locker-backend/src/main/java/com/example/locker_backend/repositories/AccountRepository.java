package com.example.locker_backend.repositories;

import com.example.locker_backend.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {
}
