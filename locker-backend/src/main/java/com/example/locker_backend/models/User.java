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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<Account> adminAccounts = new ArrayList<>();

    @Column(name="firstName")
    private String firstName;

    @Column(name="lastName")
    private String lastName;

    @Column(name="email")
    private String email;

    @Column(name="username")
    private String username;

    @Column(length = 255, nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private final List<Locker> lockers = new ArrayList<>();

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = email.substring(0, '@');
    }
    public User(String firstName, String lastName, String email, String password, int id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = email.substring(0, '@');
    }

    public User() {
    }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName;}

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public int getId() { return id;}

    public void setId(int id) { this.id = id; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }

    public void setEmail(String email) {
        this.email = email;
        this.username = email.substring(0, '@');
    }

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

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof User user)) return false;
//        return id == user.id && Objects.equals(this.fullName()) && Objects.equals(email, user.email) && Objects.equals(passHash, user.passHash);
//    }

    public void setAccount(Account adminAccount) {
        if (this.adminAccount != null) {
            this.adminAccount.setAdminUser(null); // Remove previous admin account from user
        }
        this.adminAccount = adminAccount;
        if (adminAccount != null) {
            adminAccount.setAdminUser(this); // Set the new admin account to this user
        }
    }

    public List<Account> getReadOnlyAccounts() {
        return readOnlyAccounts;
    }

    public void addReadOnlyAccount(Account account) {
        readOnlyAccounts.add(account);
        account.setAdminUser(this);
    }

    public void addAdminAccount(Account account) {
        adminAccounts.add(account);
        account.setAdminUser(this);
    }

    public List<Account> getAdminAccounts() {
        return adminAccounts;
    }
}
