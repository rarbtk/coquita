function rememberMeMiddleware(req, res, next) {
  const { User } = require("../models/user");
  if (req.cookies.userMail != undefined && req.session.user == undefined) {
    const user_found = User.getUserByEmail(req.cookies.userMail);
    if (user_found) {
      console.log("USUARIO ENCONTRADO: ", user_found);
      console.log("actualizo session por cookie");
      req.session.user = user_found.email; // pongo en session el usuario
      req.session.category = user_found.category;
      console.log("lalal" ,user_found.category)
    }
  }
  next();
}

module.exports = rememberMeMiddleware;
