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

    try {
      const products = await db
        .collection("product")
        .find({ _id: { $in: productIds } })
        .toArray();
      return products.map((product) => {
        return { ...product, quantity: quantitities[product._id] };
      });
    } catch (e) {
      console.error(e);
    }
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
    try {
      const product = await this.getCart();
      const order = {
        items: product,
        user: {
          _id: new mongodb.ObjectId(this._id),
          username: this.username,
        },
      };

      await db.collection("orders").insertOne(order);
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
    } catch (err) {
      console.error(err);
    }
  }

  getOrder() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new mongodb.ObjectId(this._id) })
      .toArray();
  }
}

export default user;
