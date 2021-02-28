const protect = {
  protectRoute: (req, res, next) => {
    if (!req.session.login) return res.redirect("/login");
    next();
  },
  adminArea: (req, res, next) => {
    if (req.user.role !== "admin") return res.redirect("/");
    next();
  },
};

export default protect;
