import Products from "../model/productModel.js";
class product {
  static getAddProduct(req, res) {
    res.render("admin/edit-product", {
      title: "add product",
      path: "/admin/add-product",
    });
  }

  async addProduct(req, res) {
    const data = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.user,
    };

    try {
      const Product = new Products(data);
      await Product.save();
      res.redirect("/admin/products");
    } catch (err) {
      console.error(err);
    }
  }

  async getProduct(req, res) {
    try {
      const product = await Products.find();
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
    if (editMode !== "true") return res.redirect("/admin/products");
    const productId = req.params.id;

    try {
      const product = await Products.findById(productId);
      if (!product) return res.redirect("/admin/products");
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
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    try {
      let product = await Products.findById(id);
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      product = await product.save();
      res.redirect("/admin/products");
    } catch (err) {
      console.error(err);
    }
  }

  async deleteProduct(req, res) {
    const id = req.body.id;

    try {
      await Products.findByIdAndDelete(id);
      res.redirect("/admin/products");
    } catch (err) {
      console.log(err);
    }
  }
}

export default product;
