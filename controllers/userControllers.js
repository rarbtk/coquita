const { User } = require("../models/user");
let { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

const userControllers = {
  storeUser: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      if (User.getUserByEmail(req.body.email)) {
        return res.render("user/register", {
          errors: [{ msg: "La cuenta/email ya existe en la DB " }],
        });
      } else {
        User.storeUser(req.body);
        res.send("register OK");
      }
    } else {
      return res.render("user/register", { errors: errors.errors });
    }
  },
  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user_found = User.getUserByEmail(email);
    if (user_found) {
      console.log("USUARIO ENCONTRADO: ", user_found);
      // Check password
      if (bcrypt.compareSync(password, user_found.password)) {
        //password OK
        req.session.user = user_found.email;
        if (req.body.rememberMe != undefined) {
          res.cookie("rememberMe", email, { maxAge: 1800000 }); // cookies 30 minutos
        }
        console.log("***********************");
        console.log("Session: ", req.session.user);
        res.render("index");
      } else {
        //Incorrect password
        return res.render("user/login", {
          errors: [{ msg: "Verifica la password y intenta nuevamente" }],
        });
      }
    } else {
      // retornar error
      return res.render("user/login", {
        errors: [{ msg: "La cuenta/email es inexistente " }],
      });
    }
  },
};

module.exports = userControllers;
