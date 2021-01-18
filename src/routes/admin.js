import express from "express";
import productController from "../controller/Product.js";

const Router = express.Router();

Router.route("/add-product")
  .get(productController.getProduct)
  .post(productController.addProduct);

export default Router;
