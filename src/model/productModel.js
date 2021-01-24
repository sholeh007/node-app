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

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE idproducts=?", [id]);
  }

  save() {
    return db.execute(
      "INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }
}

export default productModel;
