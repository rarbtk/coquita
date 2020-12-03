const { Product } = require("../models/products");
//let productos = require("../data/products.json");
let fs = require("fs");
let path = require("path");


const adminController = {
  products: (req, res) => {
    let products = Product.getProducts();
    console.log('productos: ', products);
    res.render("admin/administracion", { products:products});
  },
  delete: (req, res) => {
    let productos = Product.getProducts();
    console.log(productos);
    for (let x = 0; x < productos.length; x++) {
      if (productos[x].id == req.params.id) {
        console.log("product found. Removing item ", productos[x]);
    //    productos.splice(x);
        console.log("items luego de borrar 1: ", productos);
      }
    }

    Product.updateJsonProducts(productos);
    res.render("product/product.ejs", { products: productos });
  },}

  module.exports = adminController;