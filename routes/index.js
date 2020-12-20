var express = require("express");
var router = express.Router();
const db = require("../database/models");
const products = require("../data/products.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  db.Product.findAll({
    where: {
      category_id: 2, //Promociones - bestSellers
    },
  }).then((bestSellers) => {
    res.render("index", {
      bestSellers,
      currentUser: req.session.user,
    });
  });
  //console.log("locals", res.locals);
});

router.get("/contact", function (req, res, next) {
  res.render("contact", {
    title: "Coquita - Contacto",
    currentUser: req.session.user,
  });
});

module.exports = router;
