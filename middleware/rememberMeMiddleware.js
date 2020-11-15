function rememberMeMiddleware(req, res, next) {
  const { User } = require("../models/user");
  console.log("rememberMeMiddleware");
  console.log("session user: " + req.session.user);
  if (req.cookies.rememberMe != undefined && req.session.user == undefined) {
    const user_found = User.getUserByEmail(req.cookies.rememberMe);
    if (user_found) {
      console.log("USUARIO ENCONTRADO: ", user_found);
      console.log("actualizo session por cookie");
      req.session.user = user_found.email; // pongo en session el usuario
    }
  }
  next();
}

module.exports = rememberMeMiddleware;
