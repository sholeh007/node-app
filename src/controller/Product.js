export const products = [];

const product = {
  getProduct: (req, res) => {
    res.render("add-product", { title: "add product", path: "add-product" });
  },
  addProduct: (req, res) => {
    products.push({ title: req.body.title });
    res.redirect("/");
  },
};

export default product;
