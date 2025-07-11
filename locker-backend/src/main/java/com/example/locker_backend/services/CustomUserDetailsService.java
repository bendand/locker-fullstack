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
    private static PasswordEncoder passwordEncoder;

    @Override
    public static UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
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

//        ** alternative implementation using a UserRepository that checks for granted roles **
//        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        List<GrantedAuthority> roles = new ArrayList<>();
//
//        for (String role : user.getRoles()) {
//            roles.add(new SimpleGrantedAuthority(role));
//        }
//
//        JwtUser jwtUser = new JwtUser();
//        jwtUser.setUsername(user.getUsername());
//        jwtUser.setPassword(user.getPassword());
//        jwtUser.setAuthorities(roles);
//        jwtUser.setAccountNonExpired(true);
//        jwtUser.setAccountNonLocked(true);
//        jwtUser.setApiAccessAllowed(true);
//        jwtUser.setCredentialsNonExpired(true);
//        jwtUser.setEnabled(true);
//
//        return jwtUser;

        public static UserDetails validateUser(String username, String password) throws Pass {
            UserDetails userDetails = loadUserByUsername(username);
            if (userDetails != null && passwordEncoder.matches(password, userDetails.getPassword())) {
                return userDetails;
            } else {
                throw new UsernameNotFoundException("Invalid username or password");
            }
        }

    }

}
