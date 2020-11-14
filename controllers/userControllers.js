const { user } = require("../models/user");
let { check, validationResult, body } = require("express-validator");

const userControllers = {
  storeUser: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      if (user.getUserByEmail(req.body.email)) {
        return res.render("user/register", {
          errors: [{ msg: "La cuenta/email ya existe en la DB " }],
        });
      } else {
        user.storeUser(req.body);
        res.send("register OK");
      }
    } else {
      return res.render("user/register", { errors: errors.errors });
    }
  },
  login: (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    const user_found = user.getUserByEmail(email);
    if (user_found) {
      //console.log("USUARIO ENCONTRADO: ", user_found);
      // Codear aqui login!!!
    } else {
      // retornar error
      return res.render("user/register", {
        errors: [{ msg: "La cuenta/email es inexistente " }],
      });
    }
  },
};

module.exports = userControllers;
