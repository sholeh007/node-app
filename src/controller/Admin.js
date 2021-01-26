import Products from "../model/productModel.js";

const product = {
  getAddProduct: (req, res) => {
    res.render("admin/edit-product", {
      title: "add product",
      path: "/admin/edit-product",
    });
  },
  addProduct: async (req, res) => {
    const data = Object.values(req.body);
    const Product = new Products(...data);
    try {
      await Product.save();
      await res.redirect("/");
    } catch (err) {
      console.error(err);
    }
  },
  getProduct: async (req, res) => {
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
  },
};

export default product;
