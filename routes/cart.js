var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/userControllers");

/* CART. */
router.get("/cart", function (req, res, next) {
  res.render("cart/cart");
});
module.exports = router;
