const db = require("../database/models");
let fs = require("fs");
let path = require("path");

const cartsController = {

    productosEnCarrito : function (req, res, next) {
      db.Product.findAll()
      .then(function(compras){
       return res.render("cart/cart",{compras});
       console.log(compras)
      });

    
      }

}




module.exports = cartsController;