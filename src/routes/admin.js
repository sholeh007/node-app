import express from "express";
import adminController from "../controller/Admin.js";

const Router = express.Router();
const admin = new adminController(); //pewarisan class

Router.route("/add-product")
  .get(adminController.getAddProduct)
  .post(admin.addProduct);
Router.get("/products", admin.getProduct);
Router.put("/edit-product/:id");

export default Router;
