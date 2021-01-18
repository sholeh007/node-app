import express from "express";
import path from "path";
import dir from "../helper/path.js";

const Router = express.Router();
const product = [];

Router.route("/add-product")
  .get((req, res) => {
    res.render("add-product", { title: "add product", path: "add-product" });
  })
  .post((req, res) => {
    product.push({ title: req.body.title });
    res.redirect("/");
  });

export { Router, product };
