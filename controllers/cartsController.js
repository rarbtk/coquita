const db = require("../database/models");
let fs = require("fs");
let path = require("path");

const cartsController = {

    productosEnCarrito : function (req, res, next) {
        res.render("cart/cart");
      }

}




module.exports = cartsController;