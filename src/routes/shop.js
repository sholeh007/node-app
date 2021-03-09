import express from "express";
import middleware from "../middleware/is-auth.js";
import shopController from "../controller/Shop.js";

const Route = express.Router();

Route.get("/", shopController.getIndex);
Route.get("/products", shopController.getProduct);
Route.get("/detail/:id", shopController.getDetail);
Route.route("/cart")
  .all(middleware.protectRoute)
  .get(shopController.getCart)
  .post(shopController.addCart);
Route.post(
  "/cart-delete-item",
  middleware.protectRoute,
  shopController.deleteCart
);
Route.post("/create-order", middleware.protectRoute, shopController.addOrder);
Route.get("/order", middleware.protectRoute, shopController.getOrder);
Route.get("/invoice/:id", middleware.protectRoute, shopController.getPdf);

export default Route;
