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

    const updateCart = {
      items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }],
    };
    const db = getDb();
    return db
      .collection("user")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updateCart } }
      );
  }
}

export default user;
