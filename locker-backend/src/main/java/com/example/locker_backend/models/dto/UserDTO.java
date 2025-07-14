package com.example.locker_backend.models.dto;

public class UserDTO {
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String username;

    public UserDTO() {
    }

    public UserDTO(String firstName, String lastName, String password, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.username = email.substring(0, '@');
    }

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public void setEmail(String email) {
        this.email = email;
        this.username = email.substring(0, '@');
    }

    public String getName() { return firstName + " " + lastName; }
}
