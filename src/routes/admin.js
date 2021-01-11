import express from "express";
import path from "path";
import dir from "../helper/path.js";

const Router = express.Router();

Router.route("/add-product")
  .get((req, res) => {
    res.sendFile(path.join(dir, "../", "views", "add-product.html"));
  })
  .post((req, res, next) => {
    console.log(req.body.title);
    res.redirect("/");
  });

export default Router;
