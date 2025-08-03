// basic User class used for data normalization
export default class User {
    constructor(id, firstName, lastName, email, initials) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.initials = initials
    }
}