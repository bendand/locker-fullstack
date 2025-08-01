package com.example.locker_backend.config;
import eu.fraho.spring.securityJwt.base.JwtAuthenticationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    JwtAuthenticationTokenFilter jwtAuthFilter;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth->
                        auth.requestMatchers("/login", "/register").permitAll()
                                .requestMatchers(HttpMethod.GET).hasAuthority(Permissions.ADMIN.name())
                                .requestMatchers(HttpMethod.POST).hasAuthority(Permissions.ADMIN.name())
                                .requestMatchers(HttpMethod.PUT).hasAuthority(Permissions.ADMIN.name())
                                .requestMatchers(HttpMethod.DELETE).hasAuthority(Permissions.ADMIN.name())
                                .anyRequest().authenticated());
    }
}
