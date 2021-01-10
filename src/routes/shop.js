import express from "express";

const Route = express.Router();

Route.get("/", (req, res, next) => {
  res.send(`<h1>Ini pertama</h1>`);
});

export default Route;
