function guestMiddleware(req, res, next) {
  if (req.session.user == undefined) {
    next();
  } else {
    res.send("usuario logueado");
  }
}

module.exports = guestMiddleware;
