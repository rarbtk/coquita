function adminMiddleware(req, res, next) {
  if (req.session.profile == "1") {
    next();
  } else {
    res.send("Unauthorized");
  }
}

module.exports = adminMiddleware;
