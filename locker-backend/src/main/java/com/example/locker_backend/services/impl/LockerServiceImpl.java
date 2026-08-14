package com.example.locker_backend.services.impl;

import com.example.locker_backend.models.Locker;
import com.example.locker_backend.repositories.LockerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LockerServiceImpl implements LockerService {

    @Autowired
    private LockerRepository lockerRepository;

//    @Override
//    public void Locker addLocker() {
//        return;
//    }
}
