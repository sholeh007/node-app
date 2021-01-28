import Products from "../model/productModel.js";
class product {
  static getAddProduct(req, res) {
    res.render("admin/edit-product", {
      title: "add product",
      path: "/admin/add-product",
    });
  }
  async addProduct(req, res) {
    const data = Object.values(req.body);
    const Product = new Products(...data);
    try {
      await Product.save();
      await res.redirect("/");
    } catch (err) {
      console.error(err);
    }
  }
  async getProduct(req, res) {
    const product = await Products.getAllProduct();
    try {
      res.render("admin/list-product", {
        product,
        path: "/admin/products",
        title: "Admin Products",
      });
    } catch (err) {
      console.error(err);
    }
  }
  async editProduct(req, res) {
    const editMode = req.query.edit;
    if (editMode !== "true") return res.redirect("/");
    const productId = req.params.id;
    const product = await Products.findById(productId);
    try {
      if (!product) return res.redirect("/");
      res.render("admin/edit-product", {
        product,
        title: "edit product",
        path: "/admin/edit-product",
        editing: editMode,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(req, res) {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const id = req.body.id;

    const product = new Products(title, imageUrl, price, description);
    try {
      await product.save(id);
      res.redirect("/admin/products");
    } catch (err) {
      console.error(err);
    }
  }
}

export default product;
