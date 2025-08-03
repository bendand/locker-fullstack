package com.example.locker_backend.models.dto;

public class UserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getPassword() { return password;}

    public String getEmail() { return email; }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
