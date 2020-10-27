var express = require("express");
var router = express.Router();

/* USER LOGIN. */
router.get("/login", function (req, res, next) {
  res.render("login");
});
// USER REGISTER FORM
router.get("/register", function (req, res, next) {
  res.render("register");
});

module.exports = router;
