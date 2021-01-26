import Products from "../model/productModel.js";
class product {
  static getAddProduct(req, res) {
    res.render("admin/edit-product", {
      title: "add product",
      path: "/admin/edit-product",
    });
  }
  async addProduct(req, res) {
    const data = Object.values(req.body);
    const Product = new Products(...data);
    try {
      await Product.save();
      await res.redirect("/");
    } catch (err) {
      console.error(err);
    }
  }
  async getProduct(req, res) {
    const product = await Products.getAllProduct();
    try {
      await res.render("admin/list-product", {
        product,
        path: "/admin/products",
        title: "Admin Products",
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default product;
