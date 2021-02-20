import express from "express";
import protect from "../middleware/is-auth.js";
import adminController from "../controller/Admin.js";

const Router = express.Router();
const admin = new adminController(); //pewarisan class

Router.use(protect.protectRoute);
Router.route("/add-product")
  .get(adminController.getAddProduct)
  .post(admin.addProduct);
Router.get("/products", admin.getProduct);
Router.get("/edit-product/:id", admin.editProduct);
Router.post("/updateProduct", admin.updateProduct);
Router.post("/delete", admin.deleteProduct);

export default Router;
