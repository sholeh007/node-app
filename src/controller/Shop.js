import Products from "../model/productModel.js";

const shop = {
  getIndex: async (req, res) => {
    const rows = await Products.getAllProduct();
    try {
      await res.render("shop/index", {
        product: rows,
        title: "Shop",
        path: "/",
      });
    } catch (err) {
      console.error(err);
    }
  },
  getProduct: async (req, res) => {
    const rows = await Products.getAllProduct();
    try {
      await res.render("shop/product-list", {
        product: rows,
        title: "Product List",
        path: "/products",
      });
    } catch (err) {
      console.error(err);
    }
  },
  getCart: (req, res) => {
    res.render("shop/cart", {
      path: "/cart",
      title: "Your Cart",
    });
  },
  addCart: (req, res) => {
    const id = req.body.id;
    res.redirect("/cart");
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
  getDetail: async (req, res) => {
    const id = req.params.id;
    const [rows] = await Products.findById(id);
    try {
      await res.render("shop/detail", {
        title: "Detail product",
        products: rows[0], //untuk mengambil objek di dalam single array
        path: "/products",
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default shop;
