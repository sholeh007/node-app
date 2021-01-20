import express from "express";
import adminController from "../controller/Admin.js";

const Router = express.Router();

Router.route("/add-product")
  .get(adminController.getAddProduct)
  .post(adminController.addProduct);
Router.get("/products", adminController.getProduct);
Router.put("/edit-product/:id");
export default Router;
