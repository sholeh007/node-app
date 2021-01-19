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

  save() {
    products.push(this);
  }
}

export default productModel;
