import express from "express";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000);
