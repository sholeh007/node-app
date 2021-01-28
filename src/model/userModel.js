import { getDb } from "../data/database.js";
import mongodb from "mongodb";

class user {
  constructor(username, email) {
    this.username = username;
    this.email = email;
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
}

export default user;
