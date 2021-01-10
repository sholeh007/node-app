import express from "express";

const Router = express.Router();

Router.get("/product", (req, res, next) => {
  res.send(`<form action="/add-product" method="POST">
    <input type="text" name="title">
    <button type="submit">Add product</button>
  </form>`);
});

Router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default Router;
