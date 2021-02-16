class Auth {
  static getIndex(req, res) {
    res.render("auth/login", {
      path: "/login",
      title: "Login",
    });
  }

  login(req, res) {
    // setting cookie
    res.cookie("login", "true");
    res.redirect("/");
  }
}

export default Auth;
