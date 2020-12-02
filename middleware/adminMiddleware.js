function adminMiddleware(req, res, next) {
    if (req.session.category == "admin") {
      next();
    } else {
      res.send("Unauthorized");
    }
  }
  
  module.exports = adminMiddleware;