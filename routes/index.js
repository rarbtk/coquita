var express = require("express");
var router = express.Router();
const products = require("../data/products.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { products });
});

module.exports = router;
