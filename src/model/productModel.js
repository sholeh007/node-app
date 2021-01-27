import mongodb from "mongodb";
import { getDb } from "../data/database.js";
class productModel {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = new mongodb.ObjectId(id);
  }

  static async getAllProduct() {
    const db = getDb();
    try {
      const result = await db.collection("product").find().toArray();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(id) {
    const db = getDb();
    try {
      const result = await db
        .collection("product")
        .find({ _id: new mongodb.ObjectId(id) }) //
        .next();
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  async save() {
    const db = getDb();
    let data;
    try {
      if (this.id) {
        data = await db
          .collection("product")
          .updateOne(
            { _id: this.id },
            {
              $set: {
                title: this.title,
                imageUrl: this.imageUrl,
                description: this.description,
                price: this.price,
              },
            }
          );
        return data;
      }
      data = await db.collection("product").insertOne(this);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default productModel;
