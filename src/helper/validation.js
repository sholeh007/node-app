import { check } from "express-validator";
import User from "../model/userModel.js";

const validation = {
  signup: [
    check("email", "its not email")
      .isEmail()
      .normalizeEmail()
      .trim()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("email exists already");
        }
      }),
    check("password", "password min 5 character")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .withMessage("contain number and string"),
    check("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password have to match!");
      }
      return true;
    }),
  ],
  signin: [
    check("email", "it's not email").isEmail().trim().normalizeEmail(),
    check("password", "password min contain 5 character")
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
};

export default validation;
