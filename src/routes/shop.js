import express from "express";
import path from "path";
import dir from "../helper/path.js";

const Route = express.Router();

Route.get("/", (req, res, next) => {
  res.sendFile(path.join(dir, "../", "views", "shop.html"));
});

export default Route;
