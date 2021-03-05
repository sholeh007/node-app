import { validationResult } from "express-validator";
import Products from "../model/productModel.js";
class product {
  static getAddProduct(req, res) {
    res.render("admin/edit-product", {
      title: "add product",
      path: "/admin/add-product",
      errorValidation: [],
    });
  }

  async addProduct(req, res) {
    const errors = validationResult(req);
    const data = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.user,
    };

    if (!errors.isEmpty()) {
      return res.status(422).render("admin/edit-product", {
        path: "/admin/add-product",
        title: "add product",
        errorValidation: errors.array(),
      });
    }

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
    const productId = req.params.id;

    if (editMode !== "true") return res.redirect("/admin/products");

    try {
      const product = await Products.findById(productId);
      if (!product) return res.redirect("/admin/products");
      res.render("admin/edit-product", {
        product,
        title: "edit product",
        path: "/admin/edit-product",
        editing: editMode,
        errorValidation: [],
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("admin/edit-product", {
        product: {
          _id: id,
          title,
          imageUrl,
          price,
          description,
        },
        path: "/admin/edit-product",
        title: "edit product",
        editing: true,
        errorValidation: errors.array(),
      });
    }

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
