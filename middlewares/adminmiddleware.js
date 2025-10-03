module.exports = (req, res, next) => {
    if (req.session.admin) {
      next(); // Proceed if logged in
    } else {
      res.redirect("/adminlogin");
    }
  };