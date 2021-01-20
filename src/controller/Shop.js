import Products from "../model/productModel.js";

const shop = {
  getProduct: (req, res) => {
    const data = Products.getAllProduct();
    res.render("shop/product-list", {
      product: data,
      title: "All Product",
      path: "/products",
    });
  },
  getIndex: (req, res) => {
    const data = Products.getAllProduct();
    res.render("shop/index", {
      product: data,
      title: "Shop",
      path: "/",
    });
  },
  getCart: (req, res) => {
    res.render("shop/cart", {
      path: "/cart",
      title: "Your Cart",
    });
  },
  getCheckout: (req, res) => {
    res.render("shop/checkout", {
      path: "/checkout",
      title: "Checkout",
    });
  },
  getOrder: (req, res) => {
    res.render("shop/order", {
      path: "/order",
      title: "Your Order",
    });
  },
  getDetail: (req, res) => {
    const id = req.params.id;
    const product = Products.findById(id);
    res.render("shop/detail", {
      title: "Detail product",
      product,
      path: "/products",
    });
  },
};

export default shop;
