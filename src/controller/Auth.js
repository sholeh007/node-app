class Auth {
  static getIndex(req, res) {
    res.render("auth/login", {
      path: "/login",
      title: "Login",
    });
  }

  login(req, res) {
    // setting session
    req.session.isLogin = true;
    res.redirect("/");
  }
}

export default Auth;
