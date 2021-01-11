import express from "express";
import path from "path";

const Router = express.Router();
const __dirname = path.resolve();

Router.route("/add-product")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "src", "views", "add-product.html"));
  })
  .post((req, res, next) => {
    console.log(req.body.title);
    res.redirect("/");
  });

export default Router;
