import { check } from "express-validator";
import User from "../model/userModel.js";

const validation = {
  signup: [
    check("email", "its not email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("email exists already");
        }
      }),
    check("password", "password min 5 character")
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric()
      .withMessage("contain number and string"),
    check("password2")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("password have to match!");
        }
        return true;
      }),
  ],
  signin: [
    check("email", "it's not email").trim().isEmail().normalizeEmail(),
    check("password", "password min contain 5 character")
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  product: [
    check("title", "only contain alphabet").isAlpha(),
    check("imageUrl").trim().isURL().withMessage("image not valid url"),
    check("price", "only contain number").trim().isInt().isNumeric(),
    check("description").isString(),
  ],
};

export default validation;
