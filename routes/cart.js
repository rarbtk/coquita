var express = require("express");
const cartsController = require("../controllers/cartsController");
var router = express.Router();
const isAuthenticatedMiddleware = require("../middleware/isAuthenticatedMiddleware");
/* CART. */
router.get("/cart", isAuthenticatedMiddleware, function (req, res, next) {
  res.render("cart/cart");
});

// test integracion MP(mercadopago)
router.get("/payment", function (req, res) {
  res.render("cart/payment", {
    paymentDetail: {
      products: [
        {
          name: "Producto 1",
          image: "torta-minecraft.png",
          quantity: 1,
          price: 10,
        },
        {
          name: "Producto 2",
          image: "torta-cerveza.png",
          quantity: 1,
          price: 10,
        },
      ],
      buyer: {
        email: "admin@coquita.com",
      },
      totalPrice: 20,
    },
  });
});
module.exports = router;
