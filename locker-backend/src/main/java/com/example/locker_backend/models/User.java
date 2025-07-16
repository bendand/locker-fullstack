package com.example.locker_backend.models;

import jakarta.persistence.*;

import java.util.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JsonBackReference

    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "creator_id")
    private Account creatorAccount;

    @Column(name = "hasCreatedAccount")
    private boolean hasCreatedAccount;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<UserAccountRelationship> accountRoles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<UserAccountRelationship> readOnlyAccounts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<UserAccountRelationship> adminAccounts = new ArrayList<>();

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


    public User(String firstName, String lastName, String email, String password, boolean hasCreatedAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = email.substring(0, '@');
        this.hasCreatedAccount = hasCreatedAccount;
    }

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

    public void setHasCreatedAccount() {
        this.hasCreatedAccount = true;
    }

//    public void addAdminAccount(Account account) {
//        if (!adminAccounts.contains(account)) {
//            adminAccounts.add(account);
//            account.addAdminUser(this); // Ensure the relationship is bidirectional
//        }
//    }
//
//    public void addReadOnlyAccount(Account account) {
//        if (!readOnlyAccounts.contains(account)) {
//            readOnlyAccounts.add(account);
//            account.addReadOnlyUser(this); // Ensure the relationship is bidirectional
//        }
//    }


//    public List<Account> getReadOnlyAccounts() {
//        return readOnlyAccounts;
//    }
//


}
