import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
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
    });
  }

  async signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await User.findOne({ email });
      if (user) return res.redirect("/signup");

      //encrypt password
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name: "",
        email,
        password: hashPassword,
        cart: { items: [] },
      });
      await newUser.save();
      res.redirect("/login");
    } catch (err) {
      console.log(err);
    }
  }
}

export default Auth;
