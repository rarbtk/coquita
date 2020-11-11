var express = require("express");
var router = express.Router();
const productsController = require("../controllers/productsControllers.js");
const products = require("../data/products.json");

/* GET all peoducts */
router.get("/", productsController.products);

router.get("/create", function (req, res, next) {
  res.render("product/create");
});

//get product detail by id
router.get("/:id", productsController.productDetail);

//Edit producto
router.get("/edit/:id", function (req, res, next) {
  res.render("product/productEdit");
});

module.exports = router;