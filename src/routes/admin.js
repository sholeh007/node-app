import express from "express";
import path from "path";
import dir from "../helper/path.js";

const Router = express.Router();
const data = [];

Router.route("/add-product")
  .get((req, res) => {
    res.sendFile(path.join(dir, "../", "views", "add-product.html"));
  })
  .post((req, res) => {
    data.push({ title: req.body.title });
    res.redirect("/");
  });

export { Router, data };
