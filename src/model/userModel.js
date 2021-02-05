import { getDb } from "../data/database.js";
import mongodb from "mongodb";

class user {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  static async findUser(id) {
    const db = getDb();
    try {
      const dataUser = await db
        .collection("user")
        .findOne({ _id: new mongodb.ObjectId(id) });
      return dataUser;
    } catch (err) {
      console.error(err);
    }
  }

  async save() {
    const db = getDb();
    try {
      const addUser = await db.collection("user").insertOne(this);
      return addUser;
    } catch (err) {
      console.error(err);
    }
  }

  addCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString()
    );
    let newQuantity = 1;
    const updateCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updateCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updateCart = {
      items: updateCartItems,
    };
    const db = getDb();
    return db
      .collection("user")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updateCart } }
      );
  }
  async getCart() {
    const db = getDb();
    const productIds = [];
    const quantitities = {};

    this.cart.items.forEach((item) => {
      let prodId = item.productId;
      productIds.push(prodId);
      quantitities[prodId] = item.quantity;
    });

    const products = await db
      .collection("product")
      .find({ _id: { $in: productIds } })
      .toArray();
    return products.map((product) => {
      return { ...product, quantity: quantitities[product._id] };
    });
  }
  deleteCart(productId) {
    const db = getDb();
    const data = this.cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    return db
      .collection("user")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: data } } }
      );
  }
  async addOrder() {
    const db = getDb();
    const result = await db.collection("orders").insertOne(this.cart);

    try {
      this.cart = { items: [] };
      return db
        .collection("user")
        .updateOne(
          { _id: new mongodb.ObjectId(this._id) },
          { $set: { cart: { items: [] } } }
        );
    } catch (err) {
      console.error(err);
    }
  }
}

export default user;
