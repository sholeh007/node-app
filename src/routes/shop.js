import express from "express";
import path from "path";
import dir from "../helper/path.js";
import { product } from "./admin.js";

const Route = express.Router();

Route.get("/", (req, res) => {
  console.log(product);
  res.sendFile(path.join(dir, "../", "views", "shop.html"));
});

export default Route;
