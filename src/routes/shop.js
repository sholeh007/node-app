import express from "express";
import shopController from "../controller/Shop.js";

const Route = express.Router();

Route.get("/", shopController.getShop);

export default Route;
