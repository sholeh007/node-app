import express from "express";

const Router = express.Router();

Router.use("/product", (req, res, next) => {
  res.send(`<form>
    <input type="text" name="title">
    <button type="submit">Add product</button>
  </form>`);
});

Router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default Router;
