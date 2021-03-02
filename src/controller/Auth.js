import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../model/userModel.js";
import transport from "../../config/email.js";
class Auth {
  static async getIndex(req, res) {
    res.render("auth/login", {
      path: "/login",
      title: "Login",
      message: req.flash("error"),
    });
  }

  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("auth/login", {
        path: "/login",
        title: "Login",
        message: errors.array()[0].msg,
      });
    }

    try {
      const user = await User.findOne({ email });
      if (user) {
        try {
          const decryptPassword = await bcrypt.compare(password, user.password);
          if (decryptPassword) {
            // setting session and save data user
            req.session.login = true;
            req.session.user = user;
            req.session.save((err) => {
              if (!err) return res.redirect("/");
              console.log(err);
            });
          } else {
            req.flash("error", "password not found!");
            res.redirect("/login");
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        req.flash("error", "email not found!");
        res.redirect("/login");
      }
    } catch (e) {
      console.error(e);
    }
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (!err) return res.redirect("/");
      console.log(err);
    });
  }

  static getSignup(req, res) {
    res.render("auth/signup", {
      path: "/signup",
      title: "Signup",
      message: req.flash("error"),
    });
  }

  // gunakan arrow function supaya bisa memanggil method lain
  signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const subject = "Sign Up Successfully";
    const body = "<p>Success signup</p>";
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("auth/signup", {
        path: "/signup",
        title: "Signup",
        message: errors.array()[0].msg,
      });
    }

    try {
      //encrypt password
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password: hashPassword,
        cart: { items: [] },
      });
      res.redirect("/login");
      const newUsr = newUser.save();
      const send = this.sendingEmail(email, subject, body);
      await newUsr;
      await send;
    } catch (err) {
      console.log(err);
    }
  };

  async sendingEmail(email, subject, html) {
    const mailOptions = {
      from: "shop@nodeShop.com",
      to: email,
      subject,
      html,
    };
    try {
      const send = await transport.sendMail(mailOptions);
      return send;
    } catch (e) {
      console.log(e);
    }
  }

  static forgotPassword(req, res) {
    res.render("auth/forgotPassword", {
      title: "Forgot Password",
      path: "/forgot",
      message: req.flash("error"),
    });
  }

  resetPassword = (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
        return res.redirect("/forgot-password");
      }
      const email = req.body.email;
      const token = buffer.toString("hex");

      User.findOne({ email })
        .then((user) => {
          if (!user) {
            req.flash("error", "email not found!");
            return res.redirect("forgot-password");
          }
          user.token = token;
          //expired setelah 30 menit
          user.tokenExpired = Date.now() + 1800000;
          return user.save();
        })
        .then((result) => {
          if (result) {
            const subject = "reset password";
            const body = `
              <p>You requested a password reset</p>
              <p>Click this <a href="http://localhost:5000/reset/${token}">link</a> to set a new password</p>
            `;
            res.redirect("/");
            this.sendingEmail(email, subject, body);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  static async verificationReset(req, res) {
    const token = req.params.token;
    try {
      const verifyUser = await User.findOne({
        token,
        tokenExpired: { $gt: Date.now() },
      });
      if (!verifyUser) {
        req.flash("error", "token expired or not found");
        return res.redirect("/login");
      }

      return res.render("auth/resetPassword", {
        message: req.flash("error"),
        token,
        title: "Reset Password",
        path: "/reset",
        userId: verifyUser._id.toString(),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async newPassword(req, res) {
    const password = req.body.password;
    const userId = req.body.userId;
    const token = req.body.token;

    try {
      const user = await User.findOne({
        _id: userId,
        token,
        tokenExpired: { $gt: Date.now() },
      });
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        user.password = hashPassword;
        user.token = undefined;
        user.tokenExpired = undefined;
        await user.save();
        return res.redirect("/login");
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default Auth;
