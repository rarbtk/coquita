const db = require("../database/models");
let fs = require("fs");
let path = require("path");

const cartsController = {
  cart: function (req, res, next) {
    res.render("cart/cart.ejs");
  },
};

module.exports = cartsController;
