import express from "express";

const Router = express.Router();

Router.route("/product")
  .get((req, res) => {
    res.send(`<form action="/admin/product" method="POST">
    <input type="text" name="title">
    <button type="submit">Add product</button>
  </form>`);
  })
  .post((req, res, next) => {
    console.log(req.body.title);
    res.redirect("/");
  });

export default Router;
