function authMiddleware(req, res, next) {
  if (req.session.user != undefined) {
    next();
  } else {
    res.send("Unauthorized");
  }
}

module.exports = authMiddleware;
