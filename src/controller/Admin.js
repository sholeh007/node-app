import Products from "../model/productModel.js";

const product = {
  getAddProduct: (req, res) => {
    res.render("admin/add-product", {
      title: "add product",
      path: "/admin/add-product",
    });
  },
  addProduct: (req, res) => {
    const data = Object.values(req.body);
    const Product = new Products(...data);
    Product.save();
    res.redirect("/");
  },
  getProduct: (req, res) => {
    const data = Products.getAllProduct();
    res.render("admin/list-product", {
      product: data,
      path: "/admin/products",
      title: "Admin Products",
    });
  },
};

export default product;
