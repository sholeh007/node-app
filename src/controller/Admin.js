import { validationResult } from "express-validator";
import fs from "fs/promises";
import Products from "../model/productModel.js";
import errorHandling from "../helper/errorHandling.js";
class product {
  static getAddProduct(req, res) {
    res.render("admin/edit-product", {
      title: "add product",
      path: "/admin/add-product",
      errorValidation: [],
      message: "",
    });
  }

  async addProduct(req, res, next) {
    const errors = validationResult(req);
    const data = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.file,
      userId: req.user,
    };

    if (!data.imageUrl) {
      return res.status(422).render("admin/edit-product", {
        path: "/admin/add-product",
        title: "add product",
        errorValidation: [],
        message: "attachmet file image",
      });
    }

    if (!errors.isEmpty()) {
      try {
        await fs.unlink(data.imageUrl.path);
        return res.status(422).render("admin/edit-product", {
          path: "/admin/add-product",
          title: "add product",
          errorValidation: errors.array(),
          message: errors.array()[0].msg,
        });
      } catch (err) {
        console.error(err);
      }
    }

    data.imageUrl = data.imageUrl.path.replace(/\\/g, "/");
    data.imageUrl = data.imageUrl.replace("public", "");

    try {
      const Product = new Products(data);
      await Product.save();
      res.redirect("/admin/products");
    } catch (err) {
      errorHandling.error500(err, next);
    }
  }

  async getProduct(req, res, next) {
    try {
      const product = await Products.find();
      res.render("admin/list-product", {
        product,
        path: "/admin/products",
        title: "Admin Products",
      });
    } catch (err) {
      errorHandling.error500(err, next);
    }
  }

  async editProduct(req, res, next) {
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
        message: "",
      });
    } catch (err) {
      errorHandling.error500(err, next);
    }
  }

  async updateProduct(req, res, next) {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.file;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      try {
        if (imageUrl) {
          await fs.unlink(imageUrl.path);
        }
        return res.status(422).render("admin/edit-product", {
          product: {
            _id: id,
            title,
            price,
            description,
          },
          path: "/admin/edit-product",
          title: "edit product",
          editing: true,
          errorValidation: errors.array(),
          message: errors.array()[0].msg,
        });
      } catch (err) {
        console.error(err);
      }
    }

    try {
      let product = await Products.findById(id);
      product.title = title;
      product.price = price;
      if (imageUrl) {
        try {
          await fs.unlink("public" + product.imageUrl);
          product.imageUrl = imageUrl.path.replace(/\\/g, "/");
          product.imageUrl = product.imageUrl.replace("public", "");
        } catch (e) {
          console.log(e);
        }
      }
      product.description = description;
      product = await product.save();
      return res.redirect("/admin/products");
    } catch (err) {
      errorHandling.error500(err, next);
    }
  }

  async deleteProduct(req, res, next) {
    const id = req.body.id;
    const image = req.body.image;

    try {
      await fs.unlink("public" + image);
      await Products.findByIdAndDelete(id);
      res.redirect("/admin/products");
    } catch (err) {
      errorHandling.error500(err, next);
    }
  }
}

export default product;
