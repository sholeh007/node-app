const products = [];

class productModel {
  constructor(title) {
    this.title = title;
  }

  static getAllProduct() {
    return products;
  }

  save() {
    products.push(this);
  }
}

export default productModel;
