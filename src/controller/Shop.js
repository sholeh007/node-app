import Products from "../model/productModel.js";

const shop = {
  getIndex: async (req, res) => {
    const product = await Products.getAllProduct();
    try {
      await res.render("shop/index", {
        product,
        title: "Shop",
        path: "/",
      });
    } catch (err) {
      console.error(err);
    }
  },
  getProduct: async (req, res) => {
    const product = await Products.getAllProduct();
    try {
      await res.render("shop/product-list", {
        product,
        title: "Product List",
        path: "/products",
      });
    } catch (err) {
      console.error(err);
    }
  },
  getCart: async (req, res) => {
    const product = await req.user.getCart();
    try {
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
    const product = await Products.findById(id);
    try {
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
  getDetail: async (req, res) => {
    const id = req.params.id;
    const productDetail = await Products.findById(id);
    try {
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
