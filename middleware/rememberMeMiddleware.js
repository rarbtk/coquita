function rememberMeMiddleware(req, res, next) {
  let db = require("../database/models");

  if (req.cookies.userMail != undefined && req.session.user == undefined) {
    db.User.findOne({where: {email: req.cookies.userMail}})
    .then((user_found) =>{
      console.log("USUARIO ENCONTRADO: ", user_found);
      console.log("actualizo session por cookie");
      req.session.user = user_found.email; // pongo en session el usuario
      req.session.profile = user_found.profile_id;
      console.log("User profile",  req.session.user);
    })

    // if (user_found) {
    //   console.log("USUARIO ENCONTRADO: ", user_found);
    //   console.log("actualizo session por cookie");
    //   req.session.user = user_found.email; // pongo en session el usuario
    //   req.session.profile = user_found.category;
    //   console.log("lalal", user_found.category);
    // }
  }
  next();
}

module.exports = rememberMeMiddleware;
