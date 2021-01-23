var express = require("express");
var router = express.Router();
const AccountController = require("../controllers/accountController");

// RESET PASSWORD
router.get("/reset", function (req, res) {
  res.render("account/reset");
});
router.post("/reset", AccountController.reset);

// RESET PASSWORD CONFIRMATION
router.get("/reset-email-confirmation", AccountController.resetConfirmation);

module.exports = router;
