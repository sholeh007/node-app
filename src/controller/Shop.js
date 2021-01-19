import Products from "../model/productModel.js";

const shop = {
  getShop: (req, res) => {
    const data = Products.getAllProduct();
    res.render("shop/product-list", {
      product: data,
      title: "Shop",
      path: "/",
    });
  },
};

export default shop;
