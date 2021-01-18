import express from "express";
import path from "path";
import dir from "../helper/path.js";
import { product } from "./admin.js";

const Route = express.Router();

Route.get("/", (req, res) => {
  const data = product;
  res.render("shop", { product: data, title: "Shop", path: "/" });
});

export default Route;
