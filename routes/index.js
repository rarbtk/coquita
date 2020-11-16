var express = require("express");
var router = express.Router();
const products = require("../data/products.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { products });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", {title: 'Coquita - Contacto'});
});


module.exports = router;
