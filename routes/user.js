var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/userControllers");

/* USER LOGIN. */
router.get("/login", function (req, res, next) {
  res.render("user/login");
});
// USER REGISTER FORM
router.get("/register", function (req, res, next) {
  res.render("user/register");
});
router.post("/register", userControllers.storeUser);

module.exports = router;
