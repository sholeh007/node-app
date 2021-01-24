import Products from "../model/productModel.js";

const shop = {
  getIndex: (req, res) => {
    Products.getAllProduct()
      .then(([rows, fieldData]) => {
        res.render("shop/index", {
          product: rows,
          title: "Shop",
          path: "/",
        });
      })
      .catch((err) => console.error(err));
  },
  getProduct: (req, res) => {
    Products.getAllProduct()
      .then(([rows, fieldData]) => {
        res.render("shop/product-list", {
          product: rows,
          title: "Product List",
          path: "/products",
        });
      })
      .catch((err) => console.error(err));
  },
  getCart: (req, res) => {
    res.render("shop/cart", {
      path: "/cart",
      title: "Your Cart",
    });
  },
  addCart: (req, res) => {
    const id = req.body.id;
    console.log(id);
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
