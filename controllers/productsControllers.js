const { Product } = require("../models/products");

let productos = require("../data/products.json");
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
    res.render("../views/product/create");
  },

  store: (req, res) => {
    productos.push({
      ...req.body,
      image: req.files[0].filename,
      id: productos[productos.length - 1].id + 1,
    }),
      fs.writeFileSync("./data/products.json", JSON.stringify(productos));

    let products = Product.getProducts();
    res.redirect("/");
  },
  update: (req, res) => {
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
    fs.writeFileSync("./data/products.json", JSON.stringify(productos));
    res.render("product/product.ejs", { products: productos });
  },
};

module.exports = productsController;
