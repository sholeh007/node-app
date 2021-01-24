import db from "../data/database.js";
class productModel {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static getAllProduct() {
    //mengembalikan promise
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {}

  save() {}
}

export default productModel;
