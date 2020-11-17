const { Product } = require("../models/products");
//let productos = require("../data/products.json");
let fs = require("fs");
let path = require("path");

const productsController = {
  products: (req, res) => {
    let products = Product.getProducts();
    res.render("product/product", { products });
  },

  productDetail: (req, res) => {
    let products = Product.getProductById(req.params.id);
    res.render("product/productDetail", { product: products });
  },

  productEdition: (req, res) => {
    let productToEdit = Product.getProductById(req.params.id);
    res.render("product/productEdit", { product: productToEdit });
  },

  create: (req, res) => {
    res.render("product/create");
  },

  store: (req, res) => {
    let productos = Product.getProducts();
    productos.push({
      ...req.body,
      image: req.files[0].filename,
      id: productos[productos.length - 1].id + 1,
    });
    Product.updateJsonProducts(productos);
    res.redirect("/product");
  },
  update: (req, res) => {
    let productos = Product.getProducts();

    for (let x = 0; x < productos.length; x++) {
      if (productos[x].id == req.params.id) {
        console.log("**************************************");
        console.log(req.body.name, req.body.price);
        productos[x].name = req.body.name;
        productos[x].price = req.body.price;
        productos[x].category = req.body.category;
        productos[x].detail = req.body.detail;
        productos[x].image = req.files[0].filename;
      }
    }
    Product.updateJsonProducts(productos);
    res.render("product/product.ejs", { products: productos });
  },
  delete: (req, res) => {
    let productos = Product.getProducts();
    console.log(productos);
    for (let x = 0; x < productos.length; x++) {
      if (productos[x].id == req.params.id) {
        console.log("product found. Removing item ", productos[x]);
        productos.splice(x);
        console.log("items luego de borrar 1: ", productos);
      }
    }

    Product.updateJsonProducts(productos);
    res.render("product/product.ejs", { products: productos });
  },
};

module.exports = productsController;
