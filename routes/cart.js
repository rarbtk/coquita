var express = require("express");
const cartsController = require("../controllers/cartsController");
var router = express.Router();
const isAuthenticatedMiddleware = require("../middleware/isAuthenticatedMiddleware");
const cartsController = require("../controllers/cartsController")
/* CART. */
router.get("/", isAuthenticatedMiddleware, cartsController.productosEnCarrito);

module.exports = router;
