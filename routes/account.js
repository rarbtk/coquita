var express = require("express");
var router = express.Router();
const account = require("../controllers/accountController");

// RESET PASSWORD
router.get("/reset", function (req, res) {
  res.render("account/reset");
});
router.post("/reset", account.reset);

// RESET PASSWORD CONFIRMATION
router.get("/reset-email-confirmation", function (req, res) {
  res.render("account/reset-confirmation");
});

module.exports = router;
