import express from "express";
import shopController from "../controller/Shop.js";

const Route = express.Router();

Route.get("/", shopController.getIndex);
Route.get("/products", shopController.getProduct);
Route.get("/detail/:id", shopController.getDetail);
Route.route("/cart").get(shopController.getCart).post(shopController.addCart);
Route.post("/cart-delete-item", shopController.deleteCart);
export default Route;
