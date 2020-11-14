const { product } = require("../models/products");

let productos = require("../data/products.json");
let fs = require("fs");

let path = require("path");

const productsController = {
  products: (req, res) => {
    let products = product.getProducts();
    res.render("product/product", { products });
  },

  productDetail: (req, res) => {
    console.log(req.params.id);
    let products = product.getProductById(req.params.id);
    console.log(product);
    res.render("product/productDetail", { product: products });
  },

  productEdition: (req, res) => {
    let productToEdit = product.getProductById(req.params.id);
    res.render("product/productEdit", { product: productToEdit });
  },

  create: (req, res) => {
    res.render("../views/product/create");
  },

  store: (req, res) => {
    productos.push({
      ...req.body,
      image: req.files[0].filename,
      id: productos[productos.length - 1].id + 1,
    }),
      fs.writeFileSync("./data/products.json", JSON.stringify(productos));

    let products = product.getProducts();
    res.redirect("/");
  },
};

module.exports = productsController;
