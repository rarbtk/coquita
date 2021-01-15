var express = require("express");
const cartsController = require("../controllers/cartsController");
var router = express.Router();
const isAuthenticatedMiddleware = require("../middleware/isAuthenticatedMiddleware");
/* CART. */
router.get("/", isAuthenticatedMiddleware, cartsController.productosEnCarrito);

module.exports = router;
