import Products from "../model/productModel.js";

const product = {
  getProduct: (req, res) => {
    res.render("admin/add-product", {
      title: "add product",
      path: "add-product",
    });
  },
  addProduct: (req, res) => {
    const Product = new Products(req.body.title);
    Product.save();
    res.redirect("/");
  },
};

export default product;
