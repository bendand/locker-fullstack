package com.example.locker_backend.services;

import eu.fraho.spring.securityJwt.base.dto.JwtUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.equals("admin")) {
            // Create a JwtUser instance for the admin user
            // This is a hardcoded example; in a real application, you would fetch user details from a database
            JwtUser jwtUser = new JwtUser();
            jwtUser.setUsername("admin");
            jwtUser.setPassword(passwordEncoder.encode("admin"));
            jwtUser.setAuthorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
            jwtUser.setAccountNonExpired(true);
            jwtUser.setAccountNonLocked(true);
            jwtUser.setApiAccessAllowed(true);
            jwtUser.setCredentialsNonExpired(true);
            jwtUser.setEnabled(true);
            return jwtUser;
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}
