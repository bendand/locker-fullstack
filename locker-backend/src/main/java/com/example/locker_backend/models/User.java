package com.example.locker_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<Account> readOnlyAccounts = new ArrayList<>();

//    possibly need users to serve as admins that can change data and roles of other users
//    with different permissions for different roles
    @Column(name="role")
//    @ElementCollection what is this?
    private String role;

    @Column(name="firstName")
    private String firstName;

    @Column(name="lastName")
    private String lastName;

    @Column(name="email")
    private String email;

    @Column(name="passHash")
    private String passHash;

//    look into whether arguments following mappedBy are required
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<Locker> lockers = new ArrayList<>();

    public User(String firstName, String lastName, String email, String passHash) {
        this.role = "ADMIN";
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passHash = passHash;
    }

    public User(String firstName, String lastName, String email, String passHash, String role) {
        this.role = "ADMIN";
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passHash = passHash;
        this.role = role;
    }

    public User(int id, String firstName, String lastName, String email, String passHash) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passHash = passHash;
    }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName;}

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public int getId() { return id;}

    public void setId(int id) { this.id = id; }

    public String getPassHash() { return passHash; }

    public void setPassHash(String passHash) { this.passHash = passHash; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String fullName() { return firstName + " " + lastName; }

    public String getInitials() {
        return (firstName != null && lastName != null) ? (firstName.charAt(0) + "" + lastName.charAt(0)).toUpperCase() : "";
    }

    @Override
    public String toString() {
        return firstName + " " + lastName + " - " + email;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return id == user.id && Objects.equals(fullName, user.fullName()) && Objects.equals(email, user.email) && Objects.equals(passHash, user.passHash);
    }

    public void setAccount(Account account) {
    }

    public List<Account> getReadOnlyAccounts() {
        return readOnlyAccounts;
    }

    public void addReadOnlyAccount(Account account) {
        readOnlyAccounts.add(account);
        account.setAdminUser(this);
    }
}
