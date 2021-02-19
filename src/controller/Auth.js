import User from "../model/userModel.js";
class Auth {
  static getIndex(req, res) {
    res.render("auth/login", {
      path: "/login",
      title: "Login",
    });
  }

  async login(req, res) {
    try {
      const user = await User.findById("6027627c22599a21d49e5aca");
      // setting session and save data user
      req.session.login = true;
      req.session.user = user;
      req.session.save((err) => {
        if (!err) return res.redirect("/");
        console.log(err);
      });
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
}

export default Auth;
