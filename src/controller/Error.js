const error = {
  404: (req, res) => {
    return res.status(404).render("404", {
      title: "Page Not Found",
    });
  },
  500: (req, res) => {
    return res.status(500).render("500", {
      title: "error",
    });
  },
};

export default error;
