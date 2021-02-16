import express from "express";
import authController from "../controller/Auth.js";

const router = express.Router();

router.route("/login").get(authController.getIndex);

export default router;
