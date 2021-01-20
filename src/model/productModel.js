const products = [];

class productModel {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static getAllProduct() {
    return products;
  }

  static findById(id) {
    return products.filter((item) => item.id === id);
  }

  save() {
    this.id = Math.random().toString();
    products.push(this);
  }
}

export default productModel;
