function adminMiddleware(req, res, next) {
  if (req.session.profile == "1") {
    next();
  } else {
    res.render("error.ejs", { error: "Unauthorized" });
  }
}

module.exports = adminMiddleware;
