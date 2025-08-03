// basic Item class used for data normalization
export default class Item {
    constructor(id, name, quantity, description) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = description
    }
}