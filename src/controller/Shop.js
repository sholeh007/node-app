import Products from "../model/productModel.js";
import Order from "../model/orderModel.js";
import errorHandling from "../helper/errorHandling.js";

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
      errorHandling.error500(err);
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
      errorHandling.error500(err);
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
      errorHandling.error500(err);
    }
  },
  getCart: async (req, res) => {
    try {
      if (!req.session.login) return res.redirect("/login");
      const user = await req.user
        .populate("cart.items.productId")
        .execPopulate();
      const product = user.cart.items;
      res.render("shop/cart", {
        product,
        path: "/cart",
        title: "Your Cart",
      });
    } catch (err) {
      errorHandling.error500(err);
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
      await req.user.removeCart(id);
      res.redirect("/cart");
    } catch (err) {
      console.error(err);
    }
  },
  addOrder: async (req, res) => {
    try {
      const user = await req.user
        .populate("cart.items.productId")
        .execPopulate();
      const products = user.cart.items.map((item) => {
        return { quantity: item.quantity, product: { ...item.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.session.user.email,
          userId: req.session.user,
        },
        products,
      });
      const saveOrder = order.save();
      const clearOrder = req.user.clearCart();

      await saveOrder;
      await clearOrder;

      res.redirect("/order");
    } catch (err) {
      errorHandling.error500(err);
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await Order.find({ "user.userId": req.session.user._id });
      res.render("shop/order", {
        order,
        path: "/order",
        title: "Your Order",
      });
    } catch (err) {
      errorHandling.error500(err);
    }
  },
};

export default shop;
