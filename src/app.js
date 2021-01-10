import express from "express";
import adminRoute from "../src/routes/admin.js";
import shopRoute from "../src/routes/shop.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(adminRoute);
app.use(shopRoute);

app.listen(3000);
