package com.example.locker_backend.services;

import com.example.locker_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // Customization allows us to use an email for login instead of the default username
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.example.locker_backend.models.User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Profile not found for the email " + email);
        }

        return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }
}