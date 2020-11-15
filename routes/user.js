var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/userControllers");
let { check, validationResult, body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

/* USER LOGIN. */
router.get("/login", function (req, res, next) {
  res.render("user/login");
});
// post login
router.post("/login", userControllers.login);

// USER REGISTER FORM
router.get("/register", authMiddleware, function (req, res, next) {
  res.render("user/register");
});
// STORE USER REGISTRATION
router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Email inválido"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("La contraseña debe tener al menos 5 caracteres"),
  ],
  userControllers.storeUser
);
//show session
router.get("/sessions", function (req, res) {
  if (req.session.user) {
    res.send("Sessions: " + req.session.user);
  } else {
    res.send("Sessions: 0");
  }
});

module.exports = router;
