const { user } = require("../models/user");
let { check, validationResult, body } = require("express-validator");

const userControllers = {
  storeUser: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      user.storeUser(req.body);
      res.send("register success");
    } else {
      return res.render("user/register", { errors: errors.errors });
    }
  },
  login: (req, res) => {
    res.send("login :)");
  },
};

module.exports = userControllers;
