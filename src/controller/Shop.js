import Products from "../model/productModel.js";

const shop = {
  getIndex: async (req, res) => {
    try {
      const product = await Products.find();
      res.render("shop/index", {
        product,
        title: "Shop",
        path: "/",
      });
    } catch (err) {
      console.error(err);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Products.find();
      res.render("shop/product-list", {
        product,
        title: "Product List",
        path: "/products",
      });
    } catch (err) {
      console.error(err);
    }
  },
  getCart: async (req, res) => {
    try {
      const product = await req.user.getCart();
      res.render("shop/cart", {
        product,
        path: "/cart",
        title: "Your Cart",
      });
    } catch (err) {
      console.log(err);
    }
  },
  addCart: async (req, res) => {
    const id = req.body.id;
    try {
      const product = await Products.findById(id);
      await req.user.addCart(product);
      res.redirect("/cart");
    } catch (err) {
      console.error(err);
    }
  },
  deleteCart: async (req, res) => {
    const id = req.body.productId;
    try {
      await req.user.deleteCart(id);
      res.redirect("/cart");
    } catch (err) {
      console.error(err);
    }
  },
  addOrder: async (req, res) => {
    try {
      await req.user.addOrder();
      res.redirect("/order");
    } catch (err) {
      console.log(err);
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await req.user.getOrder();
      res.render("shop/order", {
        order,
        path: "/order",
        title: "Your Order",
      });
    } catch (err) {
      console.log(err);
    }
  },
  getDetail: async (req, res) => {
    const id = req.params.id;
    try {
      const productDetail = await Products.findById(id);
      await res.render("shop/detail", {
        title: "Detail product",
        products: productDetail,
        path: "/products",
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default shop;
