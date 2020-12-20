function adminMiddleware(req, res, next) {
  if (req.session.profile == "admin") {
    next();
  } else {
    res.send("Unauthorized");
  }
}

module.exports = adminMiddleware;
