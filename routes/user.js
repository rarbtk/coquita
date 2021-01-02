var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/userControllers");
let { check, validationResult, body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const guestMiddleware = require("../middleware/guestMiddleware");
const db = require("../database/models");
let multer = require("multer");
let path = require("path");

var config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/avatars");
    console.log(
      "**************************************************************"
    );
    console.log(file);
    console.log(
      "**************************************************************"
    );
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: config });

/* USER LOGIN. */
router.get("/login", guestMiddleware, function (req, res, next) {
  res.render("user/login");
});
router.post("/login", userControllers.login);

//logout
router.get("/logout", function (req, res) {
  console.log("logout - destroy session");
  res.clearCookie("userMail");
  req.session.destroy();
  res.redirect("/");
});

// STORE USER REGISTRATION
router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Email inválido"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("La contraseña debe tener al menos 5 caracteres"),
    check("password2")
      .isLength({ min: 5 })
      .withMessage("Debe completar el campo 'Repite contraseña'"),
  ],
  userControllers.storeUser
);

// USER REGISTER FORM
router.get("/register", guestMiddleware, function (req, res, next) {
  res.render("user/register");
});

//USER PROFILE
router.get("/profile", userControllers.profile);
router.post("/profile", userControllers.storeProfile);
router.post("/avatar", upload.any(), userControllers.storeAvatar);

//show session
router.get("/sessions", function (req, res) {
  if (req.session.user) {
    res.send("Sessions: " + req.session.user);
  } else {
    res.send("Sessions: 0");
  }
});

module.exports = router;
