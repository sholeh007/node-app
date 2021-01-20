import express from "express";
import shopController from "../controller/Shop.js";

const Route = express.Router();

Route.get("/", shopController.getIndex);
Route.get("/products", shopController.getProduct);
Route.get("/cart", shopController.getCart);
Route.get("/checkout", shopController.getCheckout);
Route.get("/order", shopController.getOrder);

export default Route;
