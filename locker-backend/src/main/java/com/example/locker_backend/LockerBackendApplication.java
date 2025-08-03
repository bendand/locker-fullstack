package com.example.locker_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan
@SpringBootApplication
public class LockerBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(LockerBackendApplication.class, args);
	}
}
