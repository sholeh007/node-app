import express from "express";
import middleware from "../middleware/is-auth.js";
import adminController from "../controller/Admin.js";
import validation from "../helper/validation.js";

const Router = express.Router();
const admin = new adminController(); //pewarisan class

Router.use(middleware.protectRoute);
Router.use(middleware.adminArea);
Router.route("/add-product")
  .get(adminController.getAddProduct)
  .all(validation.product)
  .post(admin.addProduct);
Router.get("/products", admin.getProduct);
Router.get("/edit-product/:id", admin.editProduct);
Router.post("/updateProduct", admin.updateProduct);
Router.post("/delete", admin.deleteProduct);

export default Router;
