//const { Product } = require("../models/products");
let db = require("../database/models");
let fs = require("fs");
let path = require("path");

const productsController = {
  products: (req, res) => {
    db.Product.findAll().then(function (products) {
      res.render("product/product", { products });
    });
  },

  productDetail: (req, res) => {
    //let products = Product.getProductById(req.params.id);
    db.Product.findByPk(req.params.id).then((product) => {
      if (product) {
        return res.render("product/productDetail", { product: product });
      }
      return res.render("product/productDetail", {});
    });
  },

  productEdition: (req, res) => {
    //let productToEdit = Product.getProductById(req.params.id);
    db.Product.findByPk(req.params.id).then((product) => {
      if (product) {
        db.Category.findAll().then((categories) => {
          if (categories) {
            res.render("product/productEdit", { product, categories });
          }
        });
      }
    });
  },

  create: (req, res) => {
    db.Category.findAll().then((categories) => {
      res.render("product/create", { categories });
    });
  },

  store: (req, res) => {
    db.Product.create({
      name: req.body.name,
      price: req.body.price,
      category_id: 1,
      detail: req.body.detail,
      image: req.files[0].filename,
    });
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
    Product.removeProductAndUpdate(req.params.id);
    res.render("product/product.ejs", { products: productos });
  },
};

module.exports = productsController;
