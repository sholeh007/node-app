import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
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
    try {
      const user = await User.findOne({ email });
      if (user) {
        req.flash("error", "email is already in use ");
        return res.redirect("/signup");
      }

      //encrypt password
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name: "",
        email,
        password: hashPassword,
        cart: { items: [] },
      });
      res.redirect("/login");
      const newUsr = newUser.save();
      const send = this.sendingEmail(email);
      await newUsr;
      await send;
    } catch (err) {
      console.log(err);
    }
  };

  async sendingEmail(email) {
    const mailOptions = {
      from: "shop@nodeShop.com",
      to: email,
      subject: "Signup complete",
      html: "<p>Hello, welcome</p>",
    };
    try {
      const send = await transport.sendMail(mailOptions);
      return send;
    } catch (e) {
      console.log(e);
    }
  }
}

export default Auth;
