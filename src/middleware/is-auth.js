const protect = {
  protectRoute: (req, res, next) => {
    if (!req.session.login) return res.redirect("/login");
    next();
  },
};

export default protect;
