function authMiddleware(req, res, next) {
  if (req.session.user != undefined) {
    next();
  } else {
    res.render("error.ejs", { error: "Unauthorized" });
  }
}

module.exports = authMiddleware;
