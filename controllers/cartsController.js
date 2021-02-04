const db = require("../database/models");
let fs = require("fs");
let path = require("path");

const cartsController = {

    productosEnCarrito : function (req, res, next) {
      db.Product.findAll()
      .then(function(compras){
        console.log(compras)
        console.log("wwwwwwwwwwww")
       return res.render("cart/cart",{compras});
       
      });

    
      }

}




module.exports = cartsController;