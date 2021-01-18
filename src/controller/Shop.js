import { products } from "../controller/Product.js";

const shop = {
  getShop: (req, res) => {
    const data = products;
    res.render("shop", { product: data, title: "Shop", path: "/" });
  },
};

export default shop;
