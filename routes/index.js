var express = require("express");
var router = express.Router();
const products = require("../data/products.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("locals", res.locals);
  res.render("index", { products, currentUser: req.session.user });
  
});

router.get("/contact", function (req, res, next) {
  res.render("contact", {
    title: "Coquita - Contacto",
    currentUser: req.session.user,
  });
});

module.exports = router;
