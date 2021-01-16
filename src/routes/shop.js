import express from "express";
import path from "path";
import dir from "../helper/path.js";
import { product } from "./admin.js";

const Route = express.Router();

Route.get("/", (req, res) => {
  res.render("shop");
});

export default Route;
