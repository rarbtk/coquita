var express = require("express");
var router = express.Router();
const isAuthenticatedMiddleware = require("../middleware/isAuthenticatedMiddleware");

/* CART. */
router.get("/cart", isAuthenticatedMiddleware, function (req, res, next) {
  res.render("cart/cart");
});
module.exports = router;
