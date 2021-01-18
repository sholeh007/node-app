const error = {
  404: (req, res) => {
    res.status(404).render("404");
  },
};

export default error;
