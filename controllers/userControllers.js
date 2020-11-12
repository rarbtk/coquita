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
    res.send("login :)");
  },
};

module.exports = userControllers;
