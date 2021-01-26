import { getDb } from "../data/database.js";
class productModel {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
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

  static findById(id) {}

  async save() {
    const db = getDb();
    try {
      const result = await db.collection("product").insertOne(this);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
}

export default productModel;
